import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/sinhvien/sv_danhsach_donvi.css';

const SinhVienDanhSachDonVi = () => {
  const [donVi, setDonVi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    ten_don_vi: '',
    dia_chi: '',
  });
  const [viewMode, setViewMode] = useState('card'); // card or table
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    fetchDonVi();
  }, []);

  const fetchDonVi = async (filters = null) => {
    try {
      setLoading(true);
      let response;

      if (filters && Object.values(filters).some(v => v)) {
        response = await donViService.search(filters);
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

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = () => {
    fetchDonVi(searchFilters);
  };

  const handleReset = () => {
    setSearchFilters({
      ten_don_vi: '',
      dia_chi: '',
    });
    fetchDonVi();
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const isCanBo = user && user.role === 'can_bo_quan_ly';
  const isSinhVien = user && user.role === 'sinh_vien';

  return (
    <div className="danh_sach_container">
      <h1>Danh sách Đơn vị thực tập</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Bộ lọc */}
      <div className="filter_section">
        <h3>Tìm kiếm và lọc</h3>
        <div className="filter_grid">
          <div className="filter_item">
            <label>Tên đơn vị:</label>
            <input
              type="text"
              name="ten_don_vi"
              value={searchFilters.ten_don_vi}
              onChange={handleSearchChange}
              placeholder="Nhập tên đơn vị"
            />
          </div>
          <div className="filter_item">
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="dia_chi"
              value={searchFilters.dia_chi}
              onChange={handleSearchChange}
              placeholder="Nhập địa chỉ"
            />
          </div>
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

      {/* Nút thêm và chuyển view */}
      <div className="action_bar" align="center">
        {isCanBo && (
          <Link to="/them-don-vi" className="btn btn-primary">
            + Thêm đơn vị
          </Link>
        )}

        {isSinhVien && (
          <div className="view_toggle">
            <button
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              Card
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Bảng
            </button>
          </div>
        )}
      </div>

      {/* Hiển thị danh sách */}
      {donVi.length === 0 ? (
        <div className="empty-message">Không có đơn vị nào</div>
      ) : isSinhVien && viewMode === 'card' ? (
        <div className="don_vi_cards">
  {donVi.map((dv) => (
    <div key={dv.ma_don_vi} className="don_vi_card">
      <div className="card_image">
        <img
          // Nếu có hinh_anh thì hiển thị, nếu rỗng thì dùng placeholder
          src={
            dv.hinh_anh
              ? dv.hinh_anh.startsWith('data:') // Nếu base64 đã có data:image
                ? dv.hinh_anh
                : dv.hinh_anh // URL
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

      ) : (
        <div className="don_vi_table_wrapper">
          <table className="don_vi_table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên đơn vị</th>
                <th>Địa chỉ</th>
                <th>Điện thoại</th>
                <th>Email</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {donVi.map((dv) => (
                <tr key={dv.ma_don_vi}>
                  <td>{dv.ma_don_vi}</td>
                  <td>{dv.ten_don_vi}</td>
                  <td>{dv.dia_chi}</td>
                  <td>{dv.so_dien_thoai}</td>
                  <td>{dv.email_don_vi}</td>
                  <td className="action_cell">
                    <Link to={`/sinh-vien/chi-tiet-don-vi/${dv.ma_don_vi}`} className="btn-link">
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

export default SinhVienDanhSachDonVi;