const pool = require('../config/db');

/* ================= LẤY DANH SÁCH CÁN BỘ (SORT TĂNG DẦN) ================= */
const getCanBoHuongDan = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [canBo] = await connection.execute(`
      SELECT cb.*, dv.ten_don_vi
      FROM can_bo_huong_dan cb
      LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
      ORDER BY CAST(SUBSTRING(cb.ma_can_bo, 3) AS UNSIGNED) ASC
    `);
    connection.release();
    return res.status(200).json(canBo);
  } catch (error) {
    console.error('Lỗi lấy danh sách cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= LẤY CHI TIẾT CÁN BỘ ================= */
const getCanBoHuongDanById = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const connection = await pool.getConnection();

    const [canBo] = await connection.execute(`
      SELECT cb.*, dv.ten_don_vi, dv.dia_chi,
             dv.so_dien_thoai AS so_dien_thoai_don_vi,
             dv.email_don_vi
      FROM can_bo_huong_dan cb
      LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
      WHERE cb.ma_can_bo = ?
    `, [maCanBo]);

    connection.release();

    if (!canBo.length) {
      return res.status(404).json({ message: 'Cán bộ không tồn tại' });
    }

    return res.status(200).json(canBo[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= TẠO CÁN BỘ (TỰ TĂNG + BÙ SỐ THIẾU + CHECK SDT) ================= */
const createCanBoHuongDan = async (req, res) => {
  try {
    const {
      ho_ten, gioi_tinh, so_dien_thoai, email_can_bo,
      so_tk_ngan_hang, chuc_vu, chuyen_mon,
      ma_don_vi, avatar
    } = req.body;

    // 🔹 Kiểm tra bắt buộc
    if (!ho_ten || !ho_ten.trim()) {
      return res.status(400).json({ message: 'Họ tên là bắt buộc' });
    }

    if (!gioi_tinh || !gioi_tinh.trim()) {
      return res.status(400).json({ message: 'Giới tính là bắt buộc' });
    }

    if (!so_dien_thoai || !/^\d{10}$/.test(so_dien_thoai)) {
      return res.status(400).json({ message: 'Số điện thoại phải gồm đúng 10 chữ số (0-9)' });
    }

    if (!email_can_bo || !email_can_bo.trim()) {
      return res.status(400).json({ message: 'Email là bắt buộc' });
    }

    const connection = await pool.getConnection();

    // 🔹 Lấy toàn bộ mã CB và tìm số nhỏ nhất bị thiếu
    const [rows] = await connection.execute(`
      SELECT CAST(SUBSTRING(ma_can_bo, 3) AS UNSIGNED) AS so
      FROM can_bo_huong_dan
      ORDER BY so ASC
    `);

    let nextNumber = 1;
    for (const row of rows) {
      if (row.so !== nextNumber) break;
      nextNumber++;
    }

    const maCanBoMoi = 'CB' + String(nextNumber).padStart(3, '0');

    await connection.execute(`
      INSERT INTO can_bo_huong_dan
      (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai,
       email_can_bo, so_tk_ngan_hang, chuc_vu,
       chuyen_mon, ma_don_vi, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      maCanBoMoi,
      ho_ten,
      gioi_tinh,
      so_dien_thoai,
      email_can_bo,
      so_tk_ngan_hang || '',
      chuc_vu || '',
      chuyen_mon || '',
      ma_don_vi || null,
      avatar || ''
    ]);

    connection.release();

    return res.status(201).json({
      message: 'Tạo cán bộ hướng dẫn thành công',
      ma_can_bo: maCanBoMoi
    });
  } catch (error) {
    console.error('Lỗi tạo cán bộ:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= CẬP NHẬT CÁN BỘ (CHECK SDT) ================= */
const updateCanBoHuongDan = async (req, res) => {
  let connection;
  try {
    const { maCanBo } = req.params;
    const {
      ho_ten,
      gioi_tinh,
      so_dien_thoai,
      email_can_bo,
      so_tk_ngan_hang,
      chuc_vu,
      chuyen_mon,
      ma_don_vi,
      avatar
    } = req.body;

    // 🔹 Kiểm tra bắt buộc
    if (!ho_ten || !ho_ten.trim()) {
      return res.status(400).json({ message: 'Họ tên là bắt buộc' });
    }

    if (!gioi_tinh || !gioi_tinh.trim()) {
      return res.status(400).json({ message: 'Giới tính là bắt buộc' });
    }

    if (!so_dien_thoai || !/^\d{10}$/.test(so_dien_thoai)) {
      return res.status(400).json({ message: 'Số điện thoại phải gồm đúng 10 chữ số (0-9)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_can_bo || !emailRegex.test(email_can_bo)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    connection = await pool.getConnection();

    // Lấy avatar cũ nếu không upload mới
    const [old] = await connection.execute(
      'SELECT avatar FROM can_bo_huong_dan WHERE ma_can_bo = ?',
      [maCanBo]
    );

    const finalAvatar = avatar && avatar !== '' ? avatar : old[0]?.avatar || '';

    // Cập nhật cán bộ
    await connection.execute(`
      UPDATE can_bo_huong_dan SET
        ho_ten=?, gioi_tinh=?, so_dien_thoai=?,
        email_can_bo=?, so_tk_ngan_hang=?, chuc_vu=?,
        chuyen_mon=?, ma_don_vi=?, avatar=?
      WHERE ma_can_bo=?
    `, [
      ho_ten,
      gioi_tinh,
      so_dien_thoai,
      email_can_bo,
      so_tk_ngan_hang || '',
      chuc_vu || '',
      chuyen_mon || '',
      ma_don_vi || null,
      finalAvatar,
      maCanBo
    ]);

    connection.release();
    return res.status(200).json({ message: 'Cập nhật thành công' });
  } catch (error) {
    if (connection) connection.release();
    console.error(error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= XÓA CÁN BỘ ================= */
const deleteCanBoHuongDan = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const connection = await pool.getConnection();
    await connection.execute(
      'DELETE FROM can_bo_huong_dan WHERE ma_can_bo = ?',
      [maCanBo]
    );
    connection.release();
    return res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= TÌM KIẾM (SORT TĂNG DẦN) ================= */
const searchCanBoHuongDan = async (req, res) => {
  try {
    const { query } = req.query;
    const connection = await pool.getConnection();

    let sql = `
      SELECT cb.*, dv.ten_don_vi
      FROM can_bo_huong_dan cb
      LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
      WHERE 1=1
    `;
    const params = [];

    if (query && query.trim() !== '') {
      sql += `
        AND (
          cb.ho_ten LIKE ? OR cb.so_dien_thoai LIKE ?
          OR cb.email_can_bo LIKE ? OR cb.chuc_vu LIKE ?
          OR cb.chuyen_mon LIKE ? OR dv.ten_don_vi LIKE ?
        )
      `;
      const q = `%${query}%`;
      params.push(q, q, q, q, q, q);
    }

    sql += ` ORDER BY CAST(SUBSTRING(cb.ma_can_bo, 3) AS UNSIGNED) ASC`;

    const [canBo] = await connection.execute(sql, params);
    connection.release();

    return res.status(200).json(canBo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  getCanBoHuongDan,
  getCanBoHuongDanById,
  createCanBoHuongDan,
  updateCanBoHuongDan,
  deleteCanBoHuongDan,
  searchCanBoHuongDan
};