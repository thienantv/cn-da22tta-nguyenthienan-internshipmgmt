import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import '../../styles/sinhvien/sv_danh_sach_can_bo.css';

const SinhVienDanhSachCanBo = () => {
  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCanBo();
  }, []);

  const fetchCanBo = async (query = '') => {
    try {
      setLoading(true);
      let response;

      // 🔥 Nếu có từ khóa → gọi API search
      if (query.trim() !== '') {
        response = await canBoHuongDanService.search({ query });
      } else {
        response = await canBoHuongDanService.getAll();
      }

      setCanBo(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách cán bộ');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchCanBo(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    fetchCanBo('');
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="sv__danh_sach_can_bo">
      
      {error && <div className="error-message">{error}</div>}

      {/* Bộ lọc tìm kiếm */}
      <div className="sv__danh_sach_can_bo--filter_section">
        <div className="sv__danh_sach_can_bo--filter_grid">
          <div className="sv__danh_sach_can_bo--filter_item">
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
              placeholder="Tìm theo họ tên, số điện thoại, email, chức vụ, chuyên môn, đơn vị..."
            />
          </div>

          <div className="sv__danh_sach_can_bo--filter_buttons">
            <button className="btn btn-primary" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      {canBo.length === 0 ? (
        <div className="empty-message">Không có cán bộ nào</div>
      ) : (
        <div className="don_vi_table_wrapper">
          <table className="don_vi_table">
            <thead>
              <tr>
                <th>Mã cán bộ</th>
                <th>Họ tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Chuyên môn</th>
                <th>Đơn vị</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {canBo.map((cb) => (
                <tr key={cb.ma_can_bo}>
                  <td>{cb.ma_can_bo}</td>
                  <td>{cb.ho_ten}</td>
                  <td>{cb.gioi_tinh}</td>
                  <td>{cb.so_dien_thoai}</td>
                  <td>{cb.email_can_bo}</td>
                  <td>{cb.chuc_vu}</td>
                  <td>{cb.chuyen_mon}</td>
                  <td>{cb.ten_don_vi}</td>
                  <td className="sv__danh_sach_can_bo--action_cell">
                    <Link to={`/sinh-vien/chi-tiet-can-bo/${cb.ma_can_bo}`} className="sv__danh_sach_can_bo--btn_link">
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SinhVienDanhSachCanBo;