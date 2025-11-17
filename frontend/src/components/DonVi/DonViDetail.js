import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import "../../assets/css/donvi/donvi-detail.css";

export default function DonViDetail() {
  const { ma_don_vi } = useParams();
  const [donVi, setDonVi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonVi = async () => {
      try {
        const res = await API.get(`/donvi/${ma_don_vi}`);
        setDonVi(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết đơn vị:", err);
        setError(err.response?.data?.message || "Không thể tải chi tiết đơn vị");
      } finally {
        setLoading(false);
      }
    };
    fetchDonVi();
  }, [ma_don_vi]);

  if (loading) return <p>⏳ Đang tải chi tiết đơn vị...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!donVi) return <p>Không tìm thấy đơn vị.</p>;

  return (
    <div className="donvi-container">
      <h2>Chi tiết đơn vị: {donVi.ten_don_vi}</h2>
      <table className="donvi-table">
        <tbody>
          <tr>
            <th>Mã DV</th>
            <td>{donVi.ma_don_vi}</td>
          </tr>
          <tr>
            <th>Tên đơn vị</th>
            <td>{donVi.ten_don_vi}</td>
          </tr>
          <tr>
            <th>Địa chỉ</th>
            <td>{donVi.dia_chi || "-"}</td>
          </tr>
          <tr>
            <th>Điện thoại</th>
            <td>{donVi.so_dien_thoai || "-"}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{donVi.email_don_vi || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}