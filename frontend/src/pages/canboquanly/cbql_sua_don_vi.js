import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { donViService } from '../../services/api'; 
import { useToast } from '../../contexts/useToast';
import '../../styles/canboquanly/cbql_sua_don_vi.css';

const CanBoSuaDonVi = () => {
  const { showError, showSuccess } = useToast();
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

  const [newImage, setNewImage] = useState(null);  // State lưu trữ hình ảnh mới chọn

  useEffect(() => {
    const fetchDonVi = async (ma_don_vi) => {
      try {
        console.log('Fetching don vi with ID:', ma_don_vi);
        const response = await donViService.getById(ma_don_vi); 
        setDonVi(response.data); 
      } catch (err) {
        console.error('Error fetching don vi:', err);
        showError('Không thể tải thông tin đơn vị'); 
      }
    };

    if (ma_don_vi) {
      fetchDonVi(ma_don_vi);
    } else {
      showError('Không có mã đơn vị');
    }
  }, [ma_don_vi, showError]);

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
      // Validate required fields
      if (!donVi.ten_don_vi || !donVi.ten_don_vi.trim()) {
        showError('Tên đơn vị là bắt buộc');
        return;
      }
      if (!donVi.dia_chi || !donVi.dia_chi.trim()) {
        showError('Địa chỉ là bắt buộc');
        return;
      }
      if (!donVi.so_dien_thoai || !/^\d{10}$/.test(donVi.so_dien_thoai)) {
        showError('Số điện thoại phải gồm đúng 10 chữ số');
        return;
      }
      if (!donVi.email_don_vi || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donVi.email_don_vi)) {
        showError('Email không hợp lệ');
        return;
      }

      let hinhAnhUrl = donVi.hinh_anh;

      // Upload new image if selected
      if (newImage && newImage.startsWith('data:')) {
        try {
          const blob = await fetch(newImage).then(res => res.blob());
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');
          
          const uploadResponse = await fetch('http://localhost:5000/api/don_vi/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            hinhAnhUrl = uploadData.url;
          } else {
            showError('Tải ảnh lên thất bại');
            return;
          }
        } catch (uploadErr) {
          console.error('Upload error:', uploadErr);
          showError('Lỗi khi tải ảnh lên');
          return;
        }
      }

      const updatedDonVi = {
        ten_don_vi: donVi.ten_don_vi,
        dia_chi: donVi.dia_chi,
        so_dien_thoai: donVi.so_dien_thoai,
        email_don_vi: donVi.email_don_vi,
        gioi_thieu: donVi.gioi_thieu || '',
        dieu_kien_thuc_tap: donVi.dieu_kien_thuc_tap || '',
        hinh_anh: hinhAnhUrl || '',
      };
      
      console.log('Sending data:', updatedDonVi);
      await donViService.update(ma_don_vi, updatedDonVi); 
      showSuccess('Cập nhật đơn vị thành công');
      setTimeout(() => navigate(`/can-bo/chi-tiet-don-vi/${ma_don_vi}`), 1000);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showError(err.response?.data?.message || 'Cập nhật thông tin đơn vị thất bại'); 
    }
  };


  return (
    <div className="cbql__sua_don_vi">
      <h1>Sửa Đơn Vị</h1>

      <form onSubmit={handleSubmit} className="cbql__sua_don_vi--form">
        {/* Tên đơn vị */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--half">
          <label>Tên đơn vị:</label>
          <input
            type="text"
            name="ten_don_vi"
            value={donVi.ten_don_vi}
            onChange={handleInputChange}
          />
        </div>

        {/* Địa chỉ */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--half">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="dia_chi"
            value={donVi.dia_chi}
            onChange={handleInputChange}
          />
        </div>

        {/* Số điện thoại */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--half">
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="so_dien_thoai"
            value={donVi.so_dien_thoai}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--half">
          <label>Email:</label>
          <input
            type="email"
            name="email_don_vi"
            value={donVi.email_don_vi}
            onChange={handleInputChange}
          />
        </div>

        {/* Giới thiệu về đơn vị */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--full">
          <label>Giới thiệu về đơn vị:</label>
          <textarea
            name="gioi_thieu"
            value={donVi.gioi_thieu}
            onChange={handleInputChange}
            placeholder="Giới thiệu về đơn vị"
          />
        </div>

        {/* Điều kiện thực tập */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--full">
          <label>Điều kiện thực tập:</label>
          <textarea
            name="dieu_kien_thuc_tap"
            value={donVi.dieu_kien_thuc_tap}
            onChange={handleInputChange}
            placeholder="Điều kiện thực tập"
          />
        </div>

        {/* Hình ảnh đơn vị */}
        <div className="cbql__sua_don_vi--form_group cbql__sua_don_vi--full">
          <label>Hình ảnh:</label>
          <div className="cbql__sua_don_vi--image_preview">
            {newImage ? (
              <img 
                src={newImage} 
                alt="Hình ảnh mới" 
                style={{ width: '200px', height: 'auto' }}
              />
            ) : donVi.hinh_anh ? (
              <img 
                src={donVi.hinh_anh} 
                alt="Hình ảnh đơn vị" 
                style={{ width: '200px', height: 'auto' }}
              />
            ) : (
              <p>Chưa có hình ảnh</p>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        {/* Các nút submit và hủy */}
        <div className="cbql__sua_don_vi--form_buttons">
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