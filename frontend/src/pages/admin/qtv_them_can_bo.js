import React, { useState } from 'react';
import { canBoQuanLyService } from '../../services/api';
import '../../styles/admin/qtv_them_can_bo.css';

const AdminThemCanBo = ({ onSuccess = () => alert('Thêm cán bộ thành công!'), onCancel = () => alert('Đã hủy') }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mật khẩu trùng nhau
    if (formData.password !== formData.confirm_password) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      await canBoQuanLyService.create(formData);

      setFormData({
        username: '',
        password: '',
        confirm_password: '',
        ho_ten: '',
        gioi_tinh: 'Khác',
        so_dien_thoai: '',
      });

      setError('');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lưu dữ liệu');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      password: '',
      confirm_password: '',
      ho_ten: '',
      gioi_tinh: 'Khác',
      so_dien_thoai: '',
    });
    setError('');
    onCancel();
  };

  return (
    <div className="qtv__them_can_bo">
      <div className="qtv__them_can_bo--form_container">
        <h3>Thêm cán bộ</h3>

        {error && <div className="qtv__them_can_bo--error_message">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* === ROW 1 === */}
          <div className="form-row">
            <div className="qtv__them_can_bo--form_group">
              <label>Tài khoản:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="qtv__them_can_bo--form_group">
              <label>Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* === ROW 2 === */}
          <div className="form-row">
            <div className="qtv__them_can_bo--form_group">
              <label>Xác nhận mật khẩu:</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="qtv__them_can_bo--form_group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* === ROW 3 === */}
          <div className="form-row">
            <div className="qtv__them_can_bo--form_group">
              <label>Giới tính:</label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleInputChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="qtv__them_can_bo--form_group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="qtv__them_can_bo--form_buttons">
            <button type="submit" className="btn-success">
              Thêm
            </button>

            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Hủy
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AdminThemCanBo;
