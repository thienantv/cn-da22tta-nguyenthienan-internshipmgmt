const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getThongKe,
  updateAdminProfile,
  getAdminProfile,
} = require('../controllers/QuanTriVienController');

// GET /api/admin/thong_ke - Lấy thống kê (chỉ admin)
router.get('/thong_ke', verifyToken, checkRole('admin'), getThongKe);

// GET /api/admin/profile/:id - Lấy thông tin chi tiết admin
router.get('/profile/:id', verifyToken, checkRole('admin'), getAdminProfile);

// PUT /api/admin/:id - Cập nhật thông tin admin
router.put('/:id', verifyToken, checkRole('admin'), updateAdminProfile);

module.exports = router;