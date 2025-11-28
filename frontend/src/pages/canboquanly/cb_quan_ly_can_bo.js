import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import '../../styles/danhsach/danh_sach_can_bo.css';

const CanBoQuanLyCanBoHuongDan = () => {
  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    ho_ten: '',
    email_can_bo: '',
    chuyen_mon: '',
    ma_don_vi: '',
  });
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    fetchCanBo();
  }, []);

  const fetchCanBo = async (filters = null) => {
    try {
      setLoading(true);
      let response;
      
      if (filters && Object.values(filters).some(v => v)) {
        response = await canBoHuongDanService.search(filters);
      } else {
        response = await canBoHuongDanService.getAll();
      }
      
      setCanBo(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách cán bộ');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = () => {
    fetchCanBo(searchFilters);
  };

  const handleReset = () => {
    setSearchFilters({
      ho_ten: '',
      email_can_bo: '',
      chuyen_mon: '',
      ma_don_vi: '',
    });
    fetchCanBo();
  };

  const handleDelete = async (maCanBo) => {
    if (window.confirm('Bạn chắc chắn muốn xóa cán bộ này?')) {
      try {
        await canBoHuongDanService.delete(maCanBo);
        setCanBo(canBo.filter(cb => cb.ma_can_bo !== maCanBo));
      } catch (err) {
        setError('Xóa cán bộ thất bại');
      }
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const isCanBo = user && user.role === 'can_bo_quan_ly';

  return (
    <div className="danh_sach_container">
      <h1>Danh sách Cán bộ hướng dẫn</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Bộ lọc nâng cao */}
      <div className="filter_section">
        <h3>Tìm kiếm và lọc</h3>
        <div className="filter_grid">
          <div className="filter_item">
            <label>Họ tên:</label>
            <input
              type="text"
              name="ho_ten"
              value={searchFilters.ho_ten}
              onChange={handleSearchChange}
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="filter_item">
            <label>Email:</label>
            <input
              type="email"
              name="email_can_bo"
              value={searchFilters.email_can_bo}
              onChange={handleSearchChange}
              placeholder="Nhập email"
            />
          </div>
          <div className="filter_item">
            <label>Chuyên môn:</label>
            <input
              type="text"
              name="chuyen_mon"
              value={searchFilters.chuyen_mon}
              onChange={handleSearchChange}
              placeholder="Nhập chuyên môn"
            />
          </div>
          <div className="filter_item">
            <label>Mã đơn vị:</label>
            <input
              type="text"
              name="ma_don_vi"
              value={searchFilters.ma_don_vi}
              onChange={handleSearchChange}
              placeholder="Nhập mã đơn vị"
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

      {/* Nút thêm */}
      <div className="action_bar">
        {isCanBo && (
          <Link to="/them-can-bo-huong-dan" className="btn btn-primary">
            + Thêm cán bộ
          </Link>
        )}
      </div>

      {/* Hiển thị danh sách */}
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
                <th>Số điện thoai</th>
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
                  <td className="action_cell">
                    <Link to={`/can-bo/chi-tiet-can-bo/${cb.ma_can_bo}`} className="btn-link">
                      Chi tiết
                    </Link>
                    {isCanBo && (
                      <button
                        onClick={() => handleDelete(cb.ma_can_bo)}
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

export default CanBoQuanLyCanBoHuongDan;
