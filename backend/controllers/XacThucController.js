const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Hàm tạo JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Đăng nhập
// Đăng nhập - tự dò role
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username và password là bắt buộc' });
    }

    const connection = await pool.getConnection();
    let user = null;
    let role = null;

    // 1. Kiểm tra bảng admin
    let [rows] = await connection.execute(
      'SELECT id, username, password_hash FROM admin WHERE username = ?',
      [username]
    );
    if (rows.length > 0) {
      user = rows[0];
      role = 'admin';
    }

    // 2. Kiểm tra bảng cán bộ
    if (!user) {
      [rows] = await connection.execute(
        'SELECT id, username, password_hash FROM can_bo_quan_ly WHERE username = ?',
        [username]
      );
      if (rows.length > 0) {
        user = rows[0];
        role = 'can_bo_quan_ly';
      }
    }

    // 3. Kiểm tra bảng sinh viên
    if (!user) {
      [rows] = await connection.execute(
        'SELECT id, username, password_hash FROM sinh_vien WHERE username = ?',
        [username]
      );
      if (rows.length > 0) {
        user = rows[0];
        role = 'sinh_vien';
      }
    }

    connection.release();

    if (!user) {
      return res.status(401).json({ message: 'Username hoặc password không chính xác' });
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Username hoặc password không chính xác' });
    }

    // Tạo token
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: role
    });

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: role,
      },
    });

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};


// Đăng ký (mặc định role = sinh_vien)
const register = async (req, res) => {
  try {
    const { username, password, confirmPassword, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Username, password và confirmPassword là bắt buộc' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password và confirmPassword không khớp' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    // Kiểm tra username đã tồn tại
    const [existingUsers] = await connection.execute(
      'SELECT id FROM sinh_vien WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }

    // Tạo sinh viên mới
    await connection.execute(
      `INSERT INTO sinh_vien (username, password_hash, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, ho_ten || username, gioi_tinh || 'Khác', so_dien_thoai || '', email_sinh_vien || '']
    );

    connection.release();

    return res.status(201).json({ message: 'Đăng ký thành công, vui lòng đăng nhập' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy thông tin người dùng hiện tại
const getCurrentUser = async (req, res) => {
  try {
    const { id, role } = req.user;
    let query = '';
    let userData = null;

    const connection = await pool.getConnection();

    if (role === 'admin') {
      query = 'SELECT id, username, email_admin FROM admin WHERE id = ?';
      const [users] = await connection.execute(query, [id]);
      userData = users[0];
    } else if (role === 'can_bo_quan_ly') {
      query = 'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai FROM can_bo_quan_ly WHERE id = ?';
      const [users] = await connection.execute(query, [id]);
      userData = users[0];
    } else if (role === 'sinh_vien') {
      query = 'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien FROM sinh_vien WHERE id = ?';
      const [users] = await connection.execute(query, [id]);
      userData = users[0];
    }

    connection.release();

    if (!userData) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    return res.status(200).json({
      user: {
        ...userData,
        role: role,
      },
    });
  } catch (error) {
    console.error('Lỗi lấy thông tin người dùng:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = { login, register, getCurrentUser };
