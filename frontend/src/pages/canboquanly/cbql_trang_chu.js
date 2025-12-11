import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService, canBoHuongDanService } from '../../services/api';
import '../../styles/canboquanly/cbql_trang_chu.css';

const CanBoTrangChu = () => {
  const [thongKe, setThongKe] = useState({ donVi: 0, canBoHuongDan: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThongKe = async () => {
      try {
        const [donViRes, canBoRes] = await Promise.all([
          donViService.getAll(),
          canBoHuongDanService.getAll(),
        ]);

        setThongKe({
          donVi: donViRes.data.length,
          canBoHuongDan: canBoRes.data.length,
        });
      } catch (err) {
        console.error(err);
        setError('Không thể lấy thống kê');
      } finally {
        setLoading(false);
      }
    };

    fetchThongKe();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="cbql__trang_chu">
      {error && <div className="error-message">{error}</div>}

      <div className="cbql__trang_chu--thong_ke_container">
        <h2>Thống kê số lượng</h2>
        <div className="cbql__trang_chu--thong_ke_grid">
          <div className="cbql__trang_chu--thong_ke_item">
            <h3>Đơn vị thực tập</h3>
            <p className="cbql__trang_chu--thong_ke_number">{thongKe.donVi}</p>
            <Link to="/quan-ly-don-vi" className="cbql__trang_chu--link_quanly">
              Quản lý
            </Link>
          </div>

          <div className="cbql__trang_chu--thong_ke_item">
            <h3>Cán bộ hướng dẫn</h3>
            <p className="cbql__trang_chu--thong_ke_number">{thongKe.canBoHuongDan}</p>
            <Link to="/quan-ly-can-bo-huong-dan" className="cbql__trang_chu--link_quanly">
              Quản lý
            </Link>
          </div>
        </div>
      </div>

      <div className="cbql__trang_chu--action_container">
        <h2>Chức năng</h2>
        <div className="cbql__trang_chu--action_buttons">
          <Link to="/danh-sach-don-vi" className="btn btn-primary">
            Quản lý Đơn vị
          </Link>
          <Link to="/danh-sach-can-bo" className="btn btn-primary">
            Quản lý Cán bộ hướng dẫn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CanBoTrangChu;