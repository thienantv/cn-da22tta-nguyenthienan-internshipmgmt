import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sinhvien/sv_trang_chu.css';

const SinhVienTrangChu = () => {
  return (
    <div className="sv__trang_chu">

      <div className="sv__trang_chu--welcome_section">
        <p>Chào mừng đến cổng thông tin quản lý thực tập</p>
      </div>

      <div className="sv__trang_chu--action_container">
        <h2>Chức năng</h2>
        <div className="sv__trang_chu--action_buttons">
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
