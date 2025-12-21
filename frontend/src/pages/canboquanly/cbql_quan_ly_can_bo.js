import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_quan_ly_can_bo.css';

const CanBoQuanLyCanBoHuongDan = () => {
  const { showError } = useToast();
  const location = useLocation();

  const [canBo, setCanBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // table | card

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const isCanBo = user && user.role === 'can_bo_quan_ly';

  const fetchCanBo = async (query = '') => {
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
  };

  useEffect(() => {
    fetchCanBo();

    // Nếu có state từ navigate (sau khi sửa)
    if (location.state?.updatedCanBo) {
      setCanBo((prev) =>
        prev.map((cb) =>
          cb.ma_can_bo === location.state.updatedCanBo.ma_can_bo
            ? location.state.updatedCanBo
            : cb
        )
      );
    }
  }, [location.state]);

  const handleSearch = () => fetchCanBo(searchQuery);
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
        showError('Xóa cán bộ thất bại');
      }
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="cbql__quan_ly_can_bo">

      <div className="cbql__quan_ly_can_bo--filter_section">
        <div className="cbql__quan_ly_can_bo--filter_row">
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
          <button className="btn btn-primary" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      <div className="cbql__quan_ly_can_bo--action_bar">
        {isCanBo && (
          <Link
            to="/them-can-bo-huong-dan"
            className="btn btn-primary cbql__quan_ly_can_bo--add_btn"
          >
            + Thêm cán bộ
          </Link>
        )}

        <div className="cbql__quan_ly_can_bo--view_toggle">
          <button
            className={`cbql__quan_ly_can_bo--view_btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Card
          </button>
          <button
            className={`cbql__quan_ly_can_bo--view_btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Bảng
          </button>
        </div>
      </div>

      {canBo.length === 0 ? (
        <div className="empty-message">Không có cán bộ nào</div>
      ) : viewMode === 'table' ? (
        <div className="cbql__quan_ly_can_bo--table_wrapper">
          <table className="cbql__quan_ly_can_bo--table">
            <thead>
              <tr>
                {/* <th>Avatar</th> */}
                <th>Mã cán bộ</th>
                <th>Họ tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {canBo.map((cb) => (
                <tr key={cb.ma_can_bo}>
                  {/* <td>
                    <img
                      src={cb.avatar || '/images/teacher-icon.png'}
                      alt="avatar"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </td> */}
                  <td>{cb.ma_can_bo}</td>
                  <td>{cb.ho_ten}</td>
                  <td>{cb.gioi_tinh}</td>
                  <td>{cb.so_dien_thoai}</td>
                  <td>{cb.email_can_bo}</td>
                  <td className="cbql__quan_ly_can_bo--action_cell">
                    <Link
                      to={`/can-bo/chi-tiet-can-bo/${cb.ma_can_bo}`}
                      className="cbql__quan_ly_can_bo--action_btn detail"
                    >
                      Chi tiết
                    </Link>
                    {isCanBo && (
                      <Link
                        to={`/can-bo/sua-can-bo/${cb.ma_can_bo}`}
                        className="cbql__quan_ly_can_bo--action_btn edit"
                      >
                        Sửa
                      </Link>
                    )}
                    {isCanBo && (
                      <button
                        onClick={() => handleDelete(cb.ma_can_bo)}
                        className="cbql__quan_ly_can_bo--action_btn delete"
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
      ) : (
        <div className="cbql__card_grid">
          {canBo.map((cb) => (
            <div className="cbql__card" key={cb.ma_can_bo}>
              <div className="cbql__card_avatar">
                <img
                  src={cb.avatar || '/images/teacher-icon.png'}
                  alt="avatar"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              </div>

              <h3 className="cbql__card_name">{cb.ho_ten}</h3>
              <p><strong>Mã CB:</strong> {cb.ma_can_bo}</p>
              <p><strong>Giới tính:</strong> {cb.gioi_tinh}</p>
              <p><strong>Điện thoại:</strong> {cb.so_dien_thoai}</p>
              <p><strong>Email:</strong> {cb.email_can_bo}</p>

              <div className="cbql__card_actions">
                <Link
                  to={`/can-bo/chi-tiet-can-bo/${cb.ma_can_bo}`}
                  className="cbql__card_btn detail"
                >
                  Chi tiết
                </Link>
                {isCanBo && (
                  <Link
                    to={`/can-bo/sua-can-bo/${cb.ma_can_bo}`}
                    className="cbql__card_btn edit"
                  >
                    Sửa
                  </Link>
                )}
                {isCanBo && (
                  <button
                    onClick={() => handleDelete(cb.ma_can_bo)}
                    className="cbql__card_btn delete"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CanBoQuanLyCanBoHuongDan;