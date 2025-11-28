const pool = require('../config/db');

// Lấy danh sách cán bộ hướng dẫn
const getCanBoHuongDan = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [canBo] = await connection.execute(
      `SELECT cb.*, dv.ten_don_vi 
       FROM can_bo_huong_dan cb 
       LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi 
       ORDER BY cb.created_at DESC`
    );
    connection.release();

    return res.status(200).json(canBo);
  } catch (error) {
    console.error('Lỗi lấy danh sách cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Lấy chi tiết cán bộ hướng dẫn
const getCanBoHuongDanById = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const connection = await pool.getConnection();

    const [canBo] = await connection.execute(
      `SELECT cb.*, dv.ten_don_vi, dv.dia_chi, dv.so_dien_thoai, dv.email_don_vi
       FROM can_bo_huong_dan cb
       LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
       WHERE cb.ma_can_bo = ?`,
      [maCanBo]
    );

    connection.release();

    if (canBo.length === 0) {
      return res.status(404).json({ message: 'Cán bộ hướng dẫn không tồn tại' });
    }

    return res.status(200).json(canBo[0]);
  } catch (error) {
    console.error('Lỗi lấy chi tiết cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Tạo cán bộ hướng dẫn (chỉ cán bộ quản lý)
const createCanBoHuongDan = async (req, res) => {
  try {
    const { ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi } = req.body;

    // Kiểm tra dữ liệu đầu vào bắt buộc
    if (!ho_ten) {
      return res.status(400).json({ message: 'Họ tên là bắt buộc' });
    }

    // Kết nối đến cơ sở dữ liệu
    const connection = await pool.getConnection();

    // Lấy mã cán bộ cao nhất hiện tại (theo định dạng CBxxx)
    const [result] = await connection.execute(
      `SELECT ma_can_bo FROM can_bo_huong_dan ORDER BY ma_can_bo DESC LIMIT 1`
    );

    let maCanBoMoi = 'CB001'; // Mặc định là mã cán bộ đầu tiên

    if (result.length > 0) {
      const lastMaCanBo = result[0].ma_can_bo;  // Lấy mã cán bộ cao nhất
      const currentNumber = parseInt(lastMaCanBo.slice(2));  // Lấy phần số từ mã (ví dụ từ CB001 lấy 001)
      const newNumber = currentNumber + 1;  // Tăng lên 1

      // Tạo mã cán bộ mới với định dạng 'CBxxx'
      maCanBoMoi = 'CB' + newNumber.toString().padStart(3, '0');
    }

    // Chèn cán bộ vào cơ sở dữ liệu với mã cán bộ mới
    await connection.execute(
      `INSERT INTO can_bo_huong_dan (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [maCanBoMoi, ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_can_bo || '', so_tk_ngan_hang || '', chuc_vu || '', chuyen_mon || '', ma_don_vi || null]
    );

    // Giải phóng kết nối
    connection.release();

    // Trả về thông báo thành công
    return res.status(201).json({ message: 'Tạo cán bộ hướng dẫn thành công', ma_can_bo: maCanBoMoi });
  } catch (error) {
    console.error('Lỗi tạo cán bộ hướng dẫn:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Mã cán bộ hoặc email đã tồn tại' });
    }
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Cập nhật cán bộ hướng dẫn (chỉ cán bộ quản lý)
const updateCanBoHuongDan = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const { ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi } = req.body;

    const connection = await pool.getConnection();

    await connection.execute(
      `UPDATE can_bo_huong_dan 
       SET ho_ten = ?, gioi_tinh = ?, so_dien_thoai = ?, email_can_bo = ?, so_tk_ngan_hang = ?, chuc_vu = ?, chuyen_mon = ?, ma_don_vi = ?
       WHERE ma_can_bo = ?`,
      [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_can_bo || '', so_tk_ngan_hang || '', chuc_vu || '', chuyen_mon || '', ma_don_vi || null, maCanBo]
    );

    connection.release();

    return res.status(200).json({ message: 'Cập nhật cán bộ hướng dẫn thành công' });
  } catch (error) {
    console.error('Lỗi cập nhật cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Xóa cán bộ hướng dẫn (chỉ cán bộ quản lý)
const deleteCanBoHuongDan = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const connection = await pool.getConnection();

    await connection.execute(
      'DELETE FROM can_bo_huong_dan WHERE ma_can_bo = ?',
      [maCanBo]
    );

    connection.release();

    return res.status(200).json({ message: 'Xóa cán bộ hướng dẫn thành công' });
  } catch (error) {
    console.error('Lỗi xóa cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Tìm kiếm cán bộ hướng dẫn
const searchCanBoHuongDan = async (req, res) => {
  try {
    const { ho_ten, email_can_bo, chuyen_mon, ma_don_vi } = req.query;

    let query = `SELECT cb.*, dv.ten_don_vi FROM can_bo_huong_dan cb 
                 LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi 
                 WHERE 1=1`;
    const params = [];

    if (ho_ten) {
      query += ' AND cb.ho_ten LIKE ?';
      params.push(`%${ho_ten}%`);
    }
    if (email_can_bo) {
      query += ' AND cb.email_can_bo LIKE ?';
      params.push(`%${email_can_bo}%`);
    }
    if (chuyen_mon) {
      query += ' AND cb.chuyen_mon LIKE ?';
      params.push(`%${chuyen_mon}%`);
    }
    if (ma_don_vi) {
      query += ' AND cb.ma_don_vi = ?';
      params.push(ma_don_vi);
    }

    query += ' ORDER BY cb.created_at DESC';

    const connection = await pool.getConnection();
    const [canBo] = await connection.execute(query, params);
    connection.release();

    return res.status(200).json(canBo);
  } catch (error) {
    console.error('Lỗi tìm kiếm cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  getCanBoHuongDan,
  getCanBoHuongDanById,
  createCanBoHuongDan,
  updateCanBoHuongDan,
  deleteCanBoHuongDan,
  searchCanBoHuongDan,
};
