// backend/routes/userRoutes.js
import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Chỉ admin mới được phép truy cập các route này
router.use(authenticate);
router.use(authorize(['admin']));

// GET /api/users → lấy danh sách user
router.get('/', getUsers);

// POST /api/users → thêm user
router.post('/', createUser);

// PUT /api/users/:id → sửa role
router.put('/:id', updateUser);

// DELETE /api/users/:id → xóa user
router.delete('/:id', deleteUser);

export default router;