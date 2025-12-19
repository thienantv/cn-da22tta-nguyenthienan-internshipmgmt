import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/sinhvien/sv_danh_sach_don_vi.css';

const SinhVienQuanLyDonVi = () => {
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

  if (loading) return <div className="sv__loading">Đang tải...</div>;

  return (
    <div className="sv__danh_sach_don_vi">
      {error && <div className="sv__error-message">{error}</div>}

      {/* Bộ lọc */}
      <div className="sv__filter_section">
        <div className="sv__filter_row">
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

          <button className="btn btn-primary" onClick={handleSearch}>
            Tìm kiếm
          </button>

          <button className="btn btn-secondary" onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      {/* CHỈ HIỂN THỊ CARD VIEW */}
      {donVi.length === 0 ? (
        <div className="sv__empty-message">Không có đơn vị nào</div>
      ) : (
        <div className="sv__don_vi_cards">
          {donVi.map((dv) => (
            <div key={dv.ma_don_vi} className="sv__don_vi_card">
              <div className="sv__card_image">
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

              <div className="sv__card_content">
                <h3>{dv.ten_don_vi}</h3>
                <p className="sv__card_address">{dv.dia_chi}</p>
                <p className="sv__card_description">{dv.gioi_thieu?.substring(0, 100)}...</p>

                <div className="sv__card_buttons" style={{ justifyContent: 'center' }}>
                  <Link to={`/sinh-vien/chi-tiet-don-vi/${dv.ma_don_vi}`} className="sv__btn_modern">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinhVienQuanLyDonVi;
