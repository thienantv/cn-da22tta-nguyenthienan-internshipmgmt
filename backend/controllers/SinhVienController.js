const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Lấy danh sách sinh viên (chỉ admin)
const getSinhVien = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [sinhVien] = await connection.execute(
      'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien, created_at FROM sinh_vien ORDER BY created_at DESC'
    );
    connection.release();

    return res.status(200).json(sinhVien);
  } catch (error) {
    console.error('Lỗi lấy danh sách sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy chi tiết sinh viên
const getSinhVienById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    const [sinhVien] = await connection.execute(
      'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien, created_at FROM sinh_vien WHERE id = ?',
      [id]
    );

    connection.release();

    if (sinhVien.length === 0) {
      return res.status(404).json({ message: 'Sinh viên không tồn tại' });
    }

    return res.status(200).json(sinhVien[0]);
  } catch (error) {
    console.error('Lỗi lấy chi tiết sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Tạo sinh viên (chỉ admin)
const createSinhVien = async (req, res) => {
  try {
    const { username, password, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username và password là bắt buộc' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    // Kiểm tra username đã tồn tại
    const [existing] = await connection.execute(
      'SELECT id FROM sinh_vien WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }

    await connection.execute(
      `INSERT INTO sinh_vien (username, password_hash, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, ho_ten || username, gioi_tinh || 'Khác', so_dien_thoai || '', email_sinh_vien || '']
    );

    connection.release();

    return res.status(201).json({ message: 'Tạo sinh viên thành công' });
  } catch (error) {
    console.error('Lỗi tạo sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Cập nhật sinh viên (chỉ admin hoặc chính người đó)
const updateSinhVien = async (req, res) => {
  try {
    const { id } = req.params;
    const { ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien, password } = req.body;

    // Kiểm tra quyền
    if (req.user.role === 'sinh_vien' && req.user.id != id) {
      return res.status(403).json({ message: 'Bạn không có quyền cập nhật sinh viên này' });
    }

    const connection = await pool.getConnection();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        `UPDATE sinh_vien 
         SET ho_ten = ?, gioi_tinh = ?, so_dien_thoai = ?, email_sinh_vien = ?, password_hash = ?
         WHERE id = ?`,
        [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_sinh_vien || '', hashedPassword, id]
      );
    } else {
      await connection.execute(
        `UPDATE sinh_vien 
         SET ho_ten = ?, gioi_tinh = ?, so_dien_thoai = ?, email_sinh_vien = ?
         WHERE id = ?`,
        [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_sinh_vien || '', id]
      );
    }

    connection.release();

    return res.status(200).json({ message: 'Cập nhật sinh viên thành công' });
  } catch (error) {
    console.error('Lỗi cập nhật sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Xóa sinh viên (chỉ admin)
const deleteSinhVien = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM sinh_vien WHERE id = ?',
      [id]
    );

    connection.release();

    return res.status(200).json({ message: 'Xóa sinh viên thành công' });
  } catch (error) {
    console.error('Lỗi xóa sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  getSinhVien,
  getSinhVienById,
  createSinhVien,
  updateSinhVien,
  deleteSinhVien,
};
