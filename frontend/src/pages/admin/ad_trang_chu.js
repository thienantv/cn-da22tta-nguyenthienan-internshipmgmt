import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import '../../styles/trangchu/trang_chu_admin.css';

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
    <div className="trang_chu_container">

      {error && <div className="error-message">{error}</div>}

      <div className="thong_ke_container">
        <h2>Thống kê tài khoản</h2>
        
        {thongKe && (
          <div className="thong_ke_grid">
            <div className="thong_ke_item">
              <h3>Admin</h3>
              <p className="thong_ke_number">{thongKe.admin}</p>
            </div>

            <div className="thong_ke_item">
              <h3>Cán bộ quản lý</h3>
              <p className="thong_ke_number">{thongKe.can_bo_quan_ly}</p>
              <Link to="/quan-ly-can-bo" className="link-quanly">
                Quản lý
              </Link>
            </div>

            <div className="thong_ke_item">
              <h3>Sinh viên</h3>
              <p className="thong_ke_number">{thongKe.sinh_vien}</p>
              <Link to="/quan-ly-sinh-vien" className="link-quanly">
                Quản lý
              </Link>
            </div>

            <div className="thong_ke_item">
              <h3>Tổng tài khoản</h3>
              <p className="thong_ke_number">
                {thongKe.admin + thongKe.can_bo_quan_ly + thongKe.sinh_vien}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="action_container">
        <h2>Quản lý</h2>
        <div className="action_buttons">
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
