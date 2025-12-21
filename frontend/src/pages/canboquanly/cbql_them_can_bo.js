import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { canBoHuongDanService, donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_them_can_bo.css';

const CanBoThem = () => {
  const { showError, showSuccess } = useToast();
  const [canBo, setCanBo] = useState({
    ho_ten: '',
    gioi_tinh: 'Khác',
    so_dien_thoai: '',
    email_can_bo: '',
    so_tk_ngan_hang: '',
    chuc_vu: '',
    chuyen_mon: '',
    ma_don_vi: '',
    avatar: '' // ✅ AVATAR
  });

  const [donViList, setDonViList] = useState([]);
  const [searchDonVi, setSearchDonVi] = useState('');
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ===== LẤY DANH SÁCH ĐƠN VỊ ===== */
  useEffect(() => {
    const fetchDonVi = async () => {
      try {
        const res = await donViService.getAll();
        setDonViList(res.data);
      } catch (err) {
        console.error('Lỗi lấy đơn vị:', err);
      }
    };
    fetchDonVi();
  }, []);

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCanBo({ ...canBo, [name]: value });
  };

  /* ===== HANDLE AVATAR ===== */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCanBo({ ...canBo, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  /* ===== VALIDATE FRONTEND ===== */
  const validate = () => {
    if (!canBo.ho_ten.trim()) {
      showError('Họ tên là bắt buộc');
      return false;
    }

    if (canBo.so_dien_thoai) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(canBo.so_dien_thoai)) {
        showError('Số điện thoại phải gồm đúng 10 chữ số (0-9)');
        return false;
      }
    }

    return true;
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 validate frontend
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await canBoHuongDanService.create(canBo);
      showSuccess(`Thêm cán bộ thành công: ${res.data.ma_can_bo}`);
      setTimeout(() => navigate('/quan-ly-can-bo-huong-dan'), 1200);
    } catch (err) {
      // 🔹 hiển thị lỗi backend rõ ràng
      const backendMessage = err.response?.data?.message;
      showError(backendMessage || 'Thêm cán bộ thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cbql__them_can_bo">
      <h1>Thêm cán bộ hướng dẫn</h1>

      <form onSubmit={handleSubmit} className="cbql__them_can_bo--form">
        <div className="cbql__them_can_bo--form_grid">

          {/* ===== AVATAR ===== */}
          <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
            <label>Ảnh đại diện</label>
            <div className="cbql__them_can_bo--avatar_wrapper">
              <img
                src={canBo.avatar || '/images/teacher-icon.png'}
                alt="Avatar"
                className="cbql__them_can_bo--avatar_preview"
              />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>

          <div>
            <label>Họ và tên</label>
            <input type="text" name="ho_ten" value={canBo.ho_ten} onChange={handleChange} required />
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

          {/* ===== ĐƠN VỊ ===== */}
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
                onFocus={() => setShowList(true)}
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
                    .filter((dv) => dv.ten_don_vi.toLowerCase().includes(searchDonVi.toLowerCase()))
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

        {/* ===== ACTIONS ===== */}
        <div className="cbql__them_can_bo--form_actions">
          <button type="submit">{loading ? 'Đang xử lý...' : 'Thêm cán bộ'}</button>
          <button type="button" className="cbql__them_can_bo--cancel_btn" onClick={() => navigate(-1)}>
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanBoThem;