import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { quenMatKhauService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/auth/auth.css';

const TrangDatLaiMatKhau = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [searchParams] = useSearchParams();
  // Lấy token từ URL hoặc sessionStorage
  const tokenFromUrl = searchParams.get('token');
  const tokenFromSession = sessionStorage.getItem('resetToken');
  const token = tokenFromUrl || tokenFromSession;

  useEffect(() => {
    // Xác thực token - chỉ chạy 1 lần khi tokenValid = false
    if (tokenValid) {
      return; // Nếu token đã xác thực rồi, không chạy lại
    }

    const verifyToken = async () => {
      try {
        if (!token) {
          console.log('Token không tìm thấy. URL token:', tokenFromUrl, 'Session token:', tokenFromSession);
          showError('Token không hợp lệ. Vui lòng kiểm tra lại');
          setVerifying(false);
          setTimeout(() => navigate('/quen-mat-khau'), 2000);
          return;
        }

        console.log('Xác thực token:', token);
        const response = await quenMatKhauService.verifyResetToken(token);
        
        if (response.data.userId) {
          setTokenValid(true);
        }
      } catch (err) {
        console.error('Lỗi xác thực token:', err);
        showError(err.response?.data?.message || 'Token đã hết hạn hoặc không hợp lệ');
        setTimeout(() => navigate('/quen-mat-khau'), 2000);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token, tokenValid, navigate, showError, tokenFromUrl, tokenFromSession]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate
      if (!newPassword || !confirmPassword) {
        showError('Vui lòng nhập mật khẩu');
        setLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        showError('Mật khẩu phải ít nhất 6 ký tự');
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        showError('Mật khẩu xác nhận không khớp');
        setLoading(false);
        return;
      }

      // Gửi request reset password
      const response = await quenMatKhauService.step4ResetPassword(
        token,
        newPassword,
        confirmPassword
      );

      if (response.status === 200) {
        showSuccess('Đặt lại mật khẩu thành công!');
        
        // Xóa session - điều này quan trọng để tránh verify token lại
        sessionStorage.removeItem('forgotPasswordSession');
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetToken'); // Xóa token sau khi thành công
        
        // Chuyển về trang đăng nhập
        setTimeout(() => {
          navigate('/dang-nhap');
        }, 2000);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Lỗi đặt lại mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Đang xác thực...</h2>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              display: 'inline-block',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Token Không Hợp Lệ</h2>
          <p style={{ color: '#dc3545' }}>
            Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
          </p>
          <Link to="/quen-mat-khau" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
            Bắt đầu lại
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đặt Lại Mật Khẩu</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Nhập mật khẩu mới của bạn
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Mật khẩu mới:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                disabled={loading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginBottom: '10px' }}>
              ⚠️ Mật khẩu không khớp
            </div>
          )}

          {newPassword && newPassword.length < 6 && (
            <div style={{ color: '#ffc107', fontSize: '12px', marginBottom: '10px' }}>
              ⚠️ Mật khẩu phải ít nhất 6 ký tự
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}
          >
            {loading ? 'Đang cập nhật...' : 'Đặt Lại Mật Khẩu'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/dang-nhap" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TrangDatLaiMatKhau;
