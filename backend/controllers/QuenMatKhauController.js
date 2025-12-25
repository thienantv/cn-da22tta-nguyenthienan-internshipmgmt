const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const nodemailer = require('nodemailer');

// ========================================
// Cấu hình Email (tùy chỉnh theo SMTP của bạn)
// ========================================
const transporter = nodemailer.createTransport({
  service: 'gmail', // Hoặc dùng SMTP tùy chỉnh
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// ========================================
// BƯỚC 1: Kiểm tra username tồn tại
// ========================================
const step1CheckUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Vui lòng nhập username' });
    }

    const connection = await pool.getConnection();
    let user = null;
    let userType = null;

    // Kiểm tra trong bảng admin
    let [rows] = await connection.execute(
      'SELECT id, username, email_admin FROM admin WHERE username = ?',
      [username]
    );
    if (rows.length > 0) {
      user = rows[0];
      userType = 'admin';
    }

    // Kiểm tra trong bảng can_bo_quan_ly
    if (!user) {
      [rows] = await connection.execute(
        'SELECT id, username, email_can_bo FROM can_bo_quan_ly WHERE username = ?',
        [username]
      );
      if (rows.length > 0) {
        user = rows[0];
        userType = 'can_bo_quan_ly';
      }
    }

    // Kiểm tra trong bảng sinh_vien
    if (!user) {
      [rows] = await connection.execute(
        'SELECT id, username, email_sinh_vien FROM sinh_vien WHERE username = ?',
        [username]
      );
      if (rows.length > 0) {
        user = rows[0];
        userType = 'sinh_vien';
      }
    }

    connection.release();

    // Thông báo lỗi chung (không tiết lộ thông tin)
    if (!user) {
      return res.status(401).json({ 
        message: 'Username hoặc email không tồn tại trong hệ thống' 
      });
    }

    // Tạo session token tạm thời
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 phút

    const connSession = await pool.getConnection();
    console.log('💾 INSERT session:', { sessionToken, user_id: user.id, userType, username, expiresAt });
    
    await connSession.execute(
      `INSERT INTO forgot_password_sessions 
       (session_token, user_id, user_type, username, step, expires_at, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [sessionToken, user.id, userType, username, 1, expiresAt, true]
    );
    connSession.release();

    console.log('✅ Session created:', sessionToken);

    return res.status(200).json({
      message: 'Username được tìm thấy. Vui lòng tiếp tục với email xác nhận',
      sessionToken: sessionToken,
      step: 2
    });
  } catch (error) {
    console.error('Lỗi bước 1 quên mật khẩu:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ========================================
// BƯỚC 2: Xác nhận email
// ========================================
const step2VerifyEmail = async (req, res) => {
  try {
    const { sessionToken, email } = req.body;

    console.log('🔍 DEBUG Bước 2: sessionToken =', sessionToken);
    console.log('🔍 DEBUG Bước 2: email =', email);

    if (!sessionToken || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    const connection = await pool.getConnection();

    // Lấy session
    const [sessions] = await connection.execute(
      'SELECT * FROM forgot_password_sessions WHERE session_token = ? AND is_active = true',
      [sessionToken]
    );

    console.log('🔍 DEBUG Bước 2: sessions found =', sessions.length);

    if (sessions.length === 0) {
      connection.release();
      console.log('❌ Session không tồn tại!');
      return res.status(401).json({ message: 'Session không hợp lệ hoặc đã hết hạn' });
    }

    const session = sessions[0];

    console.log('📌 Session found:', JSON.stringify(session));

    // Kiểm tra email khớp với user
    let userEmail = null;

    try {
      if (session.user_type === 'admin') {
        const [adminRows] = await connection.execute(
          'SELECT id, username, email_admin FROM admin WHERE id = ?',
          [session.user_id]
        );
        console.log('👤 Admin rows:', adminRows.length);
        if (adminRows.length > 0) {
          userEmail = adminRows[0].email_admin;
        }
      } else if (session.user_type === 'can_bo_quan_ly') {
        const [cbqlRows] = await connection.execute(
          'SELECT id, username, email_can_bo FROM can_bo_quan_ly WHERE id = ?',
          [session.user_id]
        );
        console.log('👤 CBQL rows:', cbqlRows.length);
        if (cbqlRows.length > 0) {
          userEmail = cbqlRows[0].email_can_bo;
        }
      } else if (session.user_type === 'sinh_vien') {
        const [svRows] = await connection.execute(
          'SELECT id, username, email_sinh_vien FROM sinh_vien WHERE id = ?',
          [session.user_id]
        );
        console.log('👤 SV rows:', svRows.length);
        if (svRows.length > 0) {
          userEmail = svRows[0].email_sinh_vien;
        }
      }
    } catch (queryError) {
      console.error('❌ Query error:', queryError.message);
      connection.release();
      return res.status(500).json({ 
        message: 'Lỗi truy vấn: ' + queryError.message
      });
    }

    console.log('📧 User email from DB:', userEmail);
    console.log('📧 Email from request:', email);

    if (!userEmail) {
      connection.release();
      console.log('❌ User không tồn tại hoặc không có email!');
      return res.status(401).json({ 
        message: 'Thông tin tài khoản không tồn tại' 
      });
    }

    // So sánh email (case-insensitive)
    if (userEmail.toLowerCase() !== email.toLowerCase()) {
      connection.release();
      console.log('❌ Email mismatch!', userEmail, '!==', email);
      return res.status(401).json({ 
        message: 'Email không khớp với tài khoản' 
      });
    }

    // Cập nhật session: chuyển sang bước 3
    await connection.execute(
      `UPDATE forgot_password_sessions 
       SET step = ?, email = ?
       WHERE session_token = ?`,
      [3, email, sessionToken]
    );

    connection.release();

    return res.status(200).json({
      message: 'Email xác nhận thành công',
      step: 3,
      sessionToken: sessionToken
    });
  } catch (error) {
    console.error('Lỗi bước 2 quên mật khẩu:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ========================================
// BƯỚC 3: Gửi email reset token
// ========================================
const step3SendResetEmail = async (req, res) => {
  try {
    const { sessionToken, email } = req.body;

    if (!sessionToken || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    const connection = await pool.getConnection();

    // Lấy session
    const [sessions] = await connection.execute(
      `SELECT * FROM forgot_password_sessions 
       WHERE session_token = ? AND is_active = true AND step >= 3`,
      [sessionToken]
    );

    if (sessions.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Session không hợp lệ' });
    }

    const session = sessions[0];

    // Kiểm tra giới hạn số lần gửi email
    const [attempts] = await connection.execute(
      `SELECT * FROM reset_email_attempts 
       WHERE email = ? AND user_type = ?`,
      [email, session.user_type]
    );

    if (attempts.length > 0) {
      const attempt = attempts[0];
      
      // Nếu bị lock, kiểm tra thời gian
      if (attempt.locked_until && new Date() < new Date(attempt.locked_until)) {
        connection.release();
        return res.status(429).json({ 
          message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút' 
        });
      }

      // Nếu vượt quá 20 lần trong 1 giờ, lock (tạm thời tăng cho test)
      if (attempt.attempt_count >= 20) {
        await connection.execute(
          `UPDATE reset_email_attempts 
           SET locked_until = DATE_ADD(NOW(), INTERVAL 1 HOUR)
           WHERE email = ? AND user_type = ?`,
          [email, session.user_type]
        );
        connection.release();
        return res.status(429).json({ 
          message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 1 giờ' 
        });
      }

      // Cập nhật số lần gửi
      await connection.execute(
        `UPDATE reset_email_attempts 
         SET attempt_count = attempt_count + 1, last_attempt_at = NOW()
         WHERE email = ? AND user_type = ?`,
        [email, session.user_type]
      );
    } else {
      // Tạo record mới
      await connection.execute(
        `INSERT INTO reset_email_attempts (email, user_type, attempt_count, last_attempt_at)
         VALUES (?, ?, 1, NOW())`,
        [email, session.user_type]
      );
    }

    // Tạo reset token (JWT 15 phút)
    const resetToken = jwt.sign(
      {
        userId: session.user_id,
        userType: session.user_type,
        email: email,
        sessionToken: sessionToken
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Lưu token vào database
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await connection.execute(
      `INSERT INTO password_reset_tokens 
       (user_id, token, token_type, email_verified, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
      [session.user_id, resetToken, session.user_type, email, expiresAt]
    );

    // Gửi email
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dat-lai-mat-khau?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[Hệ thống quản lý thực tập] Yêu cầu đặt lại mật khẩu',
      html: `
        <h2>Yêu cầu đặt lại mật khẩu</h2>
        <p>Bạn nhận được email này vì có yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p><strong>Username:</strong> ${session.username}</p>
        <p>Nhấp vào liên kết bên dưới để đặt lại mật khẩu của bạn:</p>
        <p>
          <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Đặt lại mật khẩu
          </a>
        </p>
        <p><strong>Liên kết này sẽ hết hạn trong 15 phút.</strong></p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <hr>
        <p><small>Đây là email tự động. Vui lòng không reply email này.</small></p>
      `
    };

    // Gửi bất đồng bộ (không chặn response)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Lỗi gửi email:', error);
      } else {
        console.log('Email đặt lại mật khẩu đã được gửi:', info.response);
      }
    });

    // Cập nhật session: hoàn thành
    await connection.execute(
      `UPDATE forgot_password_sessions 
       SET step = ?, is_active = false
       WHERE session_token = ?`,
      [4, sessionToken]
    );

    connection.release();

    return res.status(200).json({
      message: 'Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn',
      step: 4,
      token: resetToken
    });
  } catch (error) {
    console.error('Lỗi bước 3 quên mật khẩu:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ========================================
// BƯỚC 4: Xác thực token trước reset
// ========================================
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    console.log('Verify token request:', token?.substring(0, 50) + '...');

    if (!token) {
      return res.status(400).json({ message: 'Token không hợp lệ' });
    }

    // Xác thực JWT
    let decoded;
    try {
      console.log('JWT_SECRET:', process.env.JWT_SECRET?.substring(0, 20) + '...');
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('JWT decoded successfully:', decoded);
    } catch (err) {
      console.error('JWT verify error:', err.message);
      return res.status(401).json({ message: 'Token đã hết hạn hoặc không hợp lệ' });
    }

    const connection = await pool.getConnection();

    // Kiểm tra token trong DB
    const [tokens] = await connection.execute(
      `SELECT * FROM password_reset_tokens 
       WHERE token = ? AND is_used = false`,
      [token]
    );

    connection.release();

    if (tokens.length === 0) {
      console.log('Token not found in DB or already used');
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã được sử dụng' });
    }

    const resetToken = tokens[0];

    // Kiểm tra thời gian hết hạn
    if (new Date() > new Date(resetToken.expires_at)) {
      console.log('Token expired');
      return res.status(401).json({ message: 'Token đã hết hạn' });
    }

    console.log('Token verification successful');
    return res.status(200).json({
      message: 'Token hợp lệ',
      userId: decoded.userId,
      userType: decoded.userType,
      email: decoded.email
    });
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ========================================
// BƯỚC 5: Đặt lại mật khẩu
// ========================================
const step4ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải ít nhất 6 ký tự' });
    }

    // Xác thực JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Token đã hết hạn hoặc không hợp lệ' });
    }

    const connection = await pool.getConnection();

    // Kiểm tra token trong DB
    const [tokens] = await connection.execute(
      `SELECT * FROM password_reset_tokens 
       WHERE token = ? AND is_used = false`,
      [token]
    );

    if (tokens.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã được sử dụng' });
    }

    const resetToken = tokens[0];

    // Kiểm tra thời gian hết hạn
    if (new Date() > new Date(resetToken.expires_at)) {
      connection.release();
      return res.status(401).json({ message: 'Token đã hết hạn' });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu tương ứng với user_type
    let tableName, idField;
    if (resetToken.token_type === 'admin') {
      tableName = 'admin';
      idField = 'id';
    } else if (resetToken.token_type === 'can_bo_quan_ly') {
      tableName = 'can_bo_quan_ly';
      idField = 'id';
    } else {
      tableName = 'sinh_vien';
      idField = 'id';
    }

    await connection.execute(
      `UPDATE ${tableName} SET password_hash = ? WHERE ${idField} = ?`,
      [hashedPassword, resetToken.user_id]
    );

    // Đánh dấu token đã sử dụng
    await connection.execute(
      `UPDATE password_reset_tokens 
       SET is_used = true, used_at = NOW()
       WHERE id = ?`,
      [resetToken.id]
    );

    connection.release();

    return res.status(200).json({
      message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập với mật khẩu mới'
    });
  } catch (error) {
    console.error('Lỗi bước 4 quên mật khẩu:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  step1CheckUsername,
  step2VerifyEmail,
  step3SendResetEmail,
  verifyResetToken,
  step4ResetPassword,
};
