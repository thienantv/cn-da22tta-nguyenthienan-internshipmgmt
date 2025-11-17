import pool from '../config/db.js';

// 🧩 Sinh mã đơn vị DV001, DV002,...
const generateMaDonVi = async () => {
  const [rows] = await pool.query("SELECT ma_don_vi FROM don_vi");
  const usedNumbers = rows
    .map(r => parseInt(r.ma_don_vi.replace("DV", "")))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  let nextNum = 1;
  for (let num of usedNumbers) {
    if (num === nextNum) nextNum++;
    else if (num > nextNum) break;
  }
  return `DV${nextNum.toString().padStart(3, "0")}`;
};

// ✅ Lấy danh sách đơn vị, hỗ trợ sort
export const getAll = async (req, res) => {
  try {
    const { sort = "ma_don_vi", order = "asc" } = req.query;
    const allowedSort = ["ma_don_vi", "ten_don_vi", "dia_chi", "so_dien_thoai", "email_don_vi"];
    const sortBy = allowedSort.includes(sort) ? sort : "ma_don_vi";
    const sortOrder = ["asc", "desc"].includes(order.toLowerCase()) ? order.toUpperCase() : "ASC";

    const [rows] = await pool.query(`
      SELECT ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi
      FROM don_vi
      ORDER BY ${sortBy} ${sortOrder}
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm đơn vị
export const create = async (req, res) => {
  try {
    let { ten_don_vi, ma_don_vi, dia_chi, so_dien_thoai, email_don_vi } = req.body;
    if (!ten_don_vi) return res.status(400).json({ message: "Tên đơn vị không được để trống" });

    if (!ma_don_vi) ma_don_vi = await generateMaDonVi();

    // Kiểm tra trùng email
    if (email_don_vi) {
      const [check] = await pool.query(
        "SELECT ma_don_vi FROM don_vi WHERE email_don_vi=?", 
        [email_don_vi]
      );
      if (check.length > 0) return res.status(400).json({ message: "Email đã tồn tại" });
    }

    await pool.query(
      "INSERT INTO don_vi (ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi) VALUES (?,?,?,?,?)",
      [ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi]
    );
    res.json({ ma_don_vi, message: "Thêm thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi thêm đơn vị:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật đơn vị
export const update = async (req, res) => {
  try {
    const ma_don_vi = req.params.ma_don_vi;
    const { ten_don_vi, dia_chi, so_dien_thoai, email_don_vi } = req.body;

    // Kiểm tra trùng email
    if (email_don_vi) {
      const [check] = await pool.query(
        "SELECT ma_don_vi FROM don_vi WHERE email_don_vi=? AND ma_don_vi!=?", 
        [email_don_vi, ma_don_vi]
      );
      if (check.length > 0) return res.status(400).json({ message: "Email đã tồn tại" });
    }

    await pool.query(
      "UPDATE don_vi SET ten_don_vi=?, dia_chi=?, so_dien_thoai=?, email_don_vi=?, updated_at=NOW() WHERE ma_don_vi=?",
      [ten_don_vi, dia_chi, so_dien_thoai, email_don_vi, ma_don_vi]
    );
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa đơn vị
export const remove = async (req, res) => {
  try {
    const ma_don_vi = req.params.ma_don_vi;
    const [result] = await pool.query(
      "DELETE FROM don_vi WHERE ma_don_vi=?", 
      [ma_don_vi]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy đơn vị" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi xoá:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tìm kiếm + sắp xếp
export const search = async (req, res) => {
  try {
    const keyword = `%${req.query.q || ""}%`;
    const { sort = "ma_don_vi", order = "asc" } = req.query;
    const allowedSort = ["ma_don_vi", "ten_don_vi", "dia_chi", "so_dien_thoai", "email_don_vi"];
    const sortBy = allowedSort.includes(sort) ? sort : "ma_don_vi";
    const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

    const [rows] = await pool.query(`
      SELECT ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi
      FROM don_vi
      WHERE ten_don_vi LIKE ? OR dia_chi LIKE ? OR email_don_vi LIKE ?
      ORDER BY ${sortBy} ${sortOrder}
    `, [keyword, keyword, keyword]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi tìm kiếm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tra cứu chi tiết theo mã đơn vị
export const getByMa = async (req, res) => {
  try {
    const ma_don_vi = req.params.ma_don_vi;
    const [rows] = await pool.query(
      "SELECT ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi FROM don_vi WHERE ma_don_vi=?", 
      [ma_don_vi]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Không tìm thấy đơn vị" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi khi tra cứu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};