import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donViService } from '../../services/api';
import '../../styles/them_don_vi.css';

const CanBoThemDonVi = () => {
  const [donVi, setDonVi] = useState({
    ten_don_vi: '',
    dia_chi: '',
    so_dien_thoai: '',
    email_don_vi: '',
    gioi_thieu: '',
    dieu_kien_thuc_tap: '',
    hinh_anh: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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

        <div className="full">
          <label>Hình ảnh (URL):</label>
          <input type="text" name="hinh_anh" placeholder="https://example.com/image.jpg" onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Thêm đơn vị"}
        </button>
      </form>
    </div>
  );
};

export default CanBoThemDonVi;