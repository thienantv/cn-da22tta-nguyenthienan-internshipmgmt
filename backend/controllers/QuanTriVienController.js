  const bcrypt = require('bcryptjs');
  const pool = require('../config/db');

  // Lấy thống kê số lượng tài khoản (chỉ admin)
  const getThongKe = async (req, res) => {
    try {
      const connection = await pool.getConnection();

      const [adminCount] = await connection.execute('SELECT COUNT(*) as count FROM admin');
      const [canBoCount] = await connection.execute('SELECT COUNT(*) as count FROM can_bo_quan_ly');
      const [sinhVienCount] = await connection.execute('SELECT COUNT(*) as count FROM sinh_vien');
      const [donViCount] = await connection.execute('SELECT COUNT(*) as count FROM don_vi');

      connection.release();

      return res.status(200).json({
        admin: adminCount[0].count,
        can_bo_quan_ly: canBoCount[0].count,
        sinh_vien: sinhVienCount[0].count,
        don_vi: donViCount[0].count,
      });
    } catch (error) {
      console.error('Lỗi lấy thống kê:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  // Cập nhật thông tin admin
  const updateAdminProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const { email_admin, password } = req.body;

      if (req.user.role !== 'admin' || req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Bạn không có quyền cập nhật thông tin này' });
      }

      const connection = await pool.getConnection();

      if (email_admin) {
        const [existingEmail] = await connection.execute(
          'SELECT id FROM admin WHERE email_admin = ? AND id != ?',
          [email_admin, id]
        );
        if (existingEmail.length > 0) {
          connection.release();
          return res.status(400).json({ message: 'Email này đã được sử dụng bởi admin khác' });
        }
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.execute(
          `UPDATE admin 
          SET email_admin = ?, password_hash = ?
          WHERE id = ?`,
          [email_admin || null, hashedPassword, id]
        );
      } else {
        await connection.execute(
          `UPDATE admin 
          SET email_admin = ?
          WHERE id = ?`,
          [email_admin || null, id]
        );
      }

      connection.release();

      return res.status(200).json({ message: 'Cập nhật thông tin admin thành công' });
    } catch (error) {
      console.error('Lỗi cập nhật thông tin admin:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  // Lấy thông tin chi tiết admin
  const getAdminProfile = async (req, res) => {
    try {
      const { id } = req.params;

      if (req.user.role !== 'admin' || req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Bạn không có quyền xem thông tin này' });
      }

      const connection = await pool.getConnection();
      const [adminData] = await connection.execute(
        'SELECT id, username, email_admin FROM admin WHERE id = ?',
        [id]
      );

      connection.release();

      if (adminData.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin admin' });
      }

      // Không cache, luôn trả JSON mới
      res.set('Cache-Control', 'no-store');
      return res.status(200).json({ user: adminData[0] });
    } catch (error) {
      console.error('Lỗi lấy thông tin admin:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  // Lấy danh sách tất cả admin
  const getAdminList = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [adminList] = await connection.execute(
        'SELECT id, username, email_admin, created_at FROM admin ORDER BY created_at DESC'
      );
      connection.release();

      return res.status(200).json(adminList);
    } catch (error) {
      console.error('Lỗi lấy danh sách admin:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  // Lấy danh sách tất cả cán bộ quản lý
  const getCanBoQuanLyList = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [canBoList] = await connection.execute(
        'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, created_at FROM can_bo_quan_ly ORDER BY created_at DESC'
      );
      connection.release();

      return res.status(200).json(canBoList);
    } catch (error) {
      console.error('Lỗi lấy danh sách cán bộ quản lý:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  // Lấy danh sách tất cả sinh viên
  const getSinhVienList = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [sinhVienList] = await connection.execute(
        'SELECT id, username, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien, created_at FROM sinh_vien ORDER BY created_at DESC'
      );
      connection.release();

      return res.status(200).json(sinhVienList);
    } catch (error) {
      console.error('Lỗi lấy danh sách sinh viên:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };

  module.exports = {
    getThongKe,
    updateAdminProfile,
    getAdminProfile,
    getAdminList,
    getCanBoQuanLyList,
    getSinhVienList,
  };