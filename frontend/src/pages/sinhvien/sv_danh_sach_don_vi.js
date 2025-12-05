import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/sinhvien/sv_danhsach_donvi.css';

const SinhVienDanhSachDonVi = () => {
  const [donVi, setDonVi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDonVi();
  }, []);

  const fetchDonVi = async (query = '') => {
    try {
      setLoading(true);
      let response;

      if (query) {
        response = await donViService.search({ query });
      } else {
        response = await donViService.getAll();
      }

      setDonVi(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách đơn vị');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchDonVi(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    fetchDonVi();
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="danh_sach_container">

      {error && <div className="error-message">{error}</div>}

      {/* Bộ lọc */}
      <div className="filter_section">
        <div className="filter_grid">
          <div className="filter_item">
            <label>Tìm kiếm:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Tìm theo tên đơn vị, địa chỉ, điện thoại, email"
            />
          </div>

          <div className="filter_buttons">
            <button className="btn btn-primary" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách card */}
      {donVi.length === 0 ? (
        <div className="empty-message">Không có đơn vị nào</div>
      ) : (
        <div className="don_vi_cards">
          {donVi.map((dv) => (
            <div key={dv.ma_don_vi} className="don_vi_card">
              <div className="card_image">
                <img
                  src={
                    dv.hinh_anh
                      ? dv.hinh_anh.startsWith('data:')
                        ? dv.hinh_anh
                        : dv.hinh_anh
                      : 'https://via.placeholder.com/300x200?text=No+Image'
                  }
                  alt={dv.ten_don_vi}
                />
              </div>
              <div className="card_content">
                <h3>{dv.ten_don_vi}</h3>
                <p className="card_address">{dv.dia_chi}</p>
                <p className="card_description">{dv.gioi_thieu?.substring(0, 100)}...</p>
                <Link to={`/sinh-vien/chi-tiet-don-vi/${dv.ma_don_vi}`} className="btn btn-primary btn-small">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinhVienDanhSachDonVi;