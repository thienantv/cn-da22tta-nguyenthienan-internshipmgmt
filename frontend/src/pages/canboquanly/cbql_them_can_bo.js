import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { canBoHuongDanService, donViService } from '../../services/api';
import '../../styles/canboquanly/cbql_them_can_bo.css';

const CanBoThem = () => {
  const [canBo, setCanBo] = useState({
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email: '',
    so_tk_ngan_hang: '',
    chuc_vu: '',
    chuyen_mon: '',
    ma_don_vi: '',
  });

  const [donViList, setDonViList] = useState([]);
  const [searchDonVi, setSearchDonVi] = useState('');
  const [showList, setShowList] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Lấy danh sách đơn vị
  useEffect(() => {
    const fetchDonVi = async () => {
      try {
        const res = await donViService.getAll();
        setDonViList(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách đơn vị:", err);
      }
    };
    fetchDonVi();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCanBo({ ...canBo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const res = await canBoHuongDanService.create(canBo);
      setSuccess(`Thêm cán bộ thành công: ${res.data.ma_can_bo}`);
      
      setTimeout(() => navigate('/danh-sach-can-bo-huong-dan'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Thêm cán bộ thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cbql__them_can_bo">
      <h1>Thêm cán bộ hướng dẫn</h1>

      {error && <div className="cbql__them_can_bo--error-message">{error}</div>}
      {success && <div className="cbql__them_can_bo--success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="cbql__them_can_bo--form">

        {/* FORM GRID 2 CỘT */}
        <div className="cbql__them_can_bo--form_grid">

          <div>
            <label>Họ và tên:</label>
            <input type="text" name="ho_ten" value={canBo.ho_ten} onChange={handleChange} required />
          </div>

          <div>
            <label>Giới tính:</label>
            <select name="gioi_tinh" value={canBo.gioi_tinh} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label>Số điện thoại:</label>
            <input type="text" name="so_dien_thoai" value={canBo.so_dien_thoai} onChange={handleChange} />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" name="email" value={canBo.email} onChange={handleChange} />
          </div>

          <div>
            <label>Số tài khoản ngân hàng:</label>
            <input type="text" name="so_tk_ngan_hang" value={canBo.so_tk_ngan_hang} onChange={handleChange} />
          </div>

          <div>
            <label>Chức vụ:</label>
            <input type="text" name="chuc_vu" value={canBo.chuc_vu} onChange={handleChange} />
          </div>

          <div>
            <label>Chuyên môn:</label>
            <input type="text" name="chuyen_mon" value={canBo.chuyen_mon} onChange={handleChange} />
          </div>

          {/* Dropdown đơn vị hoạt động */}
          <div style={{ gridColumn: 'span 2' }}>
            <label>Đơn vị hoạt động:</label>

            <div className="cbql__them_can_bo--donvi_grid">
              <input
                type="text"
                placeholder="Tìm đơn vị..."
                value={searchDonVi}
                onChange={(e) => { setSearchDonVi(e.target.value); setShowList(true); }}
                onFocus={() => setShowList(true)}
                className="cbql__them_can_bo--input_search_donvi"
              />

              <select
                name="ma_don_vi"
                value={canBo.ma_don_vi}
                onChange={handleChange}
                className="cbql__them_can_bo--select_donvi"
              >
                <option value="">-- Chọn đơn vị --</option>
                {donViList.map(dv => (
                  <option key={dv.ma_don_vi} value={dv.ma_don_vi}>
                    {dv.ten_don_vi}
                  </option>
                ))}
              </select>

              {showList && searchDonVi.trim() !== '' && (
                <div className="cbql__them_can_bo--donvi_dropdown">
                  {donViList
                    .filter(dv =>
                      dv.ten_don_vi.toLowerCase().includes(searchDonVi.toLowerCase())
                    )
                    .map(dv => (
                      <div
                        key={dv.ma_don_vi}
                        className="cbql__them_can_bo--donvi_item"
                        onClick={() => {
                          setCanBo({ ...canBo, ma_don_vi: dv.ma_don_vi });
                          setSearchDonVi(dv.ten_don_vi);
                          setShowList(false);
                        }}
                      >
                        {dv.ten_don_vi}
                      </div>
                    ))}

                  {donViList.filter(dv =>
                    dv.ten_don_vi.toLowerCase().includes(searchDonVi.toLowerCase())
                  ).length === 0 && (
                    <div className="cbql__them_can_bo--donvi_noresult">
                      Không tìm thấy đơn vị
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="cbql__them_can_bo--form_actions">
          <button type="submit">
            {loading ? "Đang xử lý..." : "Thêm cán bộ"}
          </button>

          <button type="button" className="cbql__them_can_bo--cancel_btn" onClick={() => navigate(-1)}>
            Huỷ
          </button>
        </div>

      </form>
    </div>
  );
};

export default CanBoThem;