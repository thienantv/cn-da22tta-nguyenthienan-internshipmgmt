import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { canBoHuongDanService, donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_sua_can_bo.css';

const CanBoSua = () => {
  const { showError, showSuccess } = useToast();
  const { ma_can_bo } = useParams();
  const navigate = useNavigate();

  const [canBo, setCanBo] = useState({
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email_can_bo: '',
    so_tk_ngan_hang: '',
    chuc_vu: '',
    chuyen_mon: '',
    ma_don_vi: '',
    avatar: ''
  });

  const [donViList, setDonViList] = useState([]);
  const [searchDonVi, setSearchDonVi] = useState('');
  const [showList, setShowList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState(null);

  // Fetch đơn vị
  useEffect(() => {
    const fetchDonVi = async () => {
      try {
        const res = await donViService.getAll();
        setDonViList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonVi();
  }, []);

  // Fetch cán bộ
  useEffect(() => {
    const fetchCanBo = async () => {
      try {
        const res = await canBoHuongDanService.getById(ma_can_bo);
        setCanBo(res.data);
      } catch (err) {
        showError('Không thể tải thông tin cán bộ');
      } finally {
        setLoading(false);
      }
    };
    fetchCanBo();
  }, [ma_can_bo, showError]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCanBo({ ...canBo, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCanBo = {
        ...canBo,
        avatar: newAvatar || canBo.avatar
      };

      // Gọi API update
      const res = await canBoHuongDanService.update(ma_can_bo, updatedCanBo);

      showSuccess('Cập nhật cán bộ thành công');

      // Redirect về danh sách và truyền state updatedCanBo
      setTimeout(() => {
        navigate('/can-bo/chi-tiet-can-bo/' + ma_can_bo, { state: { updatedCanBo: res.data.data } });
      }, 1200);
    } catch (err) {
      showError(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="cbql__them_can_bo">
      <h1>Sửa cán bộ hướng dẫn</h1>

      <form onSubmit={handleSubmit} className="cbql__them_can_bo--form">
        <div className="cbql__them_can_bo--form_grid">

          {/* Avatar */}
          <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
            <label>Ảnh đại diện</label>
            <div className="cbql__them_can_bo--avatar_wrapper">
              <img
                src={newAvatar || canBo.avatar || '/images/teacher-icon.png'}
                alt="Avatar"
                className="cbql__them_can_bo--avatar_preview"
              />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>

          <div>
            <label>Họ và tên</label>
            <input type="text" name="ho_ten" value={canBo.ho_ten} onChange={handleChange} />
          </div>

          <div>
            <label>Giới tính</label>
            <select name="gioi_tinh" value={canBo.gioi_tinh} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label>Số điện thoại</label>
            <input type="text" name="so_dien_thoai" value={canBo.so_dien_thoai} onChange={handleChange} />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email_can_bo" value={canBo.email_can_bo} onChange={handleChange} />
          </div>

          <div>
            <label>Số tài khoản ngân hàng</label>
            <input type="text" name="so_tk_ngan_hang" value={canBo.so_tk_ngan_hang} onChange={handleChange} />
          </div>

          <div>
            <label>Chức vụ</label>
            <input type="text" name="chuc_vu" value={canBo.chuc_vu} onChange={handleChange} />
          </div>

          <div>
            <label>Chuyên môn</label>
            <input type="text" name="chuyen_mon" value={canBo.chuyen_mon} onChange={handleChange} />
          </div>

          {/* Đơn vị */}
          <div style={{ gridColumn: 'span 2' }}>
            <label>Đơn vị hoạt động</label>
            <div className="cbql__them_can_bo--donvi_grid">
              <input
                type="text"
                placeholder="Tìm đơn vị..."
                value={searchDonVi}
                onChange={(e) => {
                  setSearchDonVi(e.target.value);
                  setShowList(true);
                }}
              />
              <select name="ma_don_vi" value={canBo.ma_don_vi} onChange={handleChange}>
                <option value="">-- Chọn đơn vị --</option>
                {donViList.map((dv) => (
                  <option key={dv.ma_don_vi} value={dv.ma_don_vi}>
                    {dv.ten_don_vi}
                  </option>
                ))}
              </select>

              {showList && searchDonVi && (
                <div className="cbql__them_can_bo--donvi_dropdown">
                  {donViList
                    .filter((dv) =>
                      dv.ten_don_vi.toLowerCase().includes(searchDonVi.toLowerCase())
                    )
                    .map((dv) => (
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
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cbql__them_can_bo--form_actions">
          <button type="submit" className="btn btn-success">Cập nhật</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanBoSua;