import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/dang-nhap');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
            <img src="/logo.png" alt="Logo" className="logo-image" />
            <h1>Quản lý Đơn vị Thực tập</h1>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            Trang chủ
          </Link>

          {user && user.role === 'admin' && (
            <>
              <Link to="/quan-ly-can-bo" className="nav-link" onClick={closeMobileMenu}>
                Quản lý Cán bộ
              </Link>
              <Link to="/quan-ly-sinh-vien" className="nav-link" onClick={closeMobileMenu}>
                Quản lý Sinh viên
              </Link>
            </>
          )}

          {user && user.role === 'can_bo_quan_ly' && (
            <>
              <Link to="/quan-ly-don-vi" className="nav-link" onClick={closeMobileMenu}>
                Quản lý Đơn vị
              </Link>
              <Link to="/quan-ly-can-bo-huong-dan" className="nav-link" onClick={closeMobileMenu}>
                Quản lý Cán bộ hướng dẫn
              </Link>
            </>
          )}

          {user && user.role === 'sinh_vien' && (
            <>
              <Link to="/danh-sach-don-vi" className="nav-link" onClick={closeMobileMenu}>
                Đơn vị thực tập
              </Link>
              <Link to="/danh-sach-can-bo" className="nav-link" onClick={closeMobileMenu}>
                Cán bộ hướng dẫn
              </Link>
            </>
          )}

          {/* User info in mobile menu */}
          {user ? (
            <div className="nav-user-mobile">
              <Link to={
                user.role === 'admin' ? '/thong-tin-ca-nhan-admin' :
                user.role === 'can_bo_quan_ly' ? '/thong-tin-ca-nhan-can-bo' :
                '/thong-tin-ca-nhan'
              } className="nav-link" onClick={closeMobileMenu}>
                Tài khoản
              </Link>
              <button onClick={() => {
                handleLogout();
                closeMobileMenu();
              }} className="btn-logout-mobile">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="nav-auth-mobile">
              <Link to="/dang-nhap" className="nav-link" onClick={closeMobileMenu}>
                Đăng nhập
              </Link>
              <Link to="/dang-ky" className="nav-link" onClick={closeMobileMenu}>
                Đăng ký
              </Link>
            </div>
          )}
        </nav>

        {/* User info - Desktop only */}
        {user ? (
          <div className="header-user">
            <span className="user-role">{getRoleLabel(user.role)}</span>
            <span className="user-name">{user.name}</span>
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