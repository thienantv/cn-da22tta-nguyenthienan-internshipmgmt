import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { quenMatKhauService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/auth/auth.css';

const TrangXacNhanEmail = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const step3InProgress = useRef(false);

  // Kiểm tra session từ bước 1
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('forgotPasswordSession');
    if (!sessionToken) {
      showError('Phiên làm việc không hợp lệ. Vui lòng bắt đầu lại');
      navigate('/quen-mat-khau');
    }
  }, [navigate, showError]);

  // STEP 2 – Xác nhận email
  const handleStep2 = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showError('Vui lòng nhập email');
      return;
    }

    setLoading(true);

    try {
      const sessionToken = sessionStorage.getItem('forgotPasswordSession');
      await quenMatKhauService.step2VerifyEmail(sessionToken, email);

      showSuccess('Email hợp lệ');
      setStep(2);

      // Sau khi xác nhận email xong → gửi email reset
      await handleStep3();
    } catch (err) {
      showError(err.response?.data?.message || 'Email không khớp');
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 – Gửi email reset
  const handleStep3 = async () => {
    if (step3InProgress.current) return;

    step3InProgress.current = true;

    try {
      const sessionToken = sessionStorage.getItem('forgotPasswordSession');
      await quenMatKhauService.step3SendResetEmail(sessionToken, email);

      showSuccess('Đã gửi email đặt lại mật khẩu');
      setStep(3);

      // ❗ KHÔNG redirect
      // Người dùng phải click link trong email
    } catch (err) {
      showError(err.response?.data?.message || 'Lỗi gửi email');
      step3InProgress.current = false;
      setStep(1);
    }
  };

  const handleGoBack = () => {
    sessionStorage.removeItem('forgotPasswordSession');
    navigate('/quen-mat-khau');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {step === 1 && (
          <>
            <h2>Xác Nhận Email</h2>
            <p style={{ color: '#666', marginBottom: 20 }}>
              Vui lòng nhập email đã đăng ký với tài khoản của bạn
            </p>

            <form onSubmit={handleStep2}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Đang xác nhận...' : 'Xác nhận email'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Đang gửi email...</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Vui lòng chờ trong giây lát
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h2>✓ Email đã được gửi</h2>
            <div style={{ background: '#d4edda', padding: 16, borderRadius: 5 }}>
              <p style={{ margin: 0, color: '#155724' }}>
                Email đặt lại mật khẩu đã được gửi tới <strong>{email}</strong>
              </p>
            </div>
            <p style={{ color: '#666', marginTop: 16 }}>
              Vui lòng kiểm tra hộp thư và nhấp vào liên kết trong email.
              Liên kết sẽ hết hạn sau 15 phút.
            </p>
          </>
        )}

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button
            onClick={handleGoBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            ← Bắt đầu lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrangXacNhanEmail;