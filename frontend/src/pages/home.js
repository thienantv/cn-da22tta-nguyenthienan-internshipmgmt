import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    if (user) {
      // Chuyển hướng đến trang chủ theo role
      if (user.role === 'admin') {
        navigate('/trang-chu-admin');
      } else if (user.role === 'can_bo_quan_ly') {
        navigate('/trang-chu-can-bo');
      } else if (user.role === 'sinh_vien') {
        navigate('/trang-chu-sinh-vien');
      }
    }
    else {
      navigate('/dang-nhap');
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Quản lý Thực tập CNTT</h1>
        <p>Hệ thống quản lý đơn vị thực tập của sinh viên CNTT</p>
        
        {!user && (
          <div className="home-buttons">
            <a href="/dang-nhap" className="btn btn-primary btn-large">
              Đăng nhập
            </a>
            <a href="/dang-ky" className="btn btn-secondary btn-large">
              Đăng ký
            </a>
          </div>
        )}

        <div className="home-features">
          <h2>Chức năng chính</h2>
          <ul>
            <li>Quản lý thông tin đơn vị thực tập</li>
            <li>Quản lý thông tin cán bộ hướng dẫn</li>
            <li>Quản lý tài khoản sinh viên và cán bộ</li>
            <li>Tìm kiếm và lọc nâng cao</li>
            <li>Phân quyền theo vai trò (Admin, Cán bộ, Sinh viên)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
