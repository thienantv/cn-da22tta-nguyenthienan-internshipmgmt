import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
//import "../../assets/css/canbo/canbo-detail.css";

export default function CanBoDetail() {
  const { ma_can_bo } = useParams();
  const [canBo, setCanBo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCanBo = async () => {
      try {
        const res = await API.get(`/canbo/${ma_can_bo}`);
        setCanBo(res.data);
      } catch (err) {
        setError("Không thể tải chi tiết cán bộ");
      } finally {
        setLoading(false);
      }
    };
    fetchCanBo();
  }, [ma_can_bo]);

  if (loading) return <p>⏳ Đang tải chi tiết...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!canBo) return <p>Không tìm thấy dữ liệu.</p>;

  return (
    <div className="canbo-container">
      <h2>Chi tiết cán bộ: {canBo.ho_ten}</h2>
      <table className="canbo-table">
        <tbody>
          <tr><th>Mã cán bộ</th><td>{canBo.ma_can_bo}</td></tr>
          <tr><th>Họ tên</th><td>{canBo.ho_ten}</td></tr>
          <tr><th>Giới tính</th><td>{canBo.gioi_tinh}</td></tr>
          <tr><th>Điện thoại</th><td>{canBo.so_dien_thoai || "-"}</td></tr>
          <tr><th>Email</th><td>{canBo.email_can_bo || "-"}</td></tr>
          <tr><th>Số TK ngân hàng</th><td>{canBo.so_tk_ngan_hang || "-"}</td></tr>
          <tr><th>Chức vụ</th><td>{canBo.chuc_vu || "-"}</td></tr>
          <tr><th>Chuyên môn</th><td>{canBo.chuyen_mon || "-"}</td></tr>
          <tr><th>Mã đơn vị</th><td>{canBo.ma_don_vi || "-"}</td></tr>
        </tbody>
      </table>
    </div>
  );
}