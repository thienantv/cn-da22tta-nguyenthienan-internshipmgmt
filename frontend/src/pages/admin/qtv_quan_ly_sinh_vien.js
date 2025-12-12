import React, { useState, useEffect } from 'react';
import { sinhVienService } from '../../services/api';
import AdminThemSinhVien from './qtv_them_sinh_vien';
import AdminSuaSinhVien from './qtv_sua_sinh_vien';
import '../../styles/admin/qtv_quan_ly_sinh_vien.css';

const AdminQuanLySinhVien = () => {
  const [sinhVien, setSinhVien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null); // 'them' hoặc 'sua'
  const [editingSinhVien, setEditingSinhVien] = useState(null);

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

  const handleAddClick = () => {
    setFormType('them');
    setShowForm(true);
  };

  const handleEdit = (sv) => {
    setFormType('sua');
    setEditingSinhVien(sv);
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

  const handleFormSuccess = () => {
    setShowForm(false);
    setFormType(null);
    setEditingSinhVien(null);
    fetchSinhVien();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setFormType(null);
    setEditingSinhVien(null);
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="qtv__quan_ly_sinh_vien">
      <h1>Quản lý Sinh viên</h1>

      {error && <div className="error-message">{error}</div>}

      {!showForm && (
        <button onClick={handleAddClick} className="btn btn-primary">
          + Thêm sinh viên
        </button>
      )}

      {showForm && formType === 'them' && (
        <AdminThemSinhVien 
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {showForm && formType === 'sua' && editingSinhVien && (
        <AdminSuaSinhVien 
          sinhVien={editingSinhVien}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      <div className="qtv__quan_ly_sinh_vien--table_wrapper">
        <table className="qtv__quan_ly_sinh_vien--data_table">
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
                <td className="qtv__quan_ly_sinh_vien--action_cell">
                  <button
                    onClick={() => handleEdit(sv)}
                    className="qtv__quan_ly_sinh_vien--btn_link btn-warning"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(sv.id)}
                    className="qtv__quan_ly_sinh_vien--btn_link btn-danger"
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
