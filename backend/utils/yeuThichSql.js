/**
 * Tệp này chứa các hàm SQL helper cho chức năng "Yêu thích đơn vị thực tập"
 * Giúp dễ dàng thêm/xóa/kiểm tra trạng thái yêu thích của sinh viên
 */

// SQL cho Like (Thêm yêu thích)
// Input: sinh_vien_id, ma_don_vi
// Output: success true/false, message
const SQL_ADD_FAVORITE = `
  INSERT INTO yeu_thich_don_vi (sinh_vien_id, ma_don_vi)
  VALUES (?, ?)
`;

// SQL cho Unlike (Xóa yêu thích)
// Input: sinh_vien_id, ma_don_vi
const SQL_REMOVE_FAVORITE = `
  DELETE FROM yeu_thich_don_vi
  WHERE sinh_vien_id = ? AND ma_don_vi = ?
`;

// SQL kiểm tra đơn vị đã được yêu thích chưa
// Input: sinh_vien_id, ma_don_vi
// Output: count (0 hoặc 1)
const SQL_CHECK_FAVORITE = `
  SELECT COUNT(*) as count
  FROM yeu_thich_don_vi
  WHERE sinh_vien_id = ? AND ma_don_vi = ?
`;

// SQL lấy danh sách đơn vị yêu thích của sinh viên
// Input: sinh_vien_id
// Output: danh sách các đơn vị với thông tin chi tiết
const SQL_GET_FAVORITE_UNITS = `
  SELECT d.ma_don_vi, d.ten_don_vi, d.dia_chi, d.so_dien_thoai, 
         d.email_don_vi, d.gioi_thieu, d.dieu_kien_thuc_tap, d.hinh_anh,
         d.created_at, d.updated_at
  FROM yeu_thich_don_vi y
  INNER JOIN don_vi d ON y.ma_don_vi = d.ma_don_vi
  WHERE y.sinh_vien_id = ?
  ORDER BY y.created_at DESC
`;

// SQL lấy số lượng yêu thích của mỗi đơn vị
// Input: ma_don_vi
// Output: count
const SQL_GET_FAVORITE_COUNT = `
  SELECT COUNT(*) as count
  FROM yeu_thich_don_vi
  WHERE ma_don_vi = ?
`;

// SQL lấy trạng thái yêu thích cho một tập hợp đơn vị
// Input: sinh_vien_id, mảng ma_don_vi
// Output: danh sách ma_don_vi được yêu thích
const SQL_GET_FAVORITE_STATUS_BATCH = `
  SELECT ma_don_vi
  FROM yeu_thich_don_vi
  WHERE sinh_vien_id = ? AND ma_don_vi IN (?)
`;

module.exports = {
  SQL_ADD_FAVORITE,
  SQL_REMOVE_FAVORITE,
  SQL_CHECK_FAVORITE,
  SQL_GET_FAVORITE_UNITS,
  SQL_GET_FAVORITE_COUNT,
  SQL_GET_FAVORITE_STATUS_BATCH,
};
