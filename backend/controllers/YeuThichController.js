const pool = require('../config/db');

// ==================== TOGGLE FAVORITE (Like/Unlike) ====================
/**
 * Toggle favorite status của một đơn vị cho sinh viên
 * POST /api/yeu_thich/toggle
 * Body: { ma_don_vi }
 * Returns: { isFavorited: boolean, message: string }
 */
const toggleFavorite = async (req, res) => {
  try {
    const { ma_don_vi } = req.body;
    const sinh_vien_id = req.user.id;

    if (!ma_don_vi) {
      return res.status(400).json({ message: 'ma_don_vi là bắt buộc' });
    }

    const connection = await pool.getConnection();

    // Kiểm tra xem sinh viên đã yêu thích đơn vị này chưa
    const [existing] = await connection.execute(
      'SELECT id FROM yeu_thich_don_vi WHERE sinh_vien_id = ? AND ma_don_vi = ?',
      [sinh_vien_id, ma_don_vi]
    );

    let isFavorited = false;
    let message = '';

    if (existing.length > 0) {
      // Nếu đã yêu thích thì xóa (Unlike)
      await connection.execute(
        'DELETE FROM yeu_thich_don_vi WHERE sinh_vien_id = ? AND ma_don_vi = ?',
        [sinh_vien_id, ma_don_vi]
      );
      message = 'Bỏ yêu thích đơn vị thành công';
    } else {
      // Nếu chưa yêu thích thì thêm (Like)
      // Kiểm tra xem đơn vị có tồn tại không
      const [donVi] = await connection.execute(
        'SELECT ma_don_vi FROM don_vi WHERE ma_don_vi = ?',
        [ma_don_vi]
      );

      if (donVi.length === 0) {
        connection.release();
        return res.status(404).json({ message: 'Đơn vị không tồn tại' });
      }

      await connection.execute(
        'INSERT INTO yeu_thich_don_vi (sinh_vien_id, ma_don_vi) VALUES (?, ?)',
        [sinh_vien_id, ma_don_vi]
      );
      isFavorited = true;
      message = 'Yêu thích đơn vị thành công';
    }

    connection.release();

    return res.status(200).json({
      isFavorited,
      message,
    });
  } catch (error) {
    console.error('Lỗi toggle favorite:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ==================== CHECK FAVORITE STATUS ====================
/**
 * Kiểm tra xem sinh viên đã yêu thích đơn vị này chưa
 * GET /api/yeu_thich/check/:ma_don_vi
 * Returns: { isFavorited: boolean }
 */
const checkFavorite = async (req, res) => {
  try {
    const { ma_don_vi } = req.params;
    const sinh_vien_id = req.user.id;

    if (!ma_don_vi) {
      return res.status(400).json({ message: 'ma_don_vi là bắt buộc' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'SELECT id FROM yeu_thich_don_vi WHERE sinh_vien_id = ? AND ma_don_vi = ?',
      [sinh_vien_id, ma_don_vi]
    );

    connection.release();

    return res.status(200).json({
      isFavorited: result.length > 0,
    });
  } catch (error) {
    console.error('Lỗi check favorite:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ==================== GET FAVORITE LIST ====================
/**
 * Lấy danh sách đơn vị yêu thích của sinh viên
 * GET /api/yeu_thich/danh-sach
 * Returns: [{ ma_don_vi, ten_don_vi, ... }]
 */
const getFavoriteList = async (req, res) => {
  try {
    const sinh_vien_id = req.user.id;

    const connection = await pool.getConnection();

    const [favorites] = await connection.execute(
      `SELECT d.ma_don_vi, d.ten_don_vi, d.dia_chi, d.so_dien_thoai, 
              d.email_don_vi, d.gioi_thieu, d.dieu_kien_thuc_tap, d.hinh_anh,
              d.created_at, d.updated_at,
              y.created_at as favorited_at
       FROM yeu_thich_don_vi y
       INNER JOIN don_vi d ON y.ma_don_vi = d.ma_don_vi
       WHERE y.sinh_vien_id = ?
       ORDER BY y.created_at DESC`,
      [sinh_vien_id]
    );

    connection.release();

    return res.status(200).json(favorites);
  } catch (error) {
    console.error('Lỗi lấy danh sách yêu thích:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ==================== GET FAVORITE STATUS FOR BATCH ====================
/**
 * Lấy trạng thái yêu thích cho một danh sách đơn vị
 * POST /api/yeu_thich/batch-check
 * Body: { donViList: [ma_don_vi1, ma_don_vi2, ...] }
 * Returns: { favoriteIds: [ma_don_vi1, ...] }
 */
const batchCheckFavorites = async (req, res) => {
  try {
    const { donViList } = req.body;
    const sinh_vien_id = req.user.id;

    if (!donViList || !Array.isArray(donViList) || donViList.length === 0) {
      return res.status(400).json({ message: 'donViList là bắt buộc và phải là mảng' });
    }

    const connection = await pool.getConnection();

    // Tạo placeholders cho SQL query
    const placeholders = donViList.map(() => '?').join(',');
    const [result] = await connection.execute(
      `SELECT ma_don_vi FROM yeu_thich_don_vi 
       WHERE sinh_vien_id = ? AND ma_don_vi IN (${placeholders})`,
      [sinh_vien_id, ...donViList]
    );

    connection.release();

    const favoriteIds = result.map(r => r.ma_don_vi);
    return res.status(200).json({ favoriteIds });
  } catch (error) {
    console.error('Lỗi batch check favorites:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// ==================== GET FAVORITE COUNT ====================
/**
 * Lấy số lượng sinh viên yêu thích một đơn vị
 * GET /api/yeu_thich/count/:ma_don_vi
 * Returns: { count: number }
 */
const getFavoriteCount = async (req, res) => {
  try {
    const { ma_don_vi } = req.params;

    if (!ma_don_vi) {
      return res.status(400).json({ message: 'ma_don_vi là bắt buộc' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'SELECT COUNT(*) as count FROM yeu_thich_don_vi WHERE ma_don_vi = ?',
      [ma_don_vi]
    );

    connection.release();

    return res.status(200).json({
      count: result[0]?.count || 0,
    });
  } catch (error) {
    console.error('Lỗi lấy số lượng yêu thích:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  toggleFavorite,
  checkFavorite,
  getFavoriteList,
  batchCheckFavorites,
  getFavoriteCount,
};
