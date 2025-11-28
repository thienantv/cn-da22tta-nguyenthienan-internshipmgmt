import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/dang-nhap');
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'can_bo_quan_ly':
        return 'Cán bộ quản lý';
      case 'sinh_vien':
        return 'Sinh viên';
      default:
        return role;
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/vi/c/ce/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Tr%C3%A0_Vinh.png" alt="Logo" className="logo-image" />
            <h1>Quản lý Đơn vị Thực tập</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>

          {user && user.role === 'admin' && (
            <>
              <Link to="/quan-ly-can-bo" className="nav-link">
                Quản lý Cán bộ
              </Link>
              <Link to="/quan-ly-sinh-vien" className="nav-link">
                Quản lý Sinh viên
              </Link>
            </>
          )}

          {user && user.role === 'can_bo_quan_ly' && (
            <>
              <Link to="/quan-ly-don-vi" className="nav-link">
                Quản lý Đơn vị
              </Link>
              <Link to="/quan-ly-can-bo-huong-dan" className="nav-link">
                Quản lý Cán bộ hướng dẫn
              </Link>
            </>
          )}

          {user && user.role === 'sinh_vien' && (
            <>
              <Link to="/danh-sach-don-vi" className="nav-link">
                Đơn vị thực tập
              </Link>
              <Link to="/danh-sach-can-bo" className="nav-link">
                Cán bộ hướng dẫn
              </Link>
            </>
          )}
        </nav>

        {/* User info */}
        {user ? (
          <div className="header-user">
            <span className="user-role">{getRoleLabel(user.role)}</span>
            <span className="user-name">{user.username}</span>
            <Link to={
              user.role === 'admin' ? '/thong-tin-ca-nhan-admin' :
              user.role === 'can_bo_quan_ly' ? '/thong-tin-ca-nhan-can-bo' :
              '/thong-tin-ca-nhan'
            } className="header-link">
              Tài khoản
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="header-auth">
            <Link to="/dang-nhap" className="header-link">
              Đăng nhập
            </Link>
            <Link to="/dang-ky" className="header-link">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;