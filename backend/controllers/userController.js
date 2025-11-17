// backend/controllers/userController.js
import db from '../config/db.js'; // Kết nối MySQL

// ===== Lấy danh sách người dùng (chỉ admin) =====
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, username, role, created_at FROM tai_khoan ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách người dùng' });
  }
};

// ===== Thêm người dùng =====
export const createUser = async (req, res) => {
  const { username, password_hash, role } = req.body; // password_hash đã băm sẵn
  if (!username || !password_hash || !role) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO tai_khoan (username, password_hash, role) VALUES (?, ?, ?)',
      [username, password_hash, role]
    );
    res.json({ id: result.insertId, username, role });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ khi thêm người dùng' });
  }
};

// ===== Sửa role của người dùng =====
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: 'Thiếu role' });
  if (parseInt(id) === req.user.id) return res.status(403).json({ message: 'Không thể sửa chính mình' });

  try {
    const [rows] = await db.execute('SELECT * FROM tai_khoan WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    await db.execute('UPDATE tai_khoan SET role = ? WHERE id = ?', [role, id]);
    res.json({ id: parseInt(id), username: rows[0].username, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng' });
  }
};

// ===== Xóa người dùng =====
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (parseInt(id) === req.user.id) return res.status(403).json({ message: 'Không thể xóa chính mình' });

  try {
    const [rows] = await db.execute('SELECT * FROM tai_khoan WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    await db.execute('DELETE FROM tai_khoan WHERE id = ?', [id]);
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ khi xóa người dùng' });
  }
};
