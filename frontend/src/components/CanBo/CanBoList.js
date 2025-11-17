import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import CanBoForm from "./CanBoForm";
import "../../assets/css/canbo/canbo-list.css";

export default function CanBoList() {
  const [canBoList, setCanBoList] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await API.get("/canbo/search", { params: { q: query } });
      setCanBoList(res.data);
    } catch (err) {
      console.error("Lỗi load dữ liệu:", err);
    }
  }, [query]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa cán bộ này?")) return;
    try {
      await API.delete(`/canbo/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cb-container">
      <h3>Quản lý Cán bộ hướng dẫn</h3>

      <div className="cb-toolbar">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên, email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="cb-btn-add" onClick={() => { setEditing(null); setShowForm(true); }}>
          ➕ Thêm cán bộ
        </button>
      </div>

      {showForm && (
        <CanBoForm
          canBo={editing}
          onSuccess={() => { setShowForm(false); setEditing(null); loadData(); }}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <table className="cb-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Email</th>
            <th>ĐT</th>
            <th>Đơn vị</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {canBoList.length === 0 ? (
            <tr><td colSpan="7">Không có dữ liệu</td></tr>
          ) : (
            canBoList.map(cb => (
              <tr key={cb.ma_can_bo}>
                <td>{cb.ma_can_bo}</td>
                <td>{cb.ho_ten}</td>
                <td>{cb.gioi_tinh}</td>
                <td>{cb.email_can_bo}</td>
                <td>{cb.so_dien_thoai}</td>
                <td>{cb.ma_don_vi || "-"}</td>
                <td>
                  <button onClick={() => { setEditing(cb); setShowForm(true); }} className="cb-btn-edit">✏️</button>
                  <button onClick={() => handleDelete(cb.ma_can_bo)} className="cb-btn-delete">🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}