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
    hinh_anh: '',  // Lưu trữ dữ liệu base64 của hình ảnh
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');  // Xem trước hình ảnh
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
    <div className="cbql__them_don_vi">
      <h1>Thêm đơn vị thực tập</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="cbql__them_don_vi--form">

        {/* Hàng 1: Tên đơn vị + Địa chỉ */}
        <div className="cbql__them_don_vi--half">
          <label>Tên đơn vị:</label>
          <input type="text" name="ten_don_vi" required onChange={handleChange} />
        </div>

        <div className="cbql__them_don_vi--half">
          <label>Địa chỉ:</label>
          <input type="text" name="dia_chi" onChange={handleChange} />
        </div>

        {/* Hàng 2: Số điện thoại + Email */}
        <div className="cbql__them_don_vi--half">
          <label>Số điện thoại:</label>
          <input type="text" name="so_dien_thoai" onChange={handleChange} />
        </div>

        <div className="cbql__them_don_vi--half">
          <label>Email:</label>
          <input type="email" name="email_don_vi" onChange={handleChange} />
        </div>

        {/* Hàng 3: Giới thiệu (full width) */}
        <div className="cbql__them_don_vi--full">
          <label>Giới thiệu:</label>
          <textarea name="gioi_thieu" onChange={handleChange} />
        </div>

        {/* Hàng 4: Điều kiện thực tập (full width) */}
        <div className="cbql__them_don_vi--full">
          <label>Điều kiện thực tập:</label>
          <textarea name="dieu_kien_thuc_tap" onChange={handleChange} />
        </div>

        {/* Hàng 5: Upload hình ảnh (full width, chia 2 cột bên trong) */}
        <div className="cbql__them_don_vi--full cbql__them_don_vi--image_upload_grid">
          <div className="cbql__them_don_vi--image_input">
            <label>Hình ảnh:</label>
            <input type="file" name="hinh_anh" accept="image/*" onChange={handleImageChange} />
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
          <button type="button" className="cbql__them_don_vi--cancel_btn" onClick={() => navigate('/quan-ly-don-vi')}>
            Huỷ
          </button>
        </div>

      </form>
    </div>
  );
};

export default CanBoThemDonVi;