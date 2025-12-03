import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { donViService } from '../../services/api'; 
import '../../styles/canboquanly/cb_sua_donvi.css';

const CanBoSuaDonVi = () => {
  const { ma_don_vi } = useParams();
  const navigate = useNavigate(); 
  
  const [donVi, setDonVi] = useState({
    ten_don_vi: '',
    dia_chi: '',
    so_dien_thoai: '',
    email_don_vi: '',
    hinh_anh: '',
    gioi_thieu: '',
    dieu_kien_thuc_tap: '',
    can_bo_huong_dan: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newImage, setNewImage] = useState(null);  // State lưu trữ hình ảnh mới chọn

  useEffect(() => {
    fetchDonVi(ma_don_vi);
  }, [ma_don_vi]);

  const fetchDonVi = async (ma_don_vi) => {
    try {
      const response = await donViService.getById(ma_don_vi); 
      setDonVi(response.data); 
      setError(''); 
    } catch (err) {
      setError('Không thể tải thông tin đơn vị'); 
    } finally {
      setLoading(false); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonVi({ ...donVi, [name]: value }); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);  // Lưu trữ URL của hình ảnh tạm
      };
      reader.readAsDataURL(file);  // Đọc file dưới dạng base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDonVi = {
        ...donVi,
        hinh_anh: newImage || donVi.hinh_anh,  // Nếu có hình ảnh mới thì dùng nó, nếu không dùng hình ảnh cũ
      };
      await donViService.update(ma_don_vi, updatedDonVi); 
      navigate('/quan-ly-don-vi'); 
    } catch (err) {
      setError('Cập nhật thông tin đơn vị thất bại'); 
    }
  };

  if (loading) return <div>Đang tải...</div>; 
  if (error) return <div className="error-message">{error}</div>; 

  return (
    <div className="sua_don_vi_container">
      <h1>Sửa Đơn Vị</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="sua_don_vi_form">
        {/* Tên đơn vị */}
        <div className="form_group half">
          <label>Tên đơn vị:</label>
          <input
            type="text"
            name="ten_don_vi"
            value={donVi.ten_don_vi}
            onChange={handleInputChange}
          />
        </div>

        {/* Địa chỉ */}
        <div className="form_group half">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="dia_chi"
            value={donVi.dia_chi}
            onChange={handleInputChange}
          />
        </div>

        {/* Số điện thoại */}
        <div className="form_group half">
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="so_dien_thoai"
            value={donVi.so_dien_thoai}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="form_group half">
          <label>Email:</label>
          <input
            type="email"
            name="email_don_vi"
            value={donVi.email_don_vi}
            onChange={handleInputChange}
          />
        </div>

        {/* Giới thiệu về đơn vị */}
        <div className="form_group full">
          <label>Giới thiệu về đơn vị:</label>
          <textarea
            name="gioi_thieu"
            value={donVi.gioi_thieu}
            onChange={handleInputChange}
            placeholder="Giới thiệu về đơn vị"
          />
        </div>

        {/* Điều kiện thực tập */}
        <div className="form_group full">
          <label>Điều kiện thực tập:</label>
          <textarea
            name="dieu_kien_thuc_tap"
            value={donVi.dieu_kien_thuc_tap}
            onChange={handleInputChange}
            placeholder="Điều kiện thực tập"
          />
        </div>

        {/* Hình ảnh đơn vị */}
        <div className="form_group full">
          <label>Hình ảnh:</label>
          <div className="image_preview">
            {donVi.hinh_anh && !newImage ? (
              <img 
                src={donVi.hinh_anh} 
                alt="Hình ảnh đơn vị" 
                style={{ width: '200px', height: 'auto' }}
              />
            ) : (
              <img 
                src={newImage} 
                alt="Hình ảnh mới" 
                style={{ width: '200px', height: 'auto' }}
              />
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        {/* Các nút submit và hủy */}
        <div className="form_buttons">
          <button 
            type="submit" 
            className="btn btn-success">
            Cập nhật
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/quan-ly-don-vi')}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanBoSuaDonVi;