import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import DonViForm from "./DonViForm";
import "../../assets/css/donvi/donvi-list.css";

export default function DonViList() {
  const [donViList, setDonViList] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [sortField, setSortField] = useState("ma_don_vi");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/donvi/search", {
        params: { q: query, sort: sortField, order: sortOrder },
      });
      setDonViList(res.data);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách:", err);
    } finally {
      setLoading(false);
    }
  }, [query, sortField, sortOrder]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortOrder("asc"); }
  };

  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  const handleDelete = async (ma_don_vi) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn vị này?")) return;
    try {
      await API.delete(`/donvi/${ma_don_vi}`);
      if (editing && editing.ma_don_vi === ma_don_vi) setEditing(null);
      fetchData();
      alert("🗑️ Xóa thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa!");
    }
  };

  const handleAddNew = () => { setEditing(null); setShowForm(true); };
  const handleFormSuccess = () => { setEditing(null); setShowForm(false); fetchData(); };
  const handleFormCancel = () => { setShowForm(false); setEditing(null); };

  return (
    <div className="dv-container">
      <h3 className="dv-title">Quản lý đơn vị thực tập</h3>

      <div className="dv-toolbar">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên, địa chỉ, email..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="dv-input"
        />
        <button className="dv-btn dv-btn-success" onClick={handleAddNew}>➕ Thêm đơn vị mới</button>
      </div>

      {showForm && (
        <DonViForm
          donVi={editing}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
          onResetHighlight={() => setEditing(null)}
        />
      )}

      <div className="dv-card">
        <div className="dv-card-header">Danh sách đơn vị</div>
        <div className="dv-table-responsive">
          <table className="dv-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("ma_don_vi")}>Mã DV{renderSortArrow("ma_don_vi")}</th>
                <th onClick={() => handleSort("ten_don_vi")}>Tên đơn vị{renderSortArrow("ten_don_vi")}</th>
                <th onClick={() => handleSort("dia_chi")}>Địa chỉ{renderSortArrow("dia_chi")}</th>
                <th onClick={() => handleSort("so_dien_thoai")}>Điện thoại{renderSortArrow("so_dien_thoai")}</th>
                <th onClick={() => handleSort("email_don_vi")}>Email{renderSortArrow("email_don_vi")}</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="dv-text-center">⏳ Đang tải...</td></tr>
              ) : donViList.length === 0 ? (
                <tr><td colSpan="6" className="dv-text-center dv-text-muted">Không có dữ liệu</td></tr>
              ) : (
                donViList.map(d => (
                  <tr key={d.ma_don_vi} className={editing && editing.ma_don_vi === d.ma_don_vi ? "dv-row-highlight" : ""}>
                    <td className="dv-text-center">{d.ma_don_vi}</td>
                    <td>{d.ten_don_vi}</td>
                    <td>{d.dia_chi}</td>
                    <td>{d.so_dien_thoai}</td>
                    <td>{d.email_don_vi}</td>
                    <td className="dv-text-center">
                      <button onClick={() => {setEditing(d); setShowForm(true);}} className="dv-btn dv-btn-warning">✏️ Sửa</button>
                      <button onClick={() => handleDelete(d.ma_don_vi)} className="dv-btn dv-btn-danger">🗑️ Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}