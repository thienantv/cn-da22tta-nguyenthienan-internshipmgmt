import React, { useState } from 'react';
import { sinhVienService } from '../../services/api';
import '../../styles/admin/qtv_them_sinh_vien.css';

const AdminThemSinhVien = ({ onSuccess = () => alert('Thêm sinh viên thành công!'), onCancel = () => alert('Đã hủy') }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email_sinh_vien: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sinhVienService.create(formData);

      setFormData({
        username: '',
        password: '',
        ho_ten: '',
        gioi_tinh: 'Khác',
        so_dien_thoai: '',
        email_sinh_vien: '',
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
      ho_ten: '',
      gioi_tinh: 'Khác',
      so_dien_thoai: '',
      email_sinh_vien: '',
    });
    setError('');
    onCancel();
  };

  return (
    <div className="qtv__them_sinh_vien">
      <div className="qtv__them_sinh_vien--form_container">
        <h3>Thêm sinh viên</h3>

        {error && <div className="qtv__them_sinh_vien--error_message">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* ROW 1 */}
          <div className="form-row">
            <div className="qtv__them_sinh_vien--form_group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="qtv__them_sinh_vien--form_group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="form-row">
            <div className="qtv__them_sinh_vien--form_group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleInputChange}
              />
            </div>

            <div className="qtv__them_sinh_vien--form_group">
              <label>Giới tính:</label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleInputChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="form-row">
            <div className="qtv__them_sinh_vien--form_group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
              />
            </div>

            <div className="qtv__them_sinh_vien--form_group">
              <label>Email:</label>
              <input
                type="email"
                name="email_sinh_vien"
                value={formData.email_sinh_vien}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="qtv__them_sinh_vien--form_buttons">
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

export default AdminThemSinhVien;
