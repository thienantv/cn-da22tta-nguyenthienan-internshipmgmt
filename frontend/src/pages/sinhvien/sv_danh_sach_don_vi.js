import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/sinhvien/sv_danh_sach_don_vi.css';

const SinhVienQuanLyDonVi = () => {
  const { showError } = useToast();
  const [donVi, setDonVi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDonVi = useCallback(async (query = '') => {
    try {
      setLoading(true);
      const response = query
        ? await donViService.search({ query })
        : await donViService.getAll();

      setDonVi(response.data);
    } catch (err) {
      showError('Không thể tải danh sách đơn vị');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchDonVi();
  }, [fetchDonVi]);

  const handleSearch = () => fetchDonVi(searchQuery);

  const handleReset = () => {
    setSearchQuery('');
    fetchDonVi();
  };

  if (loading) return <div className="sv__loading">Đang tải...</div>;

  return (
    <div className="sv__danh_sach_don_vi">

      {/* FILTER */}
      <div className="sv__filter_section">
        <div className="sv__filter_row">
          <label>Tìm kiếm:</label>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Tìm theo tên đơn vị, địa chỉ, email..."
          />

          <button className="btn btn-primary" onClick={handleSearch}>
            Tìm kiếm
          </button>

          <button className="btn btn-secondary" onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      {/* CARD LIST */}
      {donVi.length === 0 ? (
        <div className="sv__empty-message">Không có đơn vị nào</div>
      ) : (
        <div className="sv__don_vi_cards">
          {donVi.map((dv) => (
            <div key={dv.ma_don_vi} className="sv__don_vi_card">

              {/* IMAGE */}
              <div className="sv__card_image">
                <img
                  src={dv.hinh_anh || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={dv.ten_don_vi}
                />
              </div>

              {/* CONTENT */}
              <div className="sv__card_content">
                <h3>{dv.ten_don_vi}</h3>
                <p className="sv__card_address">{dv.dia_chi}</p>
                <p className="sv__card_description">
                  {dv.gioi_thieu?.substring(0, 100) || 'Chưa có mô tả'}...
                </p>

                <div className="sv__card_buttons">
                  <Link
                    to={`/sinh-vien/chi-tiet-don-vi/${dv.ma_don_vi}`}
                    className="sv__btn_modern"
                  >
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