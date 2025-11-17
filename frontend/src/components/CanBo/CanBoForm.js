import React, { useEffect, useState } from "react";
import API from "../../api/api";
import "../../assets/css/canbo/canbo-form.css";

export default function CanBoForm({ canBo, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    ma_can_bo: "",
    ho_ten: "",
    gioi_tinh: "Nam",
    so_dien_thoai: "",
    email_can_bo: "",
    so_tk_ngan_hang: "",
    chuc_vu: "",
    chuyen_mon: "",
    ma_don_vi: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (canBo) setForm(canBo);
  }, [canBo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (canBo) {
        await API.put(`/canbo/${canBo.ma_can_bo}`, form);
      } else {
        await API.post("/canbo", form);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi xử lý dữ liệu");
    }
  };

  return (
    <div className="canbo-form-container">
      <h3>{canBo ? "Cập nhật cán bộ" : "Thêm cán bộ"}</h3>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="canbo-form">
        <div className="form-group">
          <label>Mã cán bộ</label>
          <input
            name="ma_can_bo"
            value={form.ma_can_bo}
            onChange={handleChange}
            disabled={!!canBo}
            required
          />
        </div>

        <div className="form-group">
          <label>Họ tên</label>
          <input name="ho_ten" value={form.ho_ten} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <select name="gioi_tinh" value={form.gioi_tinh} onChange={handleChange}>
            <option>Nam</option>
            <option>Nữ</option>
            <option>Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input name="so_dien_thoai" value={form.so_dien_thoai} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email_can_bo" value={form.email_can_bo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Số TK ngân hàng</label>
          <input name="so_tk_ngan_hang" value={form.so_tk_ngan_hang} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Chức vụ</label>
          <input name="chuc_vu" value={form.chuc_vu} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Chuyên môn</label>
          <input name="chuyen_mon" value={form.chuyen_mon} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mã đơn vị</label>
          <input name="ma_don_vi" value={form.ma_don_vi} onChange={handleChange} />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-success">💾 Lưu</button>
          <button type="button" className="btn-cancel" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
}