// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

/**
 * Middleware xác thực token JWT
 * - Kiểm tra header Authorization
 * - Lưu thông tin user vào req.user
 */
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập hoặc thiếu token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    req.user = decoded; // Lưu thông tin user để các route dùng
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

/**
 * Middleware kiểm tra role
 * @param {Array} roles - danh sách role được phép truy cập
 * Sử dụng: authorize(['admin', 'canbo'])
 */
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
    }

    next();
  };
};