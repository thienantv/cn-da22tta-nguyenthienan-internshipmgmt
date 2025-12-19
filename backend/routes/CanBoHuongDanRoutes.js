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

// Routes
router.get('/', getCanBoHuongDan);
router.get('/search', searchCanBoHuongDan);
router.get('/:maCanBo', getCanBoHuongDanById);

router.post('/', verifyToken, checkRole('can_bo_quan_ly'), createCanBoHuongDan);
router.put('/:maCanBo', verifyToken, checkRole('can_bo_quan_ly'), updateCanBoHuongDan);
router.delete('/:maCanBo', verifyToken, checkRole('can_bo_quan_ly'), deleteCanBoHuongDan);

module.exports = router;