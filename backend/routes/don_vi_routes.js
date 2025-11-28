const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  getDonVi,
  getDonViById,
  createDonVi,
  updateDonVi,
  deleteDonVi,
  searchDonVi,
} = require('../controllers/don_vi_controller');

// GET /api/don_vi - Lấy danh sách đơn vị (công khai)
router.get('/', getDonVi);

// GET /api/don_vi/search - Tìm kiếm đơn vị (công khai)
router.get('/search', searchDonVi);

// GET /api/don_vi/:maDonVi - Lấy chi tiết đơn vị (công khai)
router.get('/:maDonVi', getDonViById);

// POST /api/don_vi - Tạo đơn vị (chỉ cán bộ quản lý)
router.post('/', verifyToken, checkRole('can_bo_quan_ly'), createDonVi);

// PUT /api/don_vi/:maDonVi - Cập nhật đơn vị (chỉ cán bộ quản lý)
router.put('/:maDonVi', verifyToken, checkRole('can_bo_quan_ly'), updateDonVi);

// DELETE /api/don_vi/:maDonVi - Xóa đơn vị (chỉ cán bộ quản lý)
router.delete('/:maDonVi', verifyToken, checkRole('can_bo_quan_ly'), deleteDonVi);

module.exports = router;
