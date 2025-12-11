import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import '../../styles/admin/qtv_trang_chu.css';

const AdminTrangChu = () => {
  const [thongKe, setThongKe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThongKe = async () => {
      try {
        const response = await adminService.getThongKe();
        setThongKe(response.data);
      } catch (err) {
        setError('Không thể lấy thống kê');
      } finally {
        setLoading(false);
      }
    };

    fetchThongKe();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="qtv__trang_chu">

      {error && <div className="error-message">{error}</div>}

      <div className="qtv__trang_chu--stats">
        <h2>Thống kê tài khoản</h2>
        
        {thongKe && (
          <div className="qtv__trang_chu--stats-grid">
            <div className="qtv__trang_chu--stat-item">
              <h3>Admin</h3>
              <p className="qtv__trang_chu--stat-number">{thongKe.admin}</p>
            </div>

            <div className="qtv__trang_chu--stat-item">
              <h3>Cán bộ quản lý</h3>
              <p className="qtv__trang_chu--stat-number">{thongKe.can_bo_quan_ly}</p>
              <Link to="/quan-ly-can-bo" className="qtv__trang_chu--manage-link">
                Quản lý
              </Link>
            </div>

            <div className="qtv__trang_chu--stat-item">
              <h3>Sinh viên</h3>
              <p className="qtv__trang_chu--stat-number">{thongKe.sinh_vien}</p>
              <Link to="/quan-ly-sinh-vien" className="qtv__trang_chu--manage-link">
                Quản lý
              </Link>
            </div>

            <div className="qtv__trang_chu--stat-item">
              <h3>Tổng tài khoản</h3>
              <p className="qtv__trang_chu--stat-number">
                {thongKe.admin + thongKe.can_bo_quan_ly + thongKe.sinh_vien}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="qtv__trang_chu--actions">
        <h2>Quản lý</h2>
        <div className="qtv__trang_chu--action-buttons">
          <Link to="/quan-ly-can-bo" className="btn btn-primary">
            Quản lý Cán bộ
          </Link>
          <Link to="/quan-ly-sinh-vien" className="btn btn-primary">
            Quản lý Sinh viên
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminTrangChu;
