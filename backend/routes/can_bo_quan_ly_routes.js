const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getCanBoQuanLy,
  getCanBoQuanLyById,
  createCanBoQuanLy,
  updateCanBoQuanLy,
  deleteCanBoQuanLy,
} = require('../controllers/can_bo_quan_ly_controller');

// GET /api/can_bo_quan_ly - Lấy danh sách (chỉ admin)
router.get('/', verifyToken, checkRole('admin'), getCanBoQuanLy);

// GET /api/can_bo_quan_ly/:id - Lấy chi tiết
router.get('/:id', verifyToken, getCanBoQuanLyById);

// POST /api/can_bo_quan_ly - Tạo (chỉ admin)
router.post('/', verifyToken, checkRole('admin'), createCanBoQuanLy);

// PUT /api/can_bo_quan_ly/:id - Cập nhật (admin hoặc chính người đó)
router.put('/:id', verifyToken, checkRole('admin', 'can_bo_quan_ly'), updateCanBoQuanLy);

// DELETE /api/can_bo_quan_ly/:id - Xóa (chỉ admin)
router.delete('/:id', verifyToken, checkRole('admin'), deleteCanBoQuanLy);

module.exports = router;
