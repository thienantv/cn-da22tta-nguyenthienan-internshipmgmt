import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { canBoHuongDanService } from '../../services/api';
import '../../styles/canboquanly/cbql_chi_tiet_can_bo.css';

const CanBoChiTietCanBo = () => {
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
  }, [maCanBo]);

  const handleDelete = async () => {
    if (!window.confirm("Bạn chắc chắn muốn xoá cán bộ này?")) return;
    try {
      await canBoHuongDanService.delete(maCanBo);
      alert("Xoá cán bộ thành công!");
      navigate("/quan-ly-can-bo-huong-dan");
    } catch (err) {
      alert("Xoá thất bại!");
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!canBo) return <div className="error-message">Cán bộ không tồn tại</div>;

  return (
    <div className="cbql__chi_tiet_can_bo">
      <button onClick={() => navigate(-1)} className="back_btn">
        ← Quay lại
      </button>

      <div className="cbql__chi_tiet_can_bo--content">

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
          <Link to={`/can-bo/sua-can-bo/${maCanBo}`} className="btn-edit">
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