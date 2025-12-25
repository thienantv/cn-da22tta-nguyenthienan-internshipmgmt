import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { quenMatKhauService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/auth/auth.css';

const TrangQuenMatKhau = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim()) {
        showError('Vui lòng nhập username');
        setLoading(false);
        return;
      }

      const response = await quenMatKhauService.step1CheckUsername(username);

      if (response.data.sessionToken) {
        // Lưu session token vào sessionStorage (không localStorage)
        sessionStorage.setItem('forgotPasswordSession', response.data.sessionToken);
        
        showSuccess(response.data.message);
        
        // Chuyển sang bước xác nhận email
        setTimeout(() => {
          navigate('/quen-mat-khau/xac-nhan-email');
        }, 1000);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Quên Mật Khẩu</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Nhập tên tài khoản của bạn để bắt đầu quy trình đặt lại mật khẩu
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username của bạn"
              disabled={loading}
              autoFocus
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang kiểm tra...' : 'Tiếp tục'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/dang-nhap" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrangQuenMatKhau;
