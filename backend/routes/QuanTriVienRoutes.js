const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getThongKe,
  updateAdminProfile,
  getAdminProfile,
  getAdminList,
  getCanBoQuanLyList,
  getSinhVienList,
} = require('../controllers/QuanTriVienController');

// GET /api/admin/thong_ke - Lấy thống kê (chỉ admin)
router.get('/thong_ke', verifyToken, checkRole('admin'), getThongKe);

// GET /api/admin/list-admin - Lấy danh sách tất cả admin (chỉ admin)
router.get('/list-admin', verifyToken, checkRole('admin'), getAdminList);

// GET /api/admin/list-can-bo - Lấy danh sách tất cả cán bộ quản lý (chỉ admin)
router.get('/list-can-bo', verifyToken, checkRole('admin'), getCanBoQuanLyList);

// GET /api/admin/list-sinh-vien - Lấy danh sách tất cả sinh viên (chỉ admin)
router.get('/list-sinh-vien', verifyToken, checkRole('admin'), getSinhVienList);

// GET /api/admin/profile/:id - Lấy thông tin chi tiết admin
router.get('/profile/:id', verifyToken, checkRole('admin'), getAdminProfile);

// PUT /api/admin/:id - Cập nhật thông tin admin
router.put('/:id', verifyToken, checkRole('admin'), updateAdminProfile);

module.exports = router;