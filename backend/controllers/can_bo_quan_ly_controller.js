const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Lấy danh sách cán bộ quản lý (chỉ admin)
const getCanBoQuanLy = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [canBo] = await connection.execute(
      'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, created_at FROM can_bo_quan_ly ORDER BY created_at DESC'
    );
    connection.release();

    return res.status(200).json(canBo);
  } catch (error) {
    console.error('Lỗi lấy danh sách cán bộ quản lý:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy chi tiết cán bộ quản lý
const getCanBoQuanLyById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    const [canBo] = await connection.execute(
      'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, created_at FROM can_bo_quan_ly WHERE id = ?',
      [id]
    );

    connection.release();

    if (canBo.length === 0) {
      return res.status(404).json({ message: 'Cán bộ quản lý không tồn tại' });
    }

    return res.status(200).json(canBo[0]);
  } catch (error) {
    console.error('Lỗi lấy chi tiết cán bộ quản lý:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Tạo cán bộ quản lý (chỉ admin)
const createCanBoQuanLy = async (req, res) => {
  try {
    const { username, password, ho_ten, gioi_tinh, so_dien_thoai } = req.body;

    if (!username || !password || !ho_ten) {
      return res.status(400).json({ message: 'Username, password và họ tên là bắt buộc' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    // Kiểm tra username đã tồn tại
    const [existing] = await connection.execute(
      'SELECT id FROM can_bo_quan_ly WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }

    await connection.execute(
      `INSERT INTO can_bo_quan_ly (username, password_hash, ho_ten, gioi_tinh, so_dien_thoai)
       VALUES (?, ?, ?, ?, ?)`,
      [username, hashedPassword, ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '']
    );

    connection.release();

    return res.status(201).json({ message: 'Tạo cán bộ quản lý thành công' });
  } catch (error) {
    console.error('Lỗi tạo cán bộ quản lý:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Cập nhật cán bộ quản lý (chỉ admin hoặc chính người đó)
const updateCanBoQuanLy = async (req, res) => {
  try {
    const { id } = req.params;
    const { ho_ten, gioi_tinh, so_dien_thoai, password } = req.body;

    // Kiểm tra quyền
    if (req.user.role === 'can_bo_quan_ly' && req.user.id != id) {
      return res.status(403).json({ message: 'Bạn không có quyền cập nhật cán bộ này' });
    }

    const connection = await pool.getConnection();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        `UPDATE can_bo_quan_ly 
         SET ho_ten = ?, gioi_tinh = ?, so_dien_thoai = ?, password_hash = ?
         WHERE id = ?`,
        [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', hashedPassword, id]
      );
    } else {
      await connection.execute(
        `UPDATE can_bo_quan_ly 
         SET ho_ten = ?, gioi_tinh = ?, so_dien_thoai = ?
         WHERE id = ?`,
        [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', id]
      );
    }

    connection.release();

    return res.status(200).json({ message: 'Cập nhật cán bộ quản lý thành công' });
  } catch (error) {
    console.error('Lỗi cập nhật cán bộ quản lý:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Xóa cán bộ quản lý (chỉ admin)
const deleteCanBoQuanLy = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM can_bo_quan_ly WHERE id = ?',
      [id]
    );

    connection.release();

    return res.status(200).json({ message: 'Xóa cán bộ quản lý thành công' });
  } catch (error) {
    console.error('Lỗi xóa cán bộ quản lý:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  getCanBoQuanLy,
  getCanBoQuanLyById,
  createCanBoQuanLy,
  updateCanBoQuanLy,
  deleteCanBoQuanLy,
};
