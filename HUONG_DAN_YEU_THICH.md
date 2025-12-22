# 📋 Hướng dẫn Tích hợp Chức năng "Yêu thích Đơn vị Thực tập"

## 📌 Tổng quan

Chức năng này cho phép sinh viên **yêu thích / like** các đơn vị thực tập mà họ quan tâm. Mỗi sinh viên chỉ có thể yêu thích một đơn vị tối đa 1 lần và có thể bỏ yêu thích (unlike) bất kỳ lúc nào.

---

## 🗄️ PHẦN DATABASE

### 1. Bảng mới: `yeu_thich_don_vi`

Chạy lệnh SQL sau để tạo bảng:

```sql
CREATE TABLE IF NOT EXISTS yeu_thich_don_vi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinh_vien_id INT NOT NULL,
  ma_don_vi VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (sinh_vien_id, ma_don_vi),
  FOREIGN KEY (sinh_vien_id) REFERENCES sinh_vien(id) ON DELETE CASCADE,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE CASCADE
);
```

**Giải thích:**
- `sinh_vien_id`: ID của sinh viên
- `ma_don_vi`: Mã đơn vị
- `UNIQUE KEY`: Đảm bảo một sinh viên chỉ yêu thích một đơn vị 1 lần
- `ON DELETE CASCADE`: Tự động xóa khi sinh viên hoặc đơn vị bị xóa

**Note:** File SQL `ql_thuctap.sql` đã được cập nhật với bảng này.

---

## 🔧 PHẦN BACKEND (Node.js + Express)

### 1. Controller: `backend/controllers/YeuThichController.js`

Chứa 5 hàm chính:

#### a. `toggleFavorite` (POST)
- **Endpoint:** `/api/yeu_thich/toggle`
- **Body:** `{ ma_don_vi: string }`
- **Chức năng:** Like/Unlike đơn vị (toggle)
- **Response:** `{ isFavorited: boolean, message: string }`

#### b. `checkFavorite` (GET)
- **Endpoint:** `/api/yeu_thich/check/:ma_don_vi`
- **Chức năng:** Kiểm tra sinh viên đã yêu thích đơn vị này chưa
- **Response:** `{ isFavorited: boolean }`

#### c. `getFavoriteList` (GET)
- **Endpoint:** `/api/yeu_thich/danh-sach`
- **Chức năng:** Lấy danh sách tất cả đơn vị đã yêu thích
- **Response:** Mảng các đơn vị với đầy đủ thông tin

#### d. `batchCheckFavorites` (POST)
- **Endpoint:** `/api/yeu_thich/batch-check`
- **Body:** `{ donViList: [ma_don_vi1, ma_don_vi2, ...] }`
- **Chức náng:** Kiểm tra trạng thái yêu thích cho nhiều đơn vị (tối ưu)
- **Response:** `{ favoriteIds: [ma_don_vi1, ...] }`

#### e. `getFavoriteCount` (GET)
- **Endpoint:** `/api/yeu_thich/count/:ma_don_vi`
- **Chức năng:** Lấy số lượng sinh viên yêu thích một đơn vị
- **Response:** `{ count: number }`

### 2. Routes: `backend/routes/YeuThichRoutes.js`

Định nghĩa tất cả các endpoint được bảo vệ bởi:
- `verifyToken`: Kiểm tra token hợp lệ
- `checkRole('sinh_vien')`: Chỉ sinh viên được truy cập

### 3. Server Update: `backend/server.js`

Đã thêm:
```javascript
const yeuThichRoutes = require('./routes/YeuThichRoutes');
app.use('/api/yeu_thich', yeuThichRoutes);
```

---

## 🎨 PHẦN FRONTEND (React)

### 1. API Service: `frontend/src/services/api.js`

Thêm service mới `yeuThichService`:

```javascript
export const yeuThichService = {
  toggleFavorite: (maDonVi) => api.post('/yeu_thich/toggle', { ma_don_vi: maDonVi }),
  checkFavorite: (maDonVi) => api.get(`/yeu_thich/check/${maDonVi}`),
  getFavoriteList: () => api.get('/yeu_thich/danh-sach'),
  batchCheckFavorites: (donViList) => api.post('/yeu_thich/batch-check', { donViList }),
  getFavoriteCount: (maDonVi) => api.get(`/yeu_thich/count/${maDonVi}`),
};
```

### 2. Component: `frontend/src/components/FavoriteButton.js`

Nút like/unlike tái sử dụng với props:
- `maDonVi`: Mã đơn vị (bắt buộc)
- `initialState`: Trạng thái ban đầu (default: false)
- `onToggle`: Callback khi toggle
- `size`: Kích thước ('sm', 'md', 'lg') - default 'md'
- `showLabel`: Hiển thị text (default: true)

**CSS:** `frontend/src/styles/FavoriteButton.css`
- Nút tim với động hoạt animation
- Đáp ứng responsive

### 3. Page List: `frontend/src/pages/sinhvien/sv_danh_sach_don_vi.js`

**Cập nhật:**
- Thêm import `FavoriteButton` component
- Thêm state `favoriteStatuses` để lưu trạng thái
- Gọi `batchCheckFavorites` khi load danh sách
- Thêm nút "♥ Đã yêu thích (count)" để nhanh chóng vào trang yêu thích
- Hiển thị `FavoriteButton` trong mỗi card đơn vị
- Cập nhật CSS: `.sv__card_buttons` hỗ trợ 2 nút (Chi tiết + Yêu thích)

