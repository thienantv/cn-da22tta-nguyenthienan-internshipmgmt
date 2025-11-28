import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import '../../styles/chitiet/chi_tiet_can_bo.css';

const SinhVienChiTietCanBo = () => {
  const { maCanBo } = useParams();
  const [canBo, setCanBo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const fetchCanBoDetail = async () => {
    try {
      const response = await canBoHuongDanService.getById(maCanBo);
      setCanBo(response.data);
    } catch (err) {
      setError('Không thể tải thông tin cán bộ');
    } finally {
      setLoading(false);
    }
  };

  fetchCanBoDetail();
}, [maCanBo]); // chỉ thêm maCanBo làm dependency


  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!canBo) return <div className="error-message">Cán bộ không tồn tại</div>;

  return (
    <div className="chi_tiet_container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Quay lại
      </button>

      <div className="chi_tiet_content">
        <div className="chi_tiet_body">
          <h1>{canBo.ho_ten}</h1>

          <div className="chi_tiet_section">
            <h3>Thông tin cơ bản</h3>
            <div className="info_row">
              <span className="label">Mã cán bộ:</span>
              <span className="value">{canBo.ma_can_bo}</span>
            </div>
            <div className="info_row">
              <span className="label">Giới tính:</span>
              <span className="value">{canBo.gioi_tinh}</span>
            </div>
            <div className="info_row">
              <span className="label">Số điện thoại:</span>
              <span className="value">{canBo.so_dien_thoai}</span>
            </div>
            <div className="info_row">
              <span className="label">Email:</span>
              <span className="value">{canBo.email_can_bo}</span>
            </div>
          </div>

          <div className="chi_tiet_section">
            <h3>Thông tin công việc</h3>
            <div className="info_row">
              <span className="label">Chức vụ:</span>
              <span className="value">{canBo.chuc_vu}</span>
            </div>
            <div className="info_row">
              <span className="label">Chuyên môn:</span>
              <span className="value">{canBo.chuyen_mon}</span>
            </div>
            <div className="info_row">
              <span className="label">Số tài khoản ngân hàng:</span>
              <span className="value">{canBo.so_tk_ngan_hang || 'N/A'}</span>
            </div>
          </div>

          {canBo.ten_don_vi && (
            <div className="chi_tiet_section">
              <h3>Đơn vị công tác</h3>
              <div className="info_row">
                <span className="label">Tên đơn vị:</span>
                <span className="value">{canBo.ten_don_vi}</span>
              </div>
              {canBo.dia_chi && (
                <div className="info_row">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{canBo.dia_chi}</span>
                </div>
              )}
              {canBo.so_dien_thoai_don_vi && (
                <div className="info_row">
                  <span className="label">Số điện thoại đơn vị:</span>
                  <span className="value">{canBo.so_dien_thoai_don_vi}</span>
                </div>
              )}
              {canBo.email_don_vi && (
                <div className="info_row">
                  <span className="label">Email đơn vị:</span>
                  <span className="value">{canBo.email_don_vi}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinhVienChiTietCanBo;
