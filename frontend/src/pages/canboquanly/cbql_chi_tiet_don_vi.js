import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_chi_tiet_don_vi.css';

const CanBoChiTietDonVi = () => {
  const { ma_don_vi } = useParams();
  const [donVi, setDonVi] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonViDetail = async () => {
      try {
        if (!ma_don_vi) {
          showError('Không có mã đơn vị');
          setLoading(false);
          return;
        }
        console.log('Fetching don vi detail with ID:', ma_don_vi);
        const response = await donViService.getById(ma_don_vi);
        setDonVi(response.data);
      } catch (err) {
        console.error('Error fetching don vi detail:', err);
        showError('Không thể tải thông tin đơn vị');
      } finally {
        setLoading(false);
      }
    };
    fetchDonViDetail();
  }, [ma_don_vi]);

  const handleDelete = async () => {
    if (!window.confirm("Bạn chắc chắn muốn xoá đơn vị này?")) return;

    try {
      await donViService.delete(ma_don_vi);
      showSuccess("Xoá đơn vị thành công!");
      navigate("/quan-ly-don-vi");
    } catch (err) {
      showError("Xoá thất bại!");
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!donVi) return <div>Đơn vị không tồn tại</div>;

  return (
    <div className="cbql__chi_tiet_don_vi">

      {/* Nút quay lại */}
      <div className="cbql__chi_tiet_don_vi--top">
        <button onClick={() => navigate(-1)} className="back_btn">
          ← Quay lại
        </button>
      </div>

      <div className="cbql__chi_tiet_don_vi--content">
        <div className="cbql__chi_tiet_don_vi--header">
          <img
            src={donVi.hinh_anh || `https://via.placeholder.com/600x400?text=${donVi.ten_don_vi}`}
            alt={donVi.ten_don_vi}
            className="cbql__chi_tiet_don_vi--image"
          />
        </div>

        <div className="cbql__chi_tiet_don_vi--body">
          <div className="cbql__chi_tiet_don_vi--section">
            <h3>Thông tin cơ bản</h3>
            <div className="cbql__chi_tiet_don_vi--info_row">
              <span className="label">Tên đơn vị:</span>
              <span className="value">{donVi.ten_don_vi}</span>
            </div>
            <div className="cbql__chi_tiet_don_vi--info_row">
              <span className="label">Địa chỉ:</span>
              <span className="value">{donVi.dia_chi}</span>
            </div>
            <div className="cbql__chi_tiet_don_vi--info_row">
              <span className="label">Số điện thoại:</span>
              <span className="value">{donVi.so_dien_thoai}</span>
            </div>
            <div className="cbql__chi_tiet_don_vi--info_row">
              <span className="label">Email:</span>
              <span className="value">{donVi.email_don_vi}</span>
            </div>
          </div>

          {donVi.gioi_thieu && (
            <div className="cbql__chi_tiet_don_vi--section">
              <h3>Giới thiệu về đơn vị</h3>
              <p>{donVi.gioi_thieu}</p>
            </div>
          )}

          {donVi.dieu_kien_thuc_tap && (
            <div className="cbql__chi_tiet_don_vi--section">
              <h3>Điều kiện thực tập</h3>
              <p>{donVi.dieu_kien_thuc_tap}</p>
            </div>
          )}

          {donVi.can_bo_huong_dan?.length > 0 && (
            <div className="cbql__chi_tiet_don_vi--section">
              <h3>Cán bộ hướng dẫn</h3>
              <div className="cbql__chi_tiet_don_vi--can_bo_list">
                {donVi.can_bo_huong_dan.map((cb) => (
                  <div key={cb.ma_can_bo} className="cbql__chi_tiet_don_vi--can_bo_item">
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

        {/* Nút Sửa & Xóa full width 2 cột */}
        <div className="cbql__chi_tiet_don_vi--footer">
          <Link to={`/can-bo/sua-don-vi/${ma_don_vi}`} className="btn btn-edit">
            ✏ Sửa
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            🗑 Xóa
          </button>
        </div>

      </div>
    </div>
  );
};

export default CanBoChiTietDonVi;