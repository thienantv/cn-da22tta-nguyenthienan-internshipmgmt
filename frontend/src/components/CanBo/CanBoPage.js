import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import "../../assets/css/canbo/canbo-page.css";

export default function CanBoPage() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    try {
      const res = await API.get("/canbo");
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = list.filter(cb =>
    cb.ho_ten.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cb-container">
      <h2>Cán bộ hướng dẫn</h2>

      <div className="cb-toolbar">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/canbo/add" className="cb-btn-add">➕ Thêm</Link>
      </div>

      <table className="cb-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>ĐT</th>
            <th>Đơn vị</th>
            <th>Hành độn</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="6">Không có dữ liệu</td></tr>
          ) : (
            filtered.map(cb => (
              <tr key={cb.ma_can_bo}>
                <td>{cb.ma_can_bo}</td>
                <td>{cb.ho_ten}</td>
                <td>{cb.email_can_bo}</td>
                <td>{cb.so_dien_thoai}</td>
                <td>{cb.ma_don_vi}</td>
                <td>
                  <Link to={`/canbo/${cb.ma_can_bo}`} className="cb-btn-view">Xem</Link>
                  <Link to={`/canbo/edit/${cb.ma_can_bo}`} className="cb-btn-edit">Sửa</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}