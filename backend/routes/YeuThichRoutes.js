const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const {
  toggleFavorite,
  checkFavorite,
  getFavoriteList,
  batchCheckFavorites,
  getFavoriteCount,
} = require('../controllers/YeuThichController');

// Tất cả các endpoint yêu cầu xác thực là sinh viên
router.use(verifyToken, checkRole('sinh_vien'));

// POST /api/yeu_thich/toggle - Toggle like/unlike
router.post('/toggle', toggleFavorite);

// GET /api/yeu_thich/check/:ma_don_vi - Kiểm tra trạng thái yêu thích
router.get('/check/:ma_don_vi', checkFavorite);

// GET /api/yeu_thich/danh-sach - Lấy danh sách yêu thích
router.get('/danh-sach', getFavoriteList);

// POST /api/yeu_thich/batch-check - Kiểm tra trạng thái cho nhiều đơn vị
router.post('/batch-check', batchCheckFavorites);

// GET /api/yeu_thich/count/:ma_don_vi - Lấy số lượng yêu thích
router.get('/count/:ma_don_vi', getFavoriteCount);

module.exports = router;
