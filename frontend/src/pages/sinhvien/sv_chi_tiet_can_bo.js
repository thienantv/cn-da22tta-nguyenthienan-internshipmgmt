import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/sinhvien/sv_chi_tiet_can_bo.css';

const SinhVienChiTietCanBo = () => {
  const { ma_can_bo } = useParams();
  const [canBo, setCanBo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanBoDetail = async () => {
      try {
        if (!ma_can_bo) {
          showError('Không có mã cán bộ');
          setLoading(false);
          return;
        }
        const response = await canBoHuongDanService.getById(ma_can_bo);
        setCanBo(response.data);
      } catch (err) {
        showError('Không thể tải thông tin cán bộ');
      } finally {
        setLoading(false);
      }
    };

    fetchCanBoDetail();
  }, [ma_can_bo]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!canBo) return <div>Cán bộ không tồn tại</div>;

  return (
    <div className="sv__chi_tiet_can_bo">

      {/* Nút quay lại */}
      <div className="sv__chi_tiet_can_bo--top">
        <button onClick={() => navigate(-1)} className="back_btn">
          ← Quay lại
        </button>
      </div>

      <div className="sv__chi_tiet_can_bo--content">
        <div className="sv__chi_tiet_can_bo--body">

          {/* Avatar */}
          <div className="sv__chi_tiet_can_bo--avatar_section">
            <div className="sv__chi_tiet_can_bo--avatar_wrapper">
              <img
                src={canBo.avatar || '/images/teacher-icon.png'}
                alt="Avatar"
                className="sv__chi_tiet_can_bo--avatar"
              />
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="sv__chi_tiet_can_bo--section">
            <h3>Thông tin cơ bản</h3>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Tên cán bộ:</span>
              <span className="value">{canBo.ho_ten}</span>
            </div>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Giới tính:</span>
              <span className="value">{canBo.gioi_tinh}</span>
            </div>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Số điện thoại:</span>
              <span className="value">{canBo.so_dien_thoai}</span>
            </div>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Email:</span>
              <span className="value">{canBo.email_can_bo}</span>
            </div>
          </div>

          {/* Thông tin công việc */}
          <div className="sv__chi_tiet_can_bo--section">
            <h3>Thông tin công việc</h3>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Chức vụ:</span>
              <span className="value">{canBo.chuc_vu}</span>
            </div>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Chuyên môn:</span>
              <span className="value">{canBo.chuyen_mon}</span>
            </div>
            <div className="sv__chi_tiet_can_bo--info_row">
              <span className="label">Số tài khoản:</span>
              <span className="value">{canBo.so_tk_ngan_hang || 'N/A'}</span>
            </div>
          </div>

          {/* Đơn vị công tác */}
          {canBo.ten_don_vi && (
            <div className="sv__chi_tiet_can_bo--section">
              <h3>Đơn vị công tác</h3>
              <div className="sv__chi_tiet_can_bo--info_row">
                <span className="label">Tên đơn vị:</span>
                <span className="value">{canBo.ten_don_vi}</span>
              </div>
              {canBo.dia_chi && (
                <div className="sv__chi_tiet_can_bo--info_row">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{canBo.dia_chi}</span>
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