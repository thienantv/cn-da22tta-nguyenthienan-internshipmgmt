# 📂 Danh sách File Thay đổi / Tạo mới

## 📊 Tóm tắt Thay đổi

Tổng cộng: **12 file** (5 file tạo mới, 7 file cập nhật)

---

## ✨ FILE TẠO MỚI (5 files)

### 1. Database & Utils

```
backend/utils/yeuThichSql.js
├─ SQL queries helper
├─ 6 SQL constants cho các hành động
└─ Tái sử dụng dễ dàng
```

### 2. Backend

```
backend/controllers/YeuThichController.js
├─ 5 hàm chính: toggleFavorite, checkFavorite, getFavoriteList, batchCheckFavorites, getFavoriteCount
├─ Xử lý logic yêu thích
└─ Error handling đầy đủ

backend/routes/YeuThichRoutes.js
├─ 5 endpoint (POST/GET)
├─ Bảo vệ bằng verifyToken + checkRole('sinh_vien')
└─ Dễ bảo trì
```

### 3. Frontend

```
frontend/src/components/FavoriteButton.js
├─ Component React tái sử dụng
├─ Props: maDonVi, initialState, onToggle, size, showLabel
├─ Hook: useToast
└─ Animation toggle như/bỏ yêu thích

frontend/src/pages/sinhvien/sv_yeu_thich_don_vi.js
├─ Trang danh sách đơn vị yêu thích
├─ Header với nút điều hướng
├─ Empty state
└─ Tương tự danh sách đơn vị
```

### 4. Styles

```
frontend/src/styles/FavoriteButton.css
├─ Nút tim (♥) với 3 kích thước (sm, md, lg)
├─ Animation heartPulse khi toggle
├─ State active (yêu thích)
└─ Responsive design

frontend/src/styles/sinhvien/sv_yeu_thich_don_vi.css
├─ Layout danh sách yêu thích
├─ Header, empty state, card grid
└─ Responsive cho mobile
```

---

## 🔄 FILE CẬP NHẬT (7 files)

### 1. Database

```
ql_thuctap.sql
├─ Thêm: CREATE TABLE yeu_thich_don_vi
├─ Bảng trung gian many-to-many
├─ Foreign key constraints
└─ Unique constraint (sinh_vien_id, ma_don_vi)
```

### 2. Backend Server

```
backend/server.js
├─ Thêm import: YeuThichRoutes
├─ Thêm route: app.use('/api/yeu_thich', yeuThichRoutes)
└─ 2 dòng code
```

### 3. Frontend Service

```
frontend/src/services/api.js
├─ Thêm yeuThichService export
├─ 5 methods: toggleFavorite, checkFavorite, getFavoriteList, batchCheckFavorites, getFavoriteCount
└─ Gọi API qua axios
```

### 4. Frontend Pages

```
frontend/src/pages/sinhvien/sv_danh_sach_don_vi.js
├─ Thêm import FavoriteButton, yeuThichService
├─ State: favoriteStatuses (object)
├─ batchCheckFavorites để load trạng thái
├─ Nút "♥ Đã yêu thích (count)" trong filter
├─ FavoriteButton trong mỗi card
├─ Handle toggle: handleToggleFavorite
└─ ~50 dòng code mới
```

### 5. Frontend Styles

```
frontend/src/styles/sinhvien/sv_danh_sach_don_vi.css
├─ Cập nhật: .sv__card_buttons
├─ Từ: flex-direction: column → gap + flex-wrap
├─ Hỗ trợ 2 nút (Chi tiết + Yêu thích)
└─ Responsive adjustment
```

### 6. Frontend Routing

```
frontend/src/App.js
├─ Thêm import SinhVienYeuThichDonVi
├─ Cập nhật route path:
│  ├─ /danh-sach-don-vi → /sinh-vien/danh-sach-don-vi
│  └─ Thêm: /sinh-vien/yeu-thich
├─ ProtectedRoute với requiredRole="sinh_vien"
└─ 10 dòng code mới
```

---

## 📋 Chi tiết Từng File

### Tạo mới:

| File | Dòng | Mục đích |
|------|------|---------|
| yeuThichSql.js | 60 | SQL queries |
| YeuThichController.js | 280 | Business logic |
| YeuThichRoutes.js | 35 | API routes |
| FavoriteButton.js | 60 | React component |
| sv_yeu_thich_don_vi.js | 95 | Page list |
| FavoriteButton.css | 130 | Styles nút |
| sv_yeu_thich_don_vi.css | 200 | Styles page |

**Tổng cộng: ~860 dòng code mới**

### Cập nhật:

| File | Thay đổi | Tác động |
|------|---------|---------|
| ql_thuctap.sql | +13 dòng | Tạo bảng |
| server.js | +2 dòng | Import + route |
| api.js | +8 dòng | Service |
| sv_danh_sach_don_vi.js | +50 dòng | Logic + UI |
| sv_danh_sach_don_vi.css | +15 dòng | Layout |
| App.js | +20 dòng | Import + route |

**Tổng cộng: ~108 dòng code thay đổi**

---

## 🗂️ Cấu trúc Thư mục

```
project/
├── ql_thuctap.sql (CẬP NHẬT)
├── HUONG_DAN_YEU_THICH.md (MỚI - DOCUMENTATION)
│
├── backend/
│   ├── server.js (CẬP NHẬT)
│   ├── controllers/
│   │   └── YeuThichController.js (MỚI) ✨
│   ├── routes/
│   │   └── YeuThichRoutes.js (MỚI) ✨
│   └── utils/
│       └── yeuThichSql.js (MỚI) ✨
│
└── frontend/
    ├── src/
    │   ├── App.js (CẬP NHẬT)
    │   ├── services/
    │   │   └── api.js (CẬP NHẬT)
    │   ├── components/
    │   │   └── FavoriteButton.js (MỚI) ✨
    │   ├── pages/
    │   │   └── sinhvien/
    │   │       ├── sv_danh_sach_don_vi.js (CẬP NHẬT)
    │   │       └── sv_yeu_thich_don_vi.js (MỚI) ✨
    │   └── styles/
    │       ├── FavoriteButton.css (MỚI) ✨
    │       └── sinhvien/
    │           ├── sv_danh_sach_don_vi.css (CẬP NHẬT)
    │           └── sv_yeu_thich_don_vi.css (MỚI) ✨
```

---

## ✅ Validation Checklist

- [x] Toàn bộ code mới tuân thủ style hiện có
- [x] Không viết lại code cũ
- [x] Error handling đầy đủ
- [x] Responsive design
- [x] Bảo mật (JWT + Role)
- [x] Dễ dàng gỡ bỏ
- [x] Documentation đầy đủ

---

## 🚀 Bước Triển khai

1. **Pull code mới** từ các file ở trên
2. **Chạy SQL** tạo bảng `yeu_thich_don_vi`
3. **Backend:** Kiểm tra server.js và YeuThichRoutes
4. **Frontend:** Kiểm tra App.js routing
5. **Test:** Đăng nhập sinh viên → Danh sách → Like/Unlike

---

**Status: ✅ HOÀN THÀNH - Sẵn sàng triển khai**
