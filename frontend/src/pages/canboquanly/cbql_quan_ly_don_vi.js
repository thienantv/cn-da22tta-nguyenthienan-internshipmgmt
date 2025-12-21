import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_quan_ly_don_vi.css';

const CanBoQuanLyDonVi = () => {
  const { showError } = useToast();
  const [donVi, setDonVi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

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
    } catch (err) {
      showError('Không thể tải danh sách đơn vị');
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

  const handleDelete = async (maDonVi) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn vị này?')) {
      try {
        await donViService.delete(maDonVi);
        setDonVi(donVi.filter((dv) => dv.ma_don_vi !== maDonVi));
      } catch (err) {
        showError('Xóa đơn vị thất bại');
      }
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const isCanBo = user && user.role === 'can_bo_quan_ly';

  return (
    <div className="cbql__quan_ly_don_vi">

      {/* Bộ lọc */}
      <div className="cbql__quan_ly_don_vi--filter_section">
        <div className="cbql__quan_ly_don_vi--filter_row">
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

      {/* Nút thêm + chuyển chế độ */}
      <div className="cbql__quan_ly_don_vi--action_bar" align="center">
        {isCanBo && (
          <Link to="/them-don-vi" className="btn btn-primary cbql__quan_ly_don_vi--them_donvi_btn">
            + Thêm đơn vị
          </Link>
        )}

        <div className="cbql__quan_ly_don_vi--view_toggle">
          <button
            className={`cbql__quan_ly_don_vi--view_btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Card
          </button>
          <button
            className={`cbql__quan_ly_don_vi--view_btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Bảng
          </button>
        </div>
      </div>

      {/* HIỂN THỊ DANH SÁCH */}
      {donVi.length === 0 ? (
        <div className="empty-message">Không có đơn vị nào</div>
      ) : viewMode === 'card' ? (
        <div className="cbql__quan_ly_don_vi--don_vi_cards">
          {donVi.map((dv) => (
            <div key={dv.ma_don_vi} className="cbql__quan_ly_don_vi--don_vi_card">
              <div className="cbql__quan_ly_don_vi--card_image">
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

              <div className="cbql__quan_ly_don_vi--card_content">
                <h3>{dv.ten_don_vi}</h3>
                <p className="cbql__quan_ly_don_vi--card_address">{dv.dia_chi}</p>
                <p className="cbql__quan_ly_don_vi--card_description">{dv.gioi_thieu?.substring(0, 100)}...</p>

                <div className="cbql__quan_ly_don_vi--card_buttons">
                  <Link to={`/can-bo/chi-tiet-don-vi/${dv.ma_don_vi}`} className="cbql__quan_ly_don_vi--btn_modern">
                    Chi tiết
                  </Link>

                  {isCanBo && (
                    <>
                      <Link to={`/can-bo/sua-don-vi/${dv.ma_don_vi}`} className="btn-modern warning">
                        Sửa
                      </Link>
                      <button className="btn-modern danger" onClick={() => handleDelete(dv.ma_don_vi)}>
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cbql__quan_ly_don_vi--don_vi_table_wrapper">
          <table className="cbql__quan_ly_don_vi--don_vi_table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên đơn vị</th>
                <th>Địa chỉ</th>
                {/* <th>Điện thoại</th> */}
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
                  {/* <td>{dv.so_dien_thoai}</td> */}
                  <td>{dv.email_don_vi}</td>

                  <td className="cbql__quan_ly_don_vi--action_cell">
                    <Link to={`/can-bo/chi-tiet-don-vi/${dv.ma_don_vi}`} className="cbql__quan_ly_don_vi--btn_link">
                      Chi tiết
                    </Link>

                    {isCanBo && (
                      <>
                        <Link to={`/can-bo/sua-don-vi/${dv.ma_don_vi}`} className="cbql__quan_ly_don_vi--btn_link btn-warning">
                          Sửa
                        </Link>
                        <button onClick={() => handleDelete(dv.ma_don_vi)} className="cbql__quan_ly_don_vi--btn_link btn-danger">
                          Xóa
                        </button>
                      </>
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