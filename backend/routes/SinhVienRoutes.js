const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getSinhVien,
  getSinhVienById,
  createSinhVien,
  updateSinhVien,
  deleteSinhVien,
} = require('../controllers/SinhVienController');

// GET /api/sinh_vien - Lấy danh sách (chỉ admin)
router.get('/', verifyToken, checkRole('admin'), getSinhVien);

// GET /api/sinh_vien/:id - Lấy chi tiết
router.get('/:id', verifyToken, getSinhVienById);

// POST /api/sinh_vien - Tạo (chỉ admin)
router.post('/', verifyToken, checkRole('admin'), createSinhVien);

// PUT /api/sinh_vien/:id - Cập nhật (admin hoặc chính người đó)
router.put('/:id', verifyToken, checkRole('admin', 'sinh_vien'), updateSinhVien);

// DELETE /api/sinh_vien/:id - Xóa (chỉ admin)
router.delete('/:id', verifyToken, checkRole('admin'), deleteSinhVien);

module.exports = router;
