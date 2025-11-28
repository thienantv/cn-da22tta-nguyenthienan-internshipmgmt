const express = require('express');
const router = express.Router();
const { login, register, getCurrentUser } = require('../controllers/auth_controller');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

// GET /api/auth/me
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
