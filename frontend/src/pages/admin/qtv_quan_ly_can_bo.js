import React, { useState, useEffect } from 'react';
import { canBoQuanLyService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import AdminThemCanBo from './qtv_them_can_bo';
import AdminSuaCanBo from './qtv_sua_can_bo';
import '../../styles/admin/qtv_quan_ly_can_bo.css';

const AdminQuanLyCanBo = () => {
  const { showError } = useToast();
  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null); // 'them' hoặc 'sua'
  const [editingCanBo, setEditingCanBo] = useState(null);

  useEffect(() => {
    fetchCanBo();
  }, []);

  const fetchCanBo = async () => {
    try {
      const response = await canBoQuanLyService.getAll();
      setCanBo(response.data);
    } catch (err) {
      showError('Không thể tải danh sách cán bộ');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setFormType('them');
    setShowForm(true);
  };

  const handleEdit = (cb) => {
    setFormType('sua');
    setEditingCanBo(cb);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await canBoQuanLyService.delete(id);
        fetchCanBo();
      } catch (err) {
        showError('Xóa thất bại');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setFormType(null);
    setEditingCanBo(null);
    fetchCanBo();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setFormType(null);
    setEditingCanBo(null);
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="qtv__quan_ly_can_bo">
      {/* <h1>Quản lý Cán bộ</h1> */}

      {!showForm && (
        <button onClick={handleAddClick} className="add-button-full">
          + Thêm cán bộ
        </button>
      )}

      {showForm && formType === 'them' && (
        <AdminThemCanBo 
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {showForm && formType === 'sua' && editingCanBo && (
        <AdminSuaCanBo 
          canBo={editingCanBo}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {/* TABLE */}
      <div className="qtv__quan_ly_can_bo--table_wrapper">
        <table className="qtv__quan_ly_can_bo--data_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tài khoản</th>
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