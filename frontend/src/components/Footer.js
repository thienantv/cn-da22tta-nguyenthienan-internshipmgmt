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
              {/* Facebook */}
              <a
                href="https://www.facebook.com/thienantv21"
                className="social-link facebook"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/thienan.21"
                className="social-link instagram"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* Zalo */}
              <a
                href="https://zalo.me/0395800581"
                className="social-link zalo"
                title="Zalo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="zalo-text">Z</span>
              </a>

              {/* Gmail */}
              <a
                href="mailto:thienantv21@gmail.com"
                className="social-link gmail"
                title="Gmail"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Hệ Thống Quản Lý Thông Tin Đơn Vị Thực Tập</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
