import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sinhvien/sv_trangchu.css';

const SinhVienTrangChu = () => {
  return (
    <div className="trang_chu_container">

      <div className="welcome_section">
        <p>Chào mừng đến cổng thông tin quản lý thực tập</p>
      </div>

      <div className="action_container">
        <h2>Chức năng</h2>
        <div className="action_buttons">
          <Link to="/danh-sach-don-vi" className="btn btn-primary">
            Xem Đơn vị thực tập
          </Link>
          <Link to="/danh-sach-can-bo" className="btn btn-primary">
            Xem Cán bộ hướng dẫn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinhVienTrangChu;
