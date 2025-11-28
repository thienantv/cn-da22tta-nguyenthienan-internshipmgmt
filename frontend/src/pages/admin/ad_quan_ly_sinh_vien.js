import React, { useState, useEffect } from 'react';
import { sinhVienService } from '../../services/api';
import '../../styles/admin/quan_ly.css';

const AdminQuanLySinhVien = () => {
  const [sinhVien, setSinhVien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email_sinh_vien: '',
  });

  useEffect(() => {
    fetchSinhVien();
  }, []);

  const fetchSinhVien = async () => {
    try {
      const response = await sinhVienService.getAll();
      setSinhVien(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách sinh viên');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await sinhVienService.update(editingId, formData);
      } else {
        await sinhVienService.create(formData);
      }
      fetchSinhVien();
      setFormData({
        username: '',
        password: '',
        ho_ten: '',
        gioi_tinh: 'Khác',
        so_dien_thoai: '',
        email_sinh_vien: '',
      });
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lưu dữ liệu');
    }
  };

  const handleEdit = (sv) => {
    setFormData({
      username: sv.username,
      ho_ten: sv.ho_ten,
      gioi_tinh: sv.gioi_tinh,
      so_dien_thoai: sv.so_dien_thoai,
      email_sinh_vien: sv.email_sinh_vien,
    });
    setEditingId(sv.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await sinhVienService.delete(id);
        fetchSinhVien();
      } catch (err) {
        setError('Xóa thất bại');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      username: '',
      password: '',
      ho_ten: '',
      gioi_tinh: 'Khác',
      so_dien_thoai: '',
      email_sinh_vien: '',
    });
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="quan_ly_container">
      <h1>Quản lý Sinh viên</h1>

      {error && <div className="error-message">{error}</div>}

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          + Thêm sinh viên
        </button>
      )}

      {showForm && (
        <div className="form_container">
          <h3>{editingId ? 'Sửa sinh viên' : 'Thêm sinh viên'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={editingId !== null}
                required
              />
            </div>

            {!editingId && (
              <div className="form_group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form_group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleInputChange}
              />
            </div>

            <div className="form_group">
              <label>Giới tính:</label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleInputChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="form_group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
              />
            </div>

            <div className="form_group">
              <label>Email:</label>
              <input
                type="email"
                name="email_sinh_vien"
                value={formData.email_sinh_vien}
                onChange={handleInputChange}
              />
            </div>

            <div className="form_buttons">
              <button type="submit" className="btn btn-success">
                {editingId ? 'Cập nhật' : 'Thêm'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table_wrapper">
        <table className="data_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Họ tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sinhVien.map((sv) => (
              <tr key={sv.id}>
                <td>{sv.id}</td>
                <td>{sv.username}</td>
                <td>{sv.ho_ten}</td>
                <td>{sv.gioi_tinh}</td>
                <td>{sv.so_dien_thoai}</td>
                <td>{sv.email_sinh_vien}</td>
                <td className="action_cell">
                  <button
                    onClick={() => handleEdit(sv)}
                    className="btn-link btn-warning"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(sv.id)}
                    className="btn-link btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuanLySinhVien;
