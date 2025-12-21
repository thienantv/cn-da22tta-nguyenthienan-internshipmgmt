import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Về Chúng Tôi</h3>
            <p>
              Hệ thống quản lý đơn vị thực tập - Giải pháp hiệu quả cho việc quản lý 
              và phối hợp giữa sinh viên, cán bộ hướng dẫn và các đơn vị thực tập.
            </p>
          </div>

          {/* <div className="footer-section">
            <h3>Liên Kết Nhanh</h3>
            <ul>
              <li><a href="/">Trang Chủ</a></li>
              <li><a href="#about">Giới Thiệu</a></li>
              <li><a href="#contact">Liên Hệ</a></li>
              <li><a href="#help">Trợ Giúp</a></li>
            </ul>
          </div> */}

          <div className="footer-section">
            <h3>Thông Tin Liên Hệ</h3>
            <p>
              <strong>Email:</strong> thienantv21@gmail.com
            </p>
            <p>
              <strong>Điện Thoại:</strong> 039 5800 581
            </p>
            <p>
              <strong>Địa Chỉ:</strong> Phường Trà Vinh, tỉnh Vĩnh Long, Việt Nam
            </p>
          </div>

          <div className="footer-section">
            <h3>Mạng Xã Hội</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/thienantv21" className="social-link" title="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              {/* <a href="#twitter" className="social-link" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#linkedin" className="social-link" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a> */}
              <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fthienan.21%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExbVJPN2VhSXhKWDhxbXlNVHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4-DaSAIF8xBslhUnpyC4wgdcnKR3kwF2MIswlM75NFV5x8XfDzZz8_fj2YaA_aem_9oBDd__--5y6dJXr4sBL5Q&h=AT2AuQBUgmtZ4ekU4d-gtz30OjH90_xrQ-oSbkCaDS1E3PH5MhcDG9LzuvZNDwj1-6_J7sXFLjTZu2pxjMiSh3O1q2OKJuy3XxBD5_Vz62fiBFubX_h96pReFn-bNhIArx84mZg2Q8xDzKIxkl0T" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Hệ Thống Quản Lý Đơn Vị Thực Tập</p>
          {/* <div className="footer-links">
            <a href="#privacy">Chính Sách Bảo Mật</a>
            <span>|</span>
            <a href="#terms">Điều Khoản Sử Dụng</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
