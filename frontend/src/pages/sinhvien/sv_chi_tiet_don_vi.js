import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/sinhvien/sv_chitiet_donvi.css';

const SinhVienChiTietDonVi = () => {
  const { maDonVi } = useParams();
  const [donVi, setDonVi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const fetchDonViDetail = async () => {
    try {
      const response = await donViService.getById(maDonVi);
      setDonVi(response.data);
    } catch (err) {
      setError('Không thể tải thông tin đơn vị');
    } finally {
      setLoading(false);
    }
  };

  fetchDonViDetail();
}, [maDonVi]); // chỉ thêm maDonVi

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!donVi) return <div className="error-message">Đơn vị không tồn tại</div>;

  return (
    <div className="chi_tiet_container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Quay lại
      </button>

      <div className="chi_tiet_content">
        <div className="chi_tiet_header">
          <img
            src={donVi.hinh_anh || 'https://via.placeholder.com/600x400?text=' + donVi.ten_don_vi}
            alt={donVi.ten_don_vi}
            className="chi_tiet_image"
          />
        </div>

        <div className="chi_tiet_body">

          <div className="chi_tiet_section">
            <h3>Thông tin cơ bản</h3>
            <div className="info_row">
              <span className="label">Tên đơn vị:</span>
              <span className="value">{donVi.ten_don_vi}</span>
            </div>
            <div className="info_row">
              <span className="label">Địa chỉ:</span>
              <span className="value">{donVi.dia_chi}</span>
            </div>
            <div className="info_row">
              <span className="label">Số điện thoại:</span>
              <span className="value">{donVi.so_dien_thoai}</span>
            </div>
            <div className="info_row">
              <span className="label">Email:</span>
              <span className="value">{donVi.email_don_vi}</span>
            </div>
          </div>

          {donVi.gioi_thieu && (
            <div className="chi_tiet_section">
              <h3>Giới thiệu về đơn vị</h3>
              <p>{donVi.gioi_thieu}</p>
            </div>
          )}

          {donVi.dieu_kien_thuc_tap && (
            <div className="chi_tiet_section">
              <h3>Điều kiện thực tập</h3>
              <p>{donVi.dieu_kien_thuc_tap}</p>
            </div>
          )}

          {donVi.can_bo_huong_dan && donVi.can_bo_huong_dan.length > 0 && (
            <div className="chi_tiet_section">
              <h3>Cán bộ hướng dẫn</h3>
              <div className="can_bo_list">
                {donVi.can_bo_huong_dan.map((cb) => (
                  <div key={cb.ma_can_bo} className="can_bo_item">
                    <h4>{cb.ho_ten}</h4>
                    <p><strong>Chức vụ:</strong> {cb.chuc_vu}</p>
                    <p><strong>Chuyên môn:</strong> {cb.chuyen_mon}</p>
                    <p><strong>Email:</strong> {cb.email_can_bo}</p>
                    <p><strong>Số điện thoại:</strong> {cb.so_dien_thoai}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinhVienChiTietDonVi;
