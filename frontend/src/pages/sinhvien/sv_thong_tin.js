import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, canBoQuanLyService, sinhVienService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/sinhvien/sv_thong_tin.css';

const SinhVienThongTin = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(storedUser);

        // Lấy thông tin người dùng hiện tại
        const response = await authService.getCurrentUser();
        setUserData(response.data.user);
        setFormData(response.data.user);
      } catch (err) {
        showError('Không thể lấy thông tin');
        navigate('/dang-nhap');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updateData = { ...formData };

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          showError('Mật khẩu mới và xác nhận không khớp');
          return;
        }
        updateData.password = newPassword;
      }

      if (user.role === 'can_bo_quan_ly') {
        await canBoQuanLyService.update(user.id, updateData);
      } else if (user.role === 'sinh_vien') {
        await sinhVienService.update(user.id, updateData);
      }

      setUserData(formData);
      setIsEditing(false);
      setNewPassword('');
      setConfirmPassword('');
      showSuccess('Cập nhật thông tin thành công');
    } catch (err) {
      showError(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'can_bo_quan_ly':
        return 'Cán bộ quản lý';
      case 'sinh_vien':
        return 'Sinh viên';
      default:
        return role;
    }
  };

  return (
    <div className="sv__thong_tin">

      {userData && (
        <div className="sv__thong_tin--content">
          <div className="sv__thong_tin--section">
            <h3>Thông tin tài khoản</h3>
            <div className="sv__thong_tin--info_group">
              <div className="sv__thong_tin--info_row">
                <span className="label">Vai trò:</span>
                <span className="value">{getRoleLabel(user?.role)}</span>
              </div>
              <div className="sv__thong_tin--info_row">
                <span className="label">Username:</span>
                <span className="value">{userData.username}</span>
              </div>
            </div>
          </div>

          {userData.ho_ten !== undefined && (
            <div className="sv__thong_tin--section">
              <h3>Thông tin cá nhân</h3>
              {isEditing ? (
                <div className="sv__thong_tin--form_group">
                  <div className="sv__thong_tin--form_item">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      name="ho_ten"
                      value={formData.ho_ten || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  {userData.gioi_tinh !== undefined && (
                    <div className="sv__thong_tin--form_item">
                      <label>Giới tính:</label>
                      <select
                        name="gioi_tinh"
                        value={formData.gioi_tinh || ''}
                        onChange={handleInputChange}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  )}
                  <div className="sv__thong_tin--form_item">
                    <label>Số điện thoại:</label>
                    <input
                      type="tel"
                      name="so_dien_thoai"
                      value={formData.so_dien_thoai || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  {userData.email_sinh_vien !== undefined && (
                    <div className="sv__thong_tin--form_item">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email_sinh_vien"
                        value={formData.email_sinh_vien || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="sv__thong_tin--info_group">
                  <div className="sv__thong_tin--info_row">
                    <span className="label">Họ tên:</span>
                    <span className="value">{userData.ho_ten}</span>
                  </div>
                  {userData.gioi_tinh && (
                    <div className="sv__thong_tin--info_row">
                      <span className="label">Giới tính:</span>
                      <span className="value">{userData.gioi_tinh}</span>
                    </div>
                  )}
                  <div className="sv__thong_tin--info_row">
                    <span className="label">Số điện thoại:</span>
                    <span className="value">{userData.so_dien_thoai || 'Chưa cập nhật'}</span>
                  </div>
                  {userData.email_sinh_vien && (
                    <div className="sv__thong_tin--info_row">
                      <span className="label">Email:</span>
                      <span className="value">{userData.email_sinh_vien || 'Chưa cập nhật'}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {isEditing && (
            <div className="sv__thong_tin--section">
              <h3>Đổi mật khẩu</h3>
              <div className="sv__thong_tin--form_group">
                <div className="sv__thong_tin--form_item">
                  <label>Mật khẩu mới (để trống nếu không đổi):</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="sv__thong_tin--form_item">
                  <label>Xác nhận mật khẩu:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="sv__thong_tin--button_group">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                Chỉnh sửa
              </button>
            ) : (
              <>
                <button onClick={handleSave} className="btn btn-success">
                  Lưu
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(userData);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="btn btn-secondary"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinhVienThongTin;
