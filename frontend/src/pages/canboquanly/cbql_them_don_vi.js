import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donViService } from '../../services/api';
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_them_don_vi.css';

const CanBoThemDonVi = () => {
  const { showError, showSuccess } = useToast();
  const [donVi, setDonVi] = useState({
    ten_don_vi: '',
    dia_chi: '',
    so_dien_thoai: '',
    email_don_vi: '',
    gioi_thieu: '',
    dieu_kien_thuc_tap: '',
    hinh_anh: '',
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!donVi.ten_don_vi || !donVi.ten_don_vi.trim()) {
      showError("Tên đơn vị là bắt buộc");
      return false;
    }
    if (!donVi.dia_chi || !donVi.dia_chi.trim()) {
      showError("Địa chỉ là bắt buộc");
      return false;
    }
    if (!donVi.so_dien_thoai || !phoneRegex.test(donVi.so_dien_thoai)) {
      showError("Số điện thoại phải đủ 10 số và chỉ gồm các chữ số 0-9");
      return false;
    }
    if (!donVi.email_don_vi || !emailRegex.test(donVi.email_don_vi)) {
      showError("Email không hợp lệ");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setDonVi({ ...donVi, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDonVi({ ...donVi, hinh_anh: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await donViService.create(donVi);
      showSuccess(`Tạo đơn vị thành công: ${response.data.ma_don_vi}`);
      setTimeout(() => navigate('/quan-ly-don-vi'), 1000);
    } catch (err) {
      showError(err.response?.data?.message || "Thêm đơn vị thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cbql__them_don_vi">
      <h1>Thêm đơn vị thực tập</h1>

      <form onSubmit={handleSubmit} className="cbql__them_don_vi--form">

        {/* Hàng 1: Tên đơn vị + Địa chỉ */}
        <div className="cbql__them_don_vi--half">
          <label>Tên đơn vị:</label>
          <input
            type="text"
            name="ten_don_vi"
            value={donVi.ten_don_vi}
            onChange={handleChange}
          />
        </div>
        <div className="cbql__them_don_vi--half">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="dia_chi"
            value={donVi.dia_chi}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 2: Số điện thoại + Email */}
        <div className="cbql__them_don_vi--half">
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="so_dien_thoai"
            value={donVi.so_dien_thoai}
            onChange={handleChange}
          />
        </div>
        <div className="cbql__them_don_vi--half">
          <label>Email:</label>
          <input
            type="email"
            name="email_don_vi"
            value={donVi.email_don_vi}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 3: Giới thiệu */}
        <div className="cbql__them_don_vi--full">
          <label>Giới thiệu:</label>
          <textarea
            name="gioi_thieu"
            value={donVi.gioi_thieu}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 4: Điều kiện thực tập */}
        <div className="cbql__them_don_vi--full">
          <label>Điều kiện thực tập:</label>
          <textarea
            name="dieu_kien_thuc_tap"
            value={donVi.dieu_kien_thuc_tap}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 5: Upload hình ảnh */}
        <div className="cbql__them_don_vi--full cbql__them_don_vi--image_upload_grid">
          <div className="cbql__them_don_vi--image_input">
            <label>Hình ảnh:</label>
            <input
              type="file"
              name="hinh_anh"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="cbql__them_don_vi--image_preview">
            {imagePreview && <img src={imagePreview} alt="Hình ảnh xem trước" />}
          </div>
        </div>

        {/* Hàng 6: Nút hành động */}
        <div className="cbql__them_don_vi--form_actions">
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Thêm đơn vị"}
          </button>
          <button
            type="button"
            className="cbql__them_don_vi--cancel_btn"
            onClick={() => navigate('/quan-ly-don-vi')}
          >
            Huỷ
          </button>
        </div>

      </form>
    </div>
  );
};

export default CanBoThemDonVi;