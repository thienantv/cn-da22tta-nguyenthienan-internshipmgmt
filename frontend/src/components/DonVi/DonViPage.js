import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import "./donvi/donvi-page.css"; // File CSS đi kèm

export default function DonViPage() {
  const [donVis, setDonVis] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/donvi");
      setDonVis(res.data);
    } catch (err) {
      console.error("Không thể load dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn vị này?")) return;
    try {
      await API.delete(`/donvi/${id}`);
      loadData();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const displayedDonVis = donVis
    .filter(d => d.ten_don_vi.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const renderSortArrow = (field) => {
    if (sortField !== field) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="dv-container">
      <h2 className="dv-title">Quản lý đơn vị thực tập</h2>

      <div className="dv-toolbar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="dv-search"
        />
        <Link to="/donvi/add" className="dv-btn dv-add">➕ Thêm đơn vị</Link>
      </div>

      {loading ? (
        <div className="dv-loading">⏳ Đang tải dữ liệu...</div>
      ) : (
        <div className="dv-table-wrapper">
          <table className="dv-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("ma_don_vi")}>Mã đơn vị{renderSortArrow("ma_don_vi")}</th>
                <th onClick={() => handleSort("ten_don_vi")}>Tên đơn vị{renderSortArrow("ten_don_vi")}</th>
                <th>Địa chỉ</th>
                <th>Điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedDonVis.length === 0 ? (
                <tr>
                  <td colSpan="5" className="dv-empty">Không có dữ liệu</td>
                </tr>
              ) : (
                displayedDonVis.map(d => (
                  <tr key={d.ma_don_vi}>
                    <td>{d.ma_don_vi}</td>
                    <td>{d.ten_don_vi}</td>
                    <td>{d.dia_chi}</td>
                    <td>{d.so_dien_thoai}</td>
                    <td className="dv-actions">
                      <Link to={`/donvi/${d.ma_don_vi}`} className="dv-btn dv-view">Xem</Link>
                      <Link to={`/donvi/edit/${d.ma_don_vi}`} className="dv-btn dv-edit">Sửa</Link>
                      <button className="dv-btn dv-delete" onClick={() => handleDelete(d.ma_don_vi)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}