const express = require('express');
const router = express.Router();
const {
  step1CheckUsername,
  step2VerifyEmail,
  step3SendResetEmail,
  verifyResetToken,
  step4ResetPassword,
} = require('../controllers/QuenMatKhauController');

// POST /api/quen-mat-khau/buoc-1 - Kiểm tra username
router.post('/buoc-1', step1CheckUsername);

// POST /api/quen-mat-khau/buoc-2 - Xác nhận email
router.post('/buoc-2', step2VerifyEmail);

// POST /api/quen-mat-khau/buoc-3 - Gửi email reset
router.post('/buoc-3', step3SendResetEmail);

// GET /api/quen-mat-khau/verify-token/:token - Xác thực token
router.get('/verify-token/:token', verifyResetToken);

// POST /api/quen-mat-khau/buoc-4 - Đặt lại mật khẩu
router.post('/buoc-4', step4ResetPassword);

module.exports = router;