### 4. Page Favorites: `frontend/src/pages/sinhvien/sv_yeu_thich_don_vi.js`

Trang mới hiển thị:
- Danh sách các đơn vị đã yêu thích
- Nút "Quay lại" và "Xem tất cả đơn vị"
- Empty state khi chưa yêu thích đơn vị nào
- Tương tự layout danh sách đơn vị (nhất quán UI)

**CSS:** `frontend/src/styles/sinhvien/sv_yeu_thich_don_vi.css`
- Header với nút điều hướng
- Empty state với icon tim
- Responsive design

### 5. Routing: `frontend/src/App.js`

**Cập nhật:**
- Thêm import: `import SinhVienYeuThichDonVi from './pages/sinhvien/sv_yeu_thich_don_vi';`
- Thêm route:
```javascript
<Route
  path="/sinh-vien/yeu-thich"
  element={
    <ProtectedRoute requiredRole="sinh_vien">
      <SinhVienYeuThichDonVi />
    </ProtectedRoute>
  }
/>
```

---

## ✅ Checklist Triển khai

- [x] Tạo bảng `yeu_thich_don_vi` trong database (SQL)
- [x] Tạo SQL helper queries
- [x] Viết YeuThichController.js (5 hàm)
- [x] Viết YeuThichRoutes.js
- [x] Đăng ký route trong server.js
- [x] Thêm yeuThichService vào api.js
- [x] Tạo FavoriteButton component + CSS
- [x] Tích hợp FavoriteButton vào sv_danh_sach_don_vi.js
- [x] Tạo trang sv_yeu_thich_don_vi.js + CSS
- [x] Thêm route trong App.js

---

## 🚀 Hướng dẫn Sử dụng

### Cho Sinh viên:

1. **Xem danh sách đơn vị:** Truy cập `/sinh-vien/danh-sach-don-vi`
2. **Yêu thích đơn vị:** Nhấn nút "♥ Yêu thích" trên card đơn vị
3. **Xem danh sách yêu thích:** 
   - Cách 1: Nhấn nút "♥ Đã yêu thích (count)" trên thanh filter
   - Cách 2: Vào `/sinh-vien/yeu-thich`
4. **Bỏ yêu thích:** Nhấn lại nút "♥" hoặc vào trang yêu thích và click bỏ yêu thích

### Các API Endpoints:

```
POST   /api/yeu_thich/toggle           - Toggle like/unlike
GET    /api/yeu_thich/check/:ma_don_vi - Kiểm tra trạng thái
GET    /api/yeu_thich/danh-sach        - Lấy danh sách yêu thích
POST   /api/yeu_thich/batch-check      - Kiểm tra nhiều đơn vị
GET    /api/yeu_thich/count/:ma_don_vi - Lấy số lượng yêu thích
```

---

## 🎯 Đặc điểm Thiết kế

### ✨ Điểm nổi bật:

1. **Tái sử dụng Component:** `FavoriteButton` có thể dùng ở bất kỳ đâu
2. **Tối ưu Hiệu năng:** Dùng `batchCheckFavorites` thay vì kiểm tra từng đơn vị
3. **UI Nhất quán:** Sử dụng CSS từ trang danh sách hiện có
4. **Xóa sạch:** Dữ liệu yêu thích được xóa tự động khi sinh viên/đơn vị bị xóa
5. **An toàn:** Chỉ sinh viên đã đăng nhập mới truy cập được
6. **Phản hồi Ngay lập tức:** Toast notification + UI update
7. **Responsive:** Hoạt động tốt trên desktop, tablet, mobile

### 🔒 Bảo mật:

- Tất cả endpoint được bảo vệ bằng token JWT
- Chỉ sinh viên mới được truy cập các chức năng yêu thích
- SQL injection được ngăn chặn bằng prepared statements
- Constraint UNIQUE đảm bảo không trùng lặp

---

## 🧪 Testing

### Tester Backend:

1. Đăng nhập với tài khoản sinh viên
2. POST `/api/yeu_thich/toggle` với `ma_don_vi`
3. GET `/api/yeu_thich/danh-sach` để xem danh sách

### Tester Frontend:

1. Login → Sinh viên
2. Vào danh sách đơn vị
3. Click nút ♥ Yêu thích
4. Xem toast notification
5. Click nút "♥ Đã yêu thích"
6. Kiểm tra danh sách yêu thích

---

## 📝 Ghi chú quan trọng

- **Không thay đổi code cũ:** Tất cả logic hiện có được giữ nguyên
- **Dễ gỡ bỏ:** Nếu cần xóa chức năng, chỉ cần:
  - Xóa bảng `yeu_thich_don_vi` 
  - Xóa file YeuThichController.js, YeuThichRoutes.js
  - Xóa import và route trong App.js, server.js
  - Xóa FavoriteButton từ danh sách đơn vị
- **Database:** Bảng mới được thêm vào cuối file `ql_thuctap.sql`

---

## 📞 Hỗ trợ

Nếu gặp lỗi:

1. Kiểm tra đã chạy SQL tạo bảng chưa
2. Kiểm tra token xác thực hợp lệ
3. Kiểm tra console browser và server logs
4. Đảm bảo API URL đúng trong `.env`

---

**Hệ thống đã sẵn sàng! 🎉**
