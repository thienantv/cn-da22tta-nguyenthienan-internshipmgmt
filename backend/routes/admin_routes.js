const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const { getThongKe } = require('../controllers/admin_controller');

// GET /api/admin/thong_ke - Lấy thống kê (chỉ admin)
router.get('/thong_ke', verifyToken, checkRole('admin'), getThongKe);

module.exports = router;
