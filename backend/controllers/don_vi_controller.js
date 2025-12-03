const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

/* ================= Multer config – Upload ảnh ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const uploadImage = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Không có file" });
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Lấy danh sách đơn vị ================= */
const getDonVi = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [donVi] = await conn.execute("SELECT * FROM don_vi ORDER BY created_at DESC");
    conn.release();
    return res.status(200).json(donVi);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Lấy chi tiết đơn vị theo mã ================= */
const getDonViById = async (req, res) => {
  try {
    const { maDonVi } = req.params;
    const conn = await pool.getConnection();

    const [donVi] = await conn.execute("SELECT * FROM don_vi WHERE ma_don_vi = ?", [maDonVi]);
    if (!donVi.length) {
      conn.release();
      return res.status(404).json({ message: "Đơn vị không tồn tại" });
    }

    const [canBo] = await conn.execute("SELECT * FROM can_bo_huong_dan WHERE ma_don_vi = ?", [maDonVi]);
    conn.release();

    return res.status(200).json({ ...donVi[0], can_bo_huong_dan: canBo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Tạo đơn vị ================= */
const createDonVi = async (req, res) => {
  try {
    const {
      ten_don_vi, dia_chi, so_dien_thoai, email_don_vi,
      gioi_thieu, dieu_kien_thuc_tap, hinh_anh
    } = req.body;

    if (!ten_don_vi) return res.status(400).json({ message: "Tên đơn vị là bắt buộc" });

    const conn = await pool.getConnection();
    const [rows] = await conn.execute("SELECT MAX(CAST(SUBSTRING(ma_don_vi,3) AS UNSIGNED)) AS maxID FROM don_vi");
    const nextNumber = (rows[0].maxID || 0) + 1;
    const ma_don_vi = "DV" + String(nextNumber).padStart(3, "0");

    await conn.execute(
      `INSERT INTO don_vi
        (ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi, gioi_thieu, dieu_kien_thuc_tap, hinh_anh)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [ma_don_vi, ten_don_vi, dia_chi || "", so_dien_thoai || "", email_don_vi || "",
       gioi_thieu || "", dieu_kien_thuc_tap || "", hinh_anh || ""]
    );
    conn.release();
    return res.status(201).json({ message: "Tạo đơn vị thành công", ma_don_vi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Cập nhật đơn vị ================= */
const updateDonVi = async (req, res) => {
  try {
    const { maDonVi } = req.params;
    const {
      ten_don_vi, dia_chi, so_dien_thoai, email_don_vi,
      gioi_thieu, dieu_kien_thuc_tap, hinh_anh
    } = req.body;

    const conn = await pool.getConnection();
    await conn.execute(
      `UPDATE don_vi SET 
        ten_don_vi=?, dia_chi=?, so_dien_thoai=?, email_don_vi=?,
        gioi_thieu=?, dieu_kien_thuc_tap=?, hinh_anh=? 
       WHERE ma_don_vi=?`,
      [ten_don_vi, dia_chi || "", so_dien_thoai || "", email_don_vi || "",
       gioi_thieu || "", dieu_kien_thuc_tap || "", hinh_anh || "", maDonVi]
    );
    conn.release();
    return res.status(200).json({ message: "Cập nhật đơn vị thành công" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Xóa đơn vị ================= */
const deleteDonVi = async (req, res) => {
  try {
    const { maDonVi } = req.params;
    const conn = await pool.getConnection();
    await conn.execute("DELETE FROM don_vi WHERE ma_don_vi = ?", [maDonVi]);
    conn.release();
    return res.status(200).json({ message: "Xóa đơn vị thành công" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/* ================= Tìm kiếm chung ================= */
const searchDonVi = async (req, res) => {
  try {
    const { query } = req.query; // Lấy query chung từ request

    let sql = "SELECT * FROM don_vi WHERE 1=1";  // Bắt đầu SQL query
    const params = [];  // Khởi tạo mảng tham số cho SQL

    // Nếu có query tìm kiếm
    if (query) {
      sql += " AND (ten_don_vi LIKE ? OR dia_chi LIKE ? OR so_dien_thoai LIKE ? OR email_don_vi LIKE ?)";
      params.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
    }

    sql += " ORDER BY created_at DESC";  // Sắp xếp theo ngày tạo

    const conn = await pool.getConnection();  // Kết nối với database
    const [rows] = await conn.execute(sql, params);  // Thực thi SQL với các tham số đã chuẩn bị
    conn.release();  // Giải phóng kết nối

    return res.status(200).json(rows);  // Trả về kết quả tìm kiếm
  } catch (err) {
    console.error(err);  // Log lỗi nếu có
    return res.status(500).json({ message: "Lỗi máy chủ" });  // Trả về lỗi server nếu gặp vấn đề
  }
};

/* ================= EXPORT ================= */
module.exports = {
  upload,
  uploadImage,
  getDonVi,
  getDonViById,
  createDonVi,
  updateDonVi,
  deleteDonVi,
  searchDonVi,
};