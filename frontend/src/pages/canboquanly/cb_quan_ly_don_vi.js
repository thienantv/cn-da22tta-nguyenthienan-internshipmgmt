import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/canboquanly/cb_quanly_donvi.css';

const CanBoQuanLyDonVi = () => {
  const [donVi, setDonVi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // Chỉ dùng 1 trường tìm kiếm
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    fetchDonVi();
  }, []);

  const fetchDonVi = async (query = '') => {
    try {
      setLoading(true);
      let response;

      if (query) {
        response = await donViService.search({ query });  // Truyền query tìm kiếm chung
      } else {
        response = await donViService.getAll(); // Lấy tất cả đơn vị nếu không có tìm kiếm
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
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchDonVi(searchQuery);  // Truyền giá trị tìm kiếm khi người dùng click tìm kiếm
  };

  const handleReset = () => {
    setSearchQuery(''); // Reset lại ô tìm kiếm
    fetchDonVi();  // Lấy lại tất cả đơn vị khi reset
  };

  const handleDelete = async (maDonVi) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn vị này?')) {
      try {
        await donViService.delete(maDonVi);  // Gọi API để xóa đơn vị
        setDonVi(donVi.filter(dv => dv.ma_don_vi !== maDonVi));  // Cập nhật lại danh sách sau khi xóa
      } catch (err) {
        setError('Xóa đơn vị thất bại');
      }
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const isCanBo = user && user.role === 'can_bo_quan_ly';

  return (
    <div className="danh_sach_container">
      <h1>Danh sách Đơn vị thực tập</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Bộ lọc */}
      <div className="filter_section">
        <div className="filter_grid">
          <div className="filter_item">
            <label>Tìm kiếm:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Ngăn form submit nếu có
                  handleSearch();     // Gọi hàm tìm kiếm
                }
              }}
              placeholder="Tìm kiếm theo tên đơn vị, địa chỉ, số điện thoại, email"
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

      {/* Nút thêm */}
      {isCanBo && (
        <div className="action_bar" align="center">
          <Link to="/them-don-vi" className="btn btn-primary">
            + Thêm đơn vị
          </Link>
        </div>
      )}

      {/* Hiển thị danh sách */}
      {donVi.length === 0 ? (
        <div className="empty-message">Không có đơn vị nào</div>
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
                    {/* Nút Chi tiết */}
                    <Link to={`/can-bo/chi-tiet-don-vi/${dv.ma_don_vi}`} className="btn-link">
                      Chi tiết
                    </Link>

                    {/* Nút sửa */}
                    {isCanBo && (
                      <Link to={`/can-bo/sua-don-vi/${dv.ma_don_vi}`} className="btn-link btn-warning">
                        Sửa
                      </Link>
                    )}

                    {/* Nút xóa */}
                    {isCanBo && (
                      <button
                        onClick={() => handleDelete(dv.ma_don_vi)}
                        className="btn-link btn-danger"
                      >
                        Xóa
                      </button>
                    )}
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

export default CanBoQuanLyDonVi;