import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/trangchu/trang_chu_sinh_vien.css';

const SinhVienTrangChu = () => {
  return (
    <div className="trang_chu_container">
      <h1>Trang chủ Sinh viên</h1>

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

      <div className="info_section">
        <h2>Thông tin chức năng</h2>
        <ul>
          <li>Xem danh sách đơn vị thực tập với giao diện card bắt mắt</li>
          <li>Xem chi tiết thông tin từng đơn vị</li>
          <li>Xem danh sách cán bộ hướng dẫn</li>
          <li>Xem chi tiết thông tin cán bộ hướng dẫn</li>
          <li>Tìm kiếm và lọc nâng cao theo tên, địa chỉ, tỉnh/thành phố, quận/huyện, xã/phường</li>
          <li>Xem thông tin cá nhân của mình</li>
        </ul>
      </div>
    </div>
  );
};

export default SinhVienTrangChu;
