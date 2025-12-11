import React, { useState, useEffect } from 'react';
import { canBoQuanLyService } from '../../services/api';
import '../../styles/admin/qtv_quan_ly_can_bo.css';

const AdminQuanLyCanBo = () => {
  const [canBo, setCanBo] = useState([]);
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
  });

  useEffect(() => {
    fetchCanBo();
  }, []);

  const fetchCanBo = async () => {
    try {
      const response = await canBoQuanLyService.getAll();
      setCanBo(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách cán bộ');
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
        await canBoQuanLyService.update(editingId, formData);
      } else {
        await canBoQuanLyService.create(formData);
      }
      fetchCanBo();
      setFormData({
        username: '',
        password: '',
        ho_ten: '',
        gioi_tinh: 'Khác',
        so_dien_thoai: '',
      });
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lưu dữ liệu');
    }
  };

  const handleEdit = (cb) => {
    setFormData({
      username: cb.username,
      ho_ten: cb.ho_ten,
      gioi_tinh: cb.gioi_tinh,
      so_dien_thoai: cb.so_dien_thoai,
    });
    setEditingId(cb.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await canBoQuanLyService.delete(id);
        fetchCanBo();
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
    });
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="qtv__quan_ly_can_bo">
      <h1>Quản lý Cán bộ</h1>

      {error && <div className="error-message">{error}</div>}

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          + Thêm cán bộ
        </button>
      )}

      {showForm && (
        <div className="qtv__quan_ly_can_bo--form_container">
          <h3>{editingId ? 'Sửa cán bộ' : 'Thêm cán bộ'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="qtv__quan_ly_can_bo--form_group">
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
              <div className="qtv__quan_ly_can_bo--form_group">
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

            <div className="qtv__quan_ly_can_bo--form_group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="qtv__quan_ly_can_bo--form_group">
              <label>Giới tính:</label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleInputChange}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="qtv__quan_ly_can_bo--form_group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
              />
            </div>

            <div className="qtv__quan_ly_can_bo--form_buttons">
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

      <div className="qtv__quan_ly_can_bo--table_wrapper">
        <table className="qtv__quan_ly_can_bo--data_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Họ tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {canBo.map((cb) => (
              <tr key={cb.id}>
                <td>{cb.id}</td>
                <td>{cb.username}</td>
                <td>{cb.ho_ten}</td>
                <td>{cb.gioi_tinh}</td>
                <td>{cb.so_dien_thoai}</td>
                <td className="qtv__quan_ly_can_bo--action_cell">
                  <button
                    onClick={() => handleEdit(cb)}
                    className="qtv__quan_ly_can_bo--btn_link btn-warning"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cb.id)}
                    className="qtv__quan_ly_can_bo--btn_link btn-danger"
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

export default AdminQuanLyCanBo;