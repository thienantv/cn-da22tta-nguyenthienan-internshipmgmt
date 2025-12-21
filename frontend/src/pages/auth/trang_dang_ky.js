import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/auth/auth.css';

const TrangDangKy = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email_sinh_vien: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      showError('Password và Confirm Password không khớp');
      setLoading(false);
      return;
    }

    try {
      await authService.register(
        formData.username,
        formData.password,
        formData.confirmPassword,
        formData.ho_ten,
        formData.gioi_tinh,
        formData.so_dien_thoai,
        formData.email_sinh_vien
      );

      showSuccess('Đăng ký thành công! Vui lòng đăng nhập');
      
      // Chuyển hướng về trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate('/dang-nhap');
      }, 2000);
    } catch (err) {
      showError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Nhập username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Nhập password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Xác nhận password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ho_ten">Họ tên:</label>
            <input
              type="text"
              id="ho_ten"
              name="ho_ten"
              value={formData.ho_ten}
              onChange={handleInputChange}
              placeholder="Nhập họ tên (tùy chọn)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gioi_tinh">Giới tính:</label>
            <select
              id="gioi_tinh"
              name="gioi_tinh"
              value={formData.gioi_tinh}
              onChange={handleInputChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="so_dien_thoai">Số điện thoại:</label>
            <input
              type="tel"
              id="so_dien_thoai"
              name="so_dien_thoai"
              value={formData.so_dien_thoai}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại (tùy chọn)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_sinh_vien">Email:</label>
            <input
              type="email"
              id="email_sinh_vien"
              name="email_sinh_vien"
              value={formData.email_sinh_vien}
              onChange={handleInputChange}
              placeholder="Nhập email (tùy chọn)"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-link">
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập tại đây</Link>
        </p>
      </div>
    </div>
  );
};

export default TrangDangKy;
