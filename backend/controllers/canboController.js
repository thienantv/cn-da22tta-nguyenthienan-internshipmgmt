import pool from "../config/db.js";

// ✅ Lấy danh sách cán bộ, hỗ trợ sort
export const getAll = async (req, res) => {
  try {
    const { sort = "ma_can_bo", order = "asc" } = req.query;
    const allowedSort = ["ma_can_bo", "ho_ten", "gioi_tinh", "so_dien_thoai", "email_can_bo", "chuc_vu", "chuyen_mon"];
    const sortBy = allowedSort.includes(sort) ? sort : "ma_can_bo";
    const sortOrder = ["asc", "desc"].includes(order.toLowerCase()) ? order.toUpperCase() : "ASC";

    const [rows] = await pool.query(`
      SELECT ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi
      FROM can_bo_huong_dan
      ORDER BY ${sortBy} ${sortOrder}
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách cán bộ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Thêm cán bộ
export const create = async (req, res) => {
  try {
    const { ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi } = req.body;
    if (!ma_can_bo || !ho_ten) return res.status(400).json({ message: "Mã cán bộ và Họ tên là bắt buộc" });

    // Kiểm tra trùng email
    if (email_can_bo) {
      const [check] = await pool.query("SELECT ma_can_bo FROM can_bo_huong_dan WHERE email_can_bo=?", [email_can_bo]);
      if (check.length > 0) return res.status(400).json({ message: "Email đã tồn tại" });
    }

    await pool.query(
      `INSERT INTO can_bo_huong_dan 
      (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi]
    );
    res.json({ ma_can_bo, message: "Thêm mới thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi thêm cán bộ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Cập nhật cán bộ
export const update = async (req, res) => {
  try {
    const ma_can_bo = req.params.ma_can_bo;
    const { ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi } = req.body;

    // Kiểm tra trùng email
    if (email_can_bo) {
      const [check] = await pool.query(
        "SELECT ma_can_bo FROM can_bo_huong_dan WHERE email_can_bo=? AND ma_can_bo!=?",
        [email_can_bo, ma_can_bo]
      );
      if (check.length > 0) return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const [result] = await pool.query(
      `UPDATE can_bo_huong_dan SET ho_ten=?, gioi_tinh=?, so_dien_thoai=?, email_can_bo=?, so_tk_ngan_hang=?, chuc_vu=?, chuyen_mon=?, ma_don_vi=?
       WHERE ma_can_bo=?`,
      [ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi, ma_can_bo]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy cán bộ" });

    res.json({ ma_can_bo, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật cán bộ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Xóa cán bộ
export const remove = async (req, res) => {
  try {
    const ma_can_bo = req.params.ma_can_bo;
    const [result] = await pool.query("DELETE FROM can_bo_huong_dan WHERE ma_can_bo=?", [ma_can_bo]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy cán bộ" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa cán bộ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Tra cứu chi tiết theo mã cán bộ
export const getByMa = async (req, res) => {
  try {
    const ma_can_bo = req.params.ma_can_bo;
    const [rows] = await pool.query(
      "SELECT ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi FROM can_bo_huong_dan WHERE ma_can_bo=?",
      [ma_can_bo]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Không tìm thấy cán bộ" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi khi tra cứu:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Tìm kiếm + sắp xếp
export const search = async (req, res) => {
  try {
    const keyword = `%${req.query.q || ""}%`;
    const { sort = "ma_can_bo", order = "asc" } = req.query;
    const allowedSort = ["ma_can_bo", "ho_ten", "gioi_tinh", "so_dien_thoai", "email_can_bo", "chuc_vu", "chuyen_mon"];
    const sortBy = allowedSort.includes(sort) ? sort : "ma_can_bo";
    const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

    const [rows] = await pool.query(`
      SELECT ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi
      FROM can_bo_huong_dan
      WHERE ho_ten LIKE ? OR email_can_bo LIKE ? OR chuc_vu LIKE ? OR chuyen_mon LIKE ?
      ORDER BY ${sortBy} ${sortOrder}
    `, [keyword, keyword, keyword, keyword]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi tìm kiếm cán bộ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};