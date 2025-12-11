const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getCanBoHuongDan,
  getCanBoHuongDanById,
  createCanBoHuongDan,
  updateCanBoHuongDan,
  deleteCanBoHuongDan,
  searchCanBoHuongDan,
} = require('../controllers/CanBoHuongDanController');

// GET /api/can_bo_huong_dan - Lấy danh sách (công khai)
router.get('/', getCanBoHuongDan);

// GET /api/can_bo_huong_dan/search - Tìm kiếm (công khai)
router.get('/search', searchCanBoHuongDan);

// GET /api/can_bo_huong_dan/:maCanBo - Lấy chi tiết (công khai)
router.get('/:maCanBo', getCanBoHuongDanById);

// POST /api/can_bo_huong_dan - Tạo (chỉ cán bộ quản lý)
router.post('/', verifyToken, checkRole('can_bo_quan_ly'), createCanBoHuongDan);

// PUT /api/can_bo_huong_dan/:maCanBo - Cập nhật (chỉ cán bộ quản lý)
router.put('/:maCanBo', verifyToken, checkRole('can_bo_quan_ly'), updateCanBoHuongDan);

// DELETE /api/can_bo_huong_dan/:maCanBo - Xóa (chỉ cán bộ quản lý)
router.delete('/:maCanBo', verifyToken, checkRole('can_bo_quan_ly'), deleteCanBoHuongDan);

module.exports = router;
