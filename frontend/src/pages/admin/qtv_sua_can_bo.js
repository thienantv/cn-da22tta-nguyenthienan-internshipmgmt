import React, { useState } from 'react';
import { canBoQuanLyService } from '../../services/api';
import '../../styles/admin/qtv_sua_can_bo.css';

const AdminSuaCanBo = ({ canBo, onSuccess, onCancel }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: canBo.username,
    ho_ten: canBo.ho_ten,
    gioi_tinh: canBo.gioi_tinh,
    so_dien_thoai: canBo.so_dien_thoai,
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra xác nhận mật khẩu nếu có
      if (formData.password && formData.password !== formData.confirm_password) {
        setError('Mật khẩu và xác nhận mật khẩu không khớp');
        return;
      }

      await canBoQuanLyService.update(canBo.id, formData);

      setFormData({
        username: '',
        ho_ten: '',
        gioi_tinh: 'Khác',
        so_dien_thoai: '',
        password: '',
        confirm_password: '',
      });

      setError('');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lưu dữ liệu');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: canBo.username,
      ho_ten: canBo.ho_ten,
      gioi_tinh: canBo.gioi_tinh,
      so_dien_thoai: canBo.so_dien_thoai,
      password: '',
      confirm_password: '',
    });
    setError('');
    onCancel();
  };

  return (
    <div className="qtv__sua_can_bo">
      <div className="qtv__sua_can_bo--form_container">
        <h3>Sửa cán bộ</h3>

        {error && <div className="qtv__sua_can_bo--error_message">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* ROW 1 */}
          <div className="form-row">
            <div className="qtv__sua_can_bo--form_group">
              <label>Tài khoản:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                disabled
              />
            </div>

            <div className="qtv__sua_can_bo--form_group">
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

          {/* ROW 2 */}
          <div className="form-row">
            <div className="qtv__sua_can_bo--form_group">
              <label>Giới tính:</label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleInputChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="qtv__sua_can_bo--form_group">
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
          <div className="qtv__sua_can_bo--form_buttons">
            <button type="submit" className="btn-success">Cập nhật</button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>Hủy</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminSuaCanBo;