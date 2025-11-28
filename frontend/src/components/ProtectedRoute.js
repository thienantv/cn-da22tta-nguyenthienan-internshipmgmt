import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Lấy token và user từ localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Kiểm tra nếu chưa đăng nhập (không có token hoặc user)
  if (!token || !user) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // Kiểm tra quyền truy cập (nếu requiredRole được chỉ định, user.role phải khớp)
  if (requiredRole && user.role !== requiredRole) {
    console.log("Không có quyền truy cập. Role cần: ", requiredRole, " - Role thực tế: ", user.role);
    return <Navigate to="/" replace />;  // Điều hướng về trang chủ
  }

  // Nếu tất cả hợp lệ, hiển thị nội dung trang
  return children;
};

export default ProtectedRoute;