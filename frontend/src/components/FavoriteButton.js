import React, { useState, useEffect } from 'react';
import { yeuThichService } from '../services/api';
import { useToast } from '../contexts/useToast';
import '../styles/FavoriteButton.css';

/**
 * FavoriteButton Component
 * Hiển thị nút like/unlike với icon tim
 * 
 * Props:
 *  - maDonVi (string): Mã đơn vị
 *  - initialState (boolean): Trạng thái ban đầu (optional)
 *  - onToggle (function): Callback khi click toggle (optional)
 *  - size (string): 'sm', 'md', 'lg' (default: 'md')
 *  - showLabel (boolean): Hiển thị text (default: true)
 */
const FavoriteButton = ({
  maDonVi,
  initialState = false,
  onToggle,
  size = 'md',
  showLabel = true,
}) => {
  const [isFavorited, setIsFavorited] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  // Nếu initialState thay đổi, cập nhật lại isFavorited
  useEffect(() => {
    setIsFavorited(initialState);
  }, [initialState]);

  const handleToggleFavorite = async () => {
    if (!maDonVi || loading) return;

    try {
      setLoading(true);
      const response = await yeuThichService.toggleFavorite(maDonVi);
      
      setIsFavorited(response.data.isFavorited);
      showSuccess(response.data.message);
      
      // Gọi callback nếu có
      if (onToggle) {
        onToggle(response.data.isFavorited);
      }
    } catch (error) {
      console.error('Lỗi toggle favorite:', error);
      showError(error.response?.data?.message || 'Không thể cập nhật yêu thích');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`favorite-btn favorite-btn--${size} ${isFavorited ? 'favorite-btn--active' : ''}`}
      onClick={handleToggleFavorite}
      disabled={loading}
      title={isFavorited ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      aria-label={isFavorited ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
    >
      <span className="favorite-btn__icon"></span>
      {showLabel && (
        <span className="favorite-btn__label">
          {isFavorited ? 'Bỏ yêu thích' : 'Yêu thích'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
