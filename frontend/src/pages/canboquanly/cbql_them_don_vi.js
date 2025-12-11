import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/canboquanly/cbql_them_don_vi.css';

const CanBoThemDonVi = () => {
  const [donVi, setDonVi] = useState({
    ten_don_vi: '',
    dia_chi: '',
    so_dien_thoai: '',
    email_don_vi: '',
    gioi_thieu: '',
    dieu_kien_thuc_tap: '',
    hinh_anh: '',  // Chúng ta sẽ lưu trữ dữ liệu base64 của hình ảnh
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');  // Để hiển thị hình ảnh đã chọn trước khi gửi
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i;
    const phoneRegex = /^[0-9]{9,11}$/;

    if (!emailRegex.test(donVi.email_don_vi)) {
      setError("Email không hợp lệ");
      return false;
    }

    if (!phoneRegex.test(donVi.so_dien_thoai)) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setDonVi({ ...donVi, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Lấy file được chọn
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDonVi({ ...donVi, hinh_anh: reader.result });  // Cập nhật hinh_anh với dữ liệu base64
        setImagePreview(reader.result);  // Hiển thị hình ảnh đã chọn
      };
      reader.readAsDataURL(file);  // Đọc file và chuyển sang base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await donViService.create(donVi);
      setSuccess(`Tạo đơn vị thành công: ${response.data.ma_don_vi}`);
      setError("");

      setTimeout(() => navigate('/quan-ly-don-vi'), 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Thêm đơn vị thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <h1>Thêm đơn vị thực tập</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="form_grid">

        <div className="half">
          <label>Tên đơn vị:</label>
          <input type="text" name="ten_don_vi" required onChange={handleChange} />
        </div>

        <div className="half">
          <label>Địa chỉ:</label>
          <input type="text" name="dia_chi" onChange={handleChange} />
        </div>

        <div className="half">
          <label>Số điện thoại:</label>
          <input type="text" name="so_dien_thoai" onChange={handleChange} />
        </div>

        <div className="half">
          <label>Email:</label>
          <input type="email" name="email_don_vi" onChange={handleChange} />
        </div>

        <div className="full">
          <label>Giới thiệu:</label>
          <textarea name="gioi_thieu" onChange={handleChange} />
        </div>

        <div className="full">
          <label>Điều kiện thực tập:</label>
          <textarea name="dieu_kien_thuc_tap" onChange={handleChange} />
        </div>

        <div className="full image_upload_grid">
          <div className="image_input">
            <label>Hình ảnh:</label>
            <input type="file" name="hinh_anh" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="image_preview">
            {imagePreview && (
              <img src={imagePreview} alt="Hình ảnh xem trước" />
            )}
          </div>
        </div>

        <div className="form_actions">
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Thêm đơn vị"}
          </button>
          <button type="button" className="cancel_btn" onClick={() => navigate('/quan-ly-don-vi')}>
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanBoThemDonVi;