import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import "../../assets/css/donvi/donvi-form.css";

export default function DonViForm({ donVi, onSuccess, onCancel, onResetHighlight }) {
  const [ten_don_vi, setTenDonVi] = useState("");
  const [dia_chi, setDiaChi] = useState("");
  const [so_dien_thoai, setSoDienThoai] = useState("");
  const [email_don_vi, setEmailDonVi] = useState("");

  const resetForm = useCallback(() => {
    setTenDonVi("");
    setDiaChi("");
    setSoDienThoai("");
    setEmailDonVi("");
    if (onResetHighlight) onResetHighlight();
  }, [onResetHighlight]);

  useEffect(() => {
    if (donVi) {
      setTenDonVi(donVi.ten_don_vi || "");
      setDiaChi(donVi.dia_chi || "");
      setSoDienThoai(donVi.so_dien_thoai || "");
      setEmailDonVi(donVi.email_don_vi || "");
    } else {
      resetForm();
    }
  }, [donVi, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ten_don_vi || !email_don_vi) {
      alert("⚠️ Vui lòng nhập đầy đủ Tên đơn vị và Email!");
      return;
    }

    const payload = { ten_don_vi, dia_chi, so_dien_thoai, email_don_vi };

    try {
      if (donVi) {
        await API.put(`/donvi/${donVi.ma_don_vi}`, payload);
        alert("✅ Cập nhật thành công!");
      } else {
        await API.post("/donvi", payload);
        alert("✅ Thêm mới thành công!");
      }
      resetForm();
      onSuccess();
    } catch (err) {
      console.error("❌ Lỗi khi lưu đơn vị:", err);
      alert(err.response?.data?.message || "❌ Lỗi kết nối máy chủ!");
    }
  };

  return (
    <div className="donvi-card">
      <div className="donvi-card-header">
        {donVi ? "Cập nhật thông tin đơn vị" : "Thêm mới đơn vị thực tập"}
      </div>
      <div className="donvi-card-body">
        <form onSubmit={handleSubmit}>
          <div className="donvi-row">
            <div className="donvi-col">
              <label>Tên đơn vị *</label>
              <input
                type="text"
                value={ten_don_vi}
                onChange={(e) => setTenDonVi(e.target.value)}
                required
              />
            </div>
            <div className="donvi-col">
              <label>Email *</label>
              <input
                type="email"
                value={email_don_vi}
                onChange={(e) => setEmailDonVi(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="donvi-row">
            <div className="donvi-col">
              <label>Địa chỉ</label>
              <input
                type="text"
                value={dia_chi}
                onChange={(e) => setDiaChi(e.target.value)}
              />
            </div>
            <div className="donvi-col">
              <label>Số điện thoại</label>
              <input
                type="text"
                value={so_dien_thoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
            </div>
          </div>

          <div className="donvi-buttons">
            <button type="submit" className="btn-primary">
              💾 {donVi ? "Cập nhật" : "Thêm mới"}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              🔄 Làm mới
            </button>
            <button type="button" onClick={onCancel} className="btn-danger">
              ❌ Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}