import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/header.css";
import "../../assets/css/footer.css";
import "../../assets/css/main.css";

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar-custom">
        <Link to="/" className="navbar-brand-custom">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/c/ce/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Tr%C3%A0_Vinh.png"
            alt="TVU Logo"
            className="logo"
          />
          Quản Lý Thông Tin Đơn Vị Thực Tập
        </Link>

        <div className="navbar-links">
          <Link className="nav-item" to="/">Trang chủ</Link>
          <Link className="nav-item" to="/donvi">Đơn vị thực tập</Link>
          <Link className="nav-item" to="/canbo">Cán bộ hướng dẫn</Link>

          {!user && (
            <>
              <Link to="/login" className="btn-outline">Đăng nhập</Link>
              <Link to="/register" className="btn-light">Đăng ký</Link>
            </>
          )}

          {user && (
            <>
              <span className="user-label">👤 {user.username}</span>
              <button className="btn-outline" onClick={handleLogout}>Đăng xuất</button>
            </>
          )}
        </div>
      </nav>

      {/* Nội dung động */}
      <main className="main-content">
        {location.pathname === "/" ? (
          <div className="home-welcome">
            <h2>👋 Chào mừng bạn đến với hệ thống quản lý thông tin đơn vị thực tập!</h2>
            <p className="text-muted">Sử dụng menu để truy cập các chức năng.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Footer */}
      <footer className="footer-custom">
        © 2025 - Quản lý Thực tập - Nguyễn Thiên Ân | Trường Đại học Trà Vinh (TVU)
      </footer>
    </div>
  );
}