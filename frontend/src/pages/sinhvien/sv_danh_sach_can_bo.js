import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/sinhvien/sv_danh_sach_can_bo.css';

const SinhVienDanhSachCanBo = () => {
  const { showError } = useToast();
  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCanBo = useCallback(async (query = '') => {
    try {
      setLoading(true);
      const response = query
        ? await canBoHuongDanService.search({ query })
        : await canBoHuongDanService.getAll();

      setCanBo(response.data);
    } catch (err) {
      showError('Không thể tải danh sách cán bộ');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchCanBo();
  }, [fetchCanBo]);

  const handleSearch = () => fetchCanBo(searchQuery);

  const handleReset = () => {
    setSearchQuery('');
    fetchCanBo();
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="sv__quan_ly_can_bo">

      {/* ===== FILTER ===== */}
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
            placeholder="Nhập họ tên, email, chuyên môn..."
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      {/* ===== CARD LIST ===== */}
      {canBo.length === 0 ? (
        <div className="sv__empty-message">Không có cán bộ nào</div>
      ) : (
        <div className="sv__card_grid">
          {canBo.map((cb) => (
            <div className="sv__card" key={cb.ma_can_bo}>
              <div className="sv__card_avatar">
                <img src={cb.avatar || '/images/teacher-icon.png'} alt="avatar" />
              </div>

              <h3 className="sv__card_name">{cb.ho_ten}</h3>

              <p><strong>Giới tính:</strong> {cb.gioi_tinh}</p>
              <p><strong>Điện thoại:</strong> {cb.so_dien_thoai}</p>
              <p><strong>Email:</strong> {cb.email_can_bo}</p>

              <Link
                to={`/sinh-vien/chi-tiet-can-bo/${cb.ma_can_bo}`}
                className="sv__card_btn"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinhVienDanhSachCanBo;