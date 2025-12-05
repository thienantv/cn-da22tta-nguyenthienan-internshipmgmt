import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import '../../styles/canboquanly/cb_quanly_canbo.css';

const CanBoQuanLyCanBoHuongDan = () => {
  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 🔥 chỉ 1 trường tìm kiếm

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  useEffect(() => {
    fetchCanBo();
  }, []);

  const fetchCanBo = async (query = '') => {
    try {
      setLoading(true);
      let response;

      // 🔥 Nếu có query → gọi API search
      if (query) {
        response = await canBoHuongDanService.search({ query });
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

  const handleSearch = () => {
    fetchCanBo(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    fetchCanBo();
  };

  const handleDelete = async (maCanBo) => {
    if (window.confirm('Bạn chắc chắn muốn xóa cán bộ này?')) {
      try {
        await canBoHuongDanService.delete(maCanBo);
        setCanBo(canBo.filter((cb) => cb.ma_can_bo !== maCanBo));
      } catch (err) {
        setError('Xóa cán bộ thất bại');
      }
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const isCanBo = user && user.role === 'can_bo_quan_ly';

  return (
    <div className="danh_sach_container">

      {error && <div className="error-message">{error}</div>}

      {/* 🔥 Bộ lọc mới – giống file DonVi */}
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
              placeholder="Nhập họ tên, email, chuyên môn hoặc mã đơn vị"
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
                  <td className="action_cell">
                    <Link
                      to={`/can-bo/chi-tiet-can-bo/${cb.ma_can_bo}`}
                      className="btn-link"
                    >
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