const pool = require('../config/db');

// Lấy thống kê số lượng tài khoản (chỉ admin)
const getThongKe = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [adminCount] = await connection.execute('SELECT COUNT(*) as count FROM admin');
    const [canBoCount] = await connection.execute('SELECT COUNT(*) as count FROM can_bo_quan_ly');
    const [sinhVienCount] = await connection.execute('SELECT COUNT(*) as count FROM sinh_vien');
    const [donViCount] = await connection.execute('SELECT COUNT(*) as count FROM don_vi');

    connection.release();

    return res.status(200).json({
      admin: adminCount[0].count,
      can_bo_quan_ly: canBoCount[0].count,
      sinh_vien: sinhVienCount[0].count,
      don_vi: donViCount[0].count,
    });
  } catch (error) {
    console.error('Lỗi lấy thống kê:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  getThongKe,
};
