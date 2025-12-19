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
      `SELECT cb.*, dv.ten_don_vi, dv.dia_chi, dv.so_dien_thoai as so_dien_thoai_don_vi, dv.email_don_vi
       FROM can_bo_huong_dan cb
       LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
       WHERE cb.ma_can_bo = ?`,
      [maCanBo]
    );
    connection.release();
    if (canBo.length === 0) return res.status(404).json({ message: 'Cán bộ hướng dẫn không tồn tại' });
    return res.status(200).json(canBo[0]);
  } catch (error) {
    console.error('Lỗi lấy chi tiết cán bộ hướng dẫn:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Tạo cán bộ hướng dẫn (có avatar)
const createCanBoHuongDan = async (req, res) => {
  try {
    const { ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi, avatar } = req.body;

    if (!ho_ten) return res.status(400).json({ message: 'Họ tên là bắt buộc' });

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `SELECT ma_can_bo FROM can_bo_huong_dan ORDER BY ma_can_bo DESC LIMIT 1`
    );

    let maCanBoMoi = 'CB001';
    if (result.length > 0) {
      const lastMaCanBo = result[0].ma_can_bo;
      const currentNumber = parseInt(lastMaCanBo.slice(2));
      maCanBoMoi = 'CB' + (currentNumber + 1).toString().padStart(3, '0');
    }

    await connection.execute(
      `INSERT INTO can_bo_huong_dan 
       (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [maCanBoMoi, ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_can_bo || '', so_tk_ngan_hang || '', chuc_vu || '', chuyen_mon || '', ma_don_vi || null, avatar || '']
    );

    connection.release();
    return res.status(201).json({ message: 'Tạo cán bộ hướng dẫn thành công', ma_can_bo: maCanBoMoi });
  } catch (error) {
    console.error('Lỗi tạo cán bộ hướng dẫn:', error);
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Mã cán bộ hoặc email đã tồn tại' });
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Cập nhật cán bộ hướng dẫn (có avatar)
const updateCanBoHuongDan = async (req, res) => {
  let connection;
  try {
    const { maCanBo } = req.params;
    const { ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi, avatar } = req.body;

    console.log('Updating canbo:', { maCanBo, ho_ten, email_can_bo, avatarLength: avatar ? avatar.length : 0 });

    connection = await pool.getConnection();

    // Lấy thông tin cán bộ cũ để giữ avatar nếu không có avatar mới
    const [oldCanBo] = await connection.execute(
      `SELECT avatar FROM can_bo_huong_dan WHERE ma_can_bo = ?`,
      [maCanBo]
    );

    const finalAvatar = (avatar && avatar !== '') ? avatar : (oldCanBo.length > 0 ? oldCanBo[0].avatar : null);

    const updateFields = [ho_ten, gioi_tinh || 'Khác', so_dien_thoai || '', email_can_bo || '', so_tk_ngan_hang || '', chuc_vu || '', chuyen_mon || '', ma_don_vi || null, finalAvatar];
    const sql = `UPDATE can_bo_huong_dan SET ho_ten=?, gioi_tinh=?, so_dien_thoai=?, email_can_bo=?, so_tk_ngan_hang=?, chuc_vu=?, chuyen_mon=?, ma_don_vi=?, avatar=? WHERE ma_can_bo=?`;
    updateFields.push(maCanBo);

    console.log('Executing update with fields count:', updateFields.length);
    await connection.execute(sql, updateFields);
    
    // Lấy dữ liệu mới để return
    const [updatedCanBo] = await connection.execute(
      `SELECT cb.*, dv.ten_don_vi, dv.dia_chi, dv.so_dien_thoai as so_dien_thoai_don_vi, dv.email_don_vi
       FROM can_bo_huong_dan cb
       LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
       WHERE cb.ma_can_bo = ?`,
      [maCanBo]
    );
    
    connection.release();
    console.log('✓ Update successful');
    return res.status(200).json({ message: 'Cập nhật cán bộ hướng dẫn thành công', data: updatedCanBo[0] });
  } catch (error) {
    if (connection) connection.release();
    console.error('Lỗi cập nhật cán bộ hướng dẫn:', error);
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email đã tồn tại' });
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Xóa cán bộ hướng dẫn
const deleteCanBoHuongDan = async (req, res) => {
  try {
    const { maCanBo } = req.params;
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM can_bo_huong_dan WHERE ma_can_bo=?', [maCanBo]);
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
    const { query } = req.query;
    const connection = await pool.getConnection();

    let sql = `SELECT cb.*, dv.ten_don_vi, dv.dia_chi, dv.so_dien_thoai as so_dien_thoai_don_vi, dv.email_don_vi 
               FROM can_bo_huong_dan cb
               LEFT JOIN don_vi dv ON cb.ma_don_vi = dv.ma_don_vi
               WHERE 1=1`;
    const params = [];

    if (query && query.trim() !== "") {
      sql += ` AND (cb.ho_ten LIKE ? OR cb.so_dien_thoai LIKE ? OR cb.email_can_bo LIKE ? OR cb.chuc_vu LIKE ? OR cb.chuyen_mon LIKE ? OR dv.ten_don_vi LIKE ?)`;
      const searchValue = `%${query}%`;
      params.push(searchValue, searchValue, searchValue, searchValue, searchValue, searchValue);
    }

    sql += ` ORDER BY cb.created_at DESC`;
    const [canBo] = await connection.execute(sql, params);
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