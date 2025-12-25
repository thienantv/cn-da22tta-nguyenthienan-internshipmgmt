import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/auth/auth.css';

const TrangDangNhap = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showError } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(
        formData.username,
        formData.password
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        const role = response.data.user.role;

        if (role === 'admin') navigate('/trang-chu-admin');
        else if (role === 'can_bo_quan_ly') navigate('/trang-chu-can-bo');
        else navigate('/trang-chu-sinh-vien');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-container">

    {/* LEFT BOX — LOGO BOX */}
    {/* <div className="auth-left">
      <h1>Hệ thống quản lý</h1>
      <h1>Thông tin đơn vị thực tập</h1>
      <h1>Sinh viên khoa Công nghệ thông tin</h1>
    </div> */}

    {/* RIGHT BOX — LOGIN BOX */}
    <div className="auth-box">
      <h2>Đăng nhập</h2>
      
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

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <p className="auth-link">
        Chưa có tài khoản? <Link to="/dang-ky">Đăng ký tại đây</Link>
      </p>

      <p className="auth-link" style={{ marginTop: '10px', textAlign: 'center' }}>
        <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
      </p>

    </div>
  </div>
);
};

export default TrangDangNhap;