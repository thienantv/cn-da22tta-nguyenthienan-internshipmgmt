import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yeuThichService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import FavoriteButton from '../../components/FavoriteButton';
import '../../styles/sinhvien/sv_yeu_thich_don_vi.css';

const SinhVienYeuThichDonVi = () => {
  const { showError, showSuccess } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const response = await yeuThichService.getFavoriteList();
      setFavorites(response.data);
    } catch (err) {
      console.error('Lỗi lấy danh sách yêu thích:', err);
      showError('Không thể tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = (maDonVi, isFavorited) => {
    if (!isFavorited) {
      // Xóa khỏi danh sách nếu bỏ yêu thích
      setFavorites(prev => prev.filter(dv => dv.ma_don_vi !== maDonVi));
      showSuccess('Đã bỏ yêu thích đơn vị');
    }
  };

  if (loading) return <div className="sv__loading">Đang tải...</div>;

  return (
    <div className="sv__yeu_thich_don_vi">
      {/* HEADER */}
      <div className="sv__yeu_thich_header">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Quay lại
        </button>
        <h1> Danh sách yêu thích ({favorites.length})</h1>
        {/* <Link to="/danh-sach-don-vi" className="btn btn-primary">
          Xem tất cả đơn vị
        </Link> */}
      </div>

      {/* CONTENT */}
      {favorites.length === 0 ? (
        <div className="sv__empty_state">
          <div className="sv__empty_icon">♡</div>
          <h2>Bạn chưa yêu thích đơn vị nào</h2>
          <p>Hãy khám phá các đơn vị thực tập và thêm vào danh sách yêu thích của bạn</p>
          <Link to="/danh-sach-don-vi" className="btn btn-primary sv__btn_inline">
            Xem danh sách đơn vị
          </Link>
        </div>
      ) : (
        <div className="sv__don_vi_cards">
          {favorites.map((dv) => (
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

                  <FavoriteButton
                    maDonVi={dv.ma_don_vi}
                    initialState={true}
                    onToggle={(isFavorited) => handleToggleFavorite(dv.ma_don_vi, isFavorited)}
                    size="md"
                    showLabel={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinhVienYeuThichDonVi;
