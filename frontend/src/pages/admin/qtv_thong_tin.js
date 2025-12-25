import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, adminService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/admin/qtv_thong_tin.css';

const AdminThongTinCaNhan = () => {
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin đăng nhập hiện tại để biết id
        const authRes = await authService.getCurrentUser();
        const userId = authRes.data.user.id;

        // Lấy thông tin profile admin
        const profileRes = await adminService.getProfile(userId);

        setUserData(profileRes.data.user);
        setEmail(profileRes.data.user.email_admin || '');
      } catch (err) {
        showError('Vui lòng đăng nhập lại');
        navigate('/dang-nhap');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, showError]);

  const handleSave = async () => {
    try {
      const updateData = { email_admin: email };

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          showError('Mật khẩu xác nhận không khớp');
          return;
        }
        updateData.password = newPassword;
      }

      await adminService.update(userData.id, updateData);

      setIsEditing(false);
      setNewPassword('');
      setConfirmPassword('');
      showSuccess('Cập nhật thành công');
    } catch (err) {
      showError(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="qtv__thong_tin">
      <h1>Thông tin cá nhân</h1>

      <div className="qtv__thong_tin--content">
        <div className="qtv__thong_tin--section">
          <h3>Thông tin tài khoản</h3>

          <div className="qtv__thong_tin--info_group">
            <div className="qtv__thong_tin--info_row">
              <span className="label">Vai trò:</span>
              <span className="value">Quản trị viên</span>
            </div>

            <div className="qtv__thong_tin--info_row">
              <span className="label">Username:</span>
              <span className="value">{userData.username}</span>
            </div>
          </div>
        </div>

        <div className="qtv__thong_tin--section">

          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <div className="qtv__thong_tin--info_row">
              <span className="label">Email:</span>
              <span className="value">{userData.email_admin || 'Chưa cập nhật'}</span>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="qtv__thong_tin--section">
            <h3>Đổi mật khẩu</h3>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <div className="qtv__thong_tin--button_group">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button className="btn btn-success" onClick={handleSave}>
                Lưu
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setEmail(userData.email_admin || '');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                Hủy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminThongTinCaNhan;