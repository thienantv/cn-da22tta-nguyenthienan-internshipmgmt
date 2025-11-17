import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// =====================
// Đăng nhập
// =====================
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM tai_khoan WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Sai username hoặc password' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Sai username hoặc password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// =====================
// Đăng ký
// =====================
export const register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải tối thiểu 6 ký tự!' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM tai_khoan WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username đã tồn tại!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO tai_khoan (username, password_hash, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role || 'sinhvien']
    );

    res.json({ message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đăng ký thất bại!' });
  }
};

// =====================
// Lấy thông tin người dùng hiện tại (qua JWT)
// =====================
export const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    const [rows] = await pool.query(
      'SELECT id, username, role FROM tai_khoan WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Không thể lấy thông tin user' });
  }
};