import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { canBoHuongDanService } from '../../services/api'; 
import '../../styles/canboquanly/cbql_sua_can_bo.css';

const CanBoSuaCanBoHuongDan = () => {
  const { maCanBo } = useParams();
  const navigate = useNavigate(); 
  
  const [canBo, setCanBo] = useState({
    ho_ten: '',
    ma_can_bo: '',
    gioi_tinh: '',
    so_dien_thoai: '',
    email_can_bo: '',
    chuc_vu: '',
    chuyen_mon: '',
    so_tk_ngan_hang: '',
    ten_don_vi: '',
    dia_chi: '',
    so_dien_thoai_don_vi: '',
    email_don_vi: '',
    hinh_anh: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newImage, setNewImage] = useState(null);  // Lưu trữ hình ảnh mới

  useEffect(() => {
    fetchCanBo(maCanBo);
  }, [maCanBo]);

  const fetchCanBo = async (id) => {
    try {
      const response = await canBoHuongDanService.getById(id);
      setCanBo(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải thông tin cán bộ');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCanBo({ ...canBo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCanBo = {
        ...canBo,
        hinh_anh: newImage || canBo.hinh_anh,
      };
      await canBoHuongDanService.update(maCanBo, updatedCanBo);
      navigate('/can-bo/danh-sach');
    } catch (err) {
      setError('Cập nhật thông tin cán bộ thất bại');
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="cbql__sua_can_bo">
      <h1>Sửa Cán Bộ</h1>

      <form onSubmit={handleSubmit} className="cbql__sua_can_bo--form">
        {/* Thông tin cơ bản */}
        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Họ tên:</label>
          <input 
            type="text" 
            name="ho_ten" 
            value={canBo.ho_ten} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Giới tính:</label>
          <input 
            type="text" 
            name="gioi_tinh" 
            value={canBo.gioi_tinh} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Số điện thoại:</label>
          <input 
            type="text" 
            name="so_dien_thoai" 
            value={canBo.so_dien_thoai} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Email:</label>
          <input 
            type="email" 
            name="email_can_bo" 
            value={canBo.email_can_bo} 
            onChange={handleInputChange} 
          />
        </div>

        {/* Thông tin công việc */}
        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Chức vụ:</label>
          <input 
            type="text" 
            name="chuc_vu" 
            value={canBo.chuc_vu} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Chuyên môn:</label>
          <input 
            type="text" 
            name="chuyen_mon" 
            value={canBo.chuyen_mon} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Số tài khoản ngân hàng:</label>
          <input 
            type="text" 
            name="so_tk_ngan_hang" 
            value={canBo.so_tk_ngan_hang} 
            onChange={handleInputChange} 
          />
        </div>

        {/* Đơn vị công tác */}
        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Tên đơn vị:</label>
          <input 
            type="text" 
            name="ten_don_vi" 
            value={canBo.ten_don_vi} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Địa chỉ đơn vị:</label>
          <input 
            type="text" 
            name="dia_chi" 
            value={canBo.dia_chi} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Điện thoại đơn vị:</label>
          <input 
            type="text" 
            name="so_dien_thoai_don_vi" 
            value={canBo.so_dien_thoai_don_vi} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--half">
          <label>Email đơn vị:</label>
          <input 
            type="email" 
            name="email_don_vi" 
            value={canBo.email_don_vi} 
            onChange={handleInputChange} 
          />
        </div>

        {/* Hình ảnh */}
        <div className="cbql__sua_can_bo--form_group cbql__sua_can_bo--full">
          <label>Hình ảnh:</label>
          <div className="cbql__sua_can_bo--image_preview">
            {canBo.hinh_anh && !newImage ? (
              <img src={canBo.hinh_anh} alt="Cán bộ" style={{ width: '200px', height: 'auto' }} />
            ) : (
              <img src={newImage} alt="Mới" style={{ width: '200px', height: 'auto' }} />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Buttons */}
        <div className="cbql__sua_can_bo--form_buttons">
          <button type="submit" className="btn btn-success">Cập nhật</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/can-bo/danh-sach')}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default CanBoSuaCanBoHuongDan;