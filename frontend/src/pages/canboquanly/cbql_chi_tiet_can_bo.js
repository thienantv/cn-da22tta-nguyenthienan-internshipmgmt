import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_chi_tiet_can_bo.css';

const CanBoChiTietCanBo = () => {
  const { ma_can_bo } = useParams();
  const [canBo, setCanBo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanBoDetail = async () => {
      try {
        if (!ma_can_bo) {
          showError('Không có mã cán bộ');
          setLoading(false);
          return;
        }
        console.log('Fetching can bo detail with ID:', ma_can_bo);
        const response = await canBoHuongDanService.getById(ma_can_bo);
        setCanBo(response.data);
      } catch (err) {
        console.error('Error fetching can bo detail:', err);
        showError('Không thể tải thông tin cán bộ');
      } finally {
        setLoading(false);
      }
    };
    fetchCanBoDetail();
  }, [ma_can_bo]);

  const handleDelete = async () => {
    if (!window.confirm("Bạn chắc chắn muốn xoá cán bộ này?")) return;
    try {
      await canBoHuongDanService.delete(ma_can_bo);
      showSuccess("Xoá cán bộ thành công!");
      navigate("/quan-ly-can-bo-huong-dan");
    } catch (err) {
      showError("Xoá thất bại!");
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!canBo) return <div>Cán bộ không tồn tại</div>;

  return (
    <div className="cbql__chi_tiet_can_bo">
      <button onClick={() => navigate(-1)} className="back_btn">
        ← Quay lại
      </button>

      <div className="cbql__chi_tiet_can_bo--content">

        {/* Avatar */}
        <div className="cbql__chi_tiet_can_bo--avatar_section" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={canBo.avatar || '/images/teacher-icon.png'}
            alt="Avatar"
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ddd' }}
          />
        </div>

        {/* Thông tin cơ bản */}
        <div className="cbql__chi_tiet_can_bo--section">
          <h3>Thông tin cơ bản</h3>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Mã cán bộ:</span>
            <span className="value">{canBo.ma_can_bo}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Tên cán bộ:</span>
            <span className="value">{canBo.ho_ten}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Giới tính:</span>
            <span className="value">{canBo.gioi_tinh}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Số điện thoại:</span>
            <span className="value">{canBo.so_dien_thoai}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Email:</span>
            <span className="value">{canBo.email_can_bo}</span>
          </div>
        </div>

        {/* Thông tin công việc */}
        <div className="cbql__chi_tiet_can_bo--section">
          <h3>Thông tin công việc</h3>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Chức vụ:</span>
            <span className="value">{canBo.chuc_vu}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Chuyên môn:</span>
            <span className="value">{canBo.chuyen_mon}</span>
          </div>
          <div className="cbql__chi_tiet_can_bo--info_row">
            <span className="label">Số tài khoản ngân hàng:</span>
            <span className="value">{canBo.so_tk_ngan_hang || 'N/A'}</span>
          </div>
        </div>

        {/* Đơn vị công tác */}
        {canBo.ten_don_vi && (
          <div className="cbql__chi_tiet_can_bo--section">
            <h3>Đơn vị công tác</h3>
            <div className="cbql__chi_tiet_can_bo--info_row">
              <span className="label">Tên đơn vị:</span>
              <span className="value">{canBo.ten_don_vi}</span>
            </div>
            {canBo.dia_chi && (
              <div className="cbql__chi_tiet_can_bo--info_row">
                <span className="label">Địa chỉ:</span>
                <span className="value">{canBo.dia_chi}</span>
              </div>
            )}
            {canBo.so_dien_thoai_don_vi && (
              <div className="cbql__chi_tiet_can_bo--info_row">
                <span className="label">Số điện thoại:</span>
                <span className="value">{canBo.so_dien_thoai_don_vi}</span>
              </div>
            )}
            {canBo.email_don_vi && (
              <div className="cbql__chi_tiet_can_bo--info_row">
                <span className="label">Email:</span>
                <span className="value">{canBo.email_don_vi}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="cbql__chi_tiet_can_bo--footer">
          {/* eslint-disable-next-line no-undef */}
          <Link to={`/can-bo/sua-can-bo/${ma_can_bo}`} className="btn-edit">
            ✏ Sửa
          </Link>
          <button onClick={handleDelete} className="btn-delete">
            🗑 Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanBoChiTietCanBo;