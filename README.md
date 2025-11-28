# Hệ thống Quản lý Thực tập CNTT

Skeleton code full stack React + Node.js + MySQL cho website quản lý đơn vị thực tập của sinh viên CNTT, có phân quyền theo vai trò Admin, Cán bộ quản lý, Sinh viên.

## Công nghệ sử dụng

- **Frontend**: React 18 + React Router
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **CSS**: Pure CSS3 (không dùng UI library)

## Cấu trúc Project

```
QL_ThucTap/
├── frontend/                    # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Các component dùng chung
│   │   │   ├── Header.js
│   │   │   ├── Navigation.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/               # Các trang (không dấu)
│   │   │   ├── home.js
│   │   │   ├── trang_dang_nhap.js
│   │   │   ├── trang_dang_ky.js
│   │   │   ├── trang_chu_admin.js
│   │   │   ├── trang_chu_can_bo.js
│   │   │   ├── trang_chu_sinh_vien.js
│   │   │   ├── danh_sach_don_vi.js
│   │   │   ├── chi_tiet_don_vi.js
│   │   │   ├── danh_sach_can_bo.js
│   │   │   ├── chi_tiet_can_bo.js
│   │   │   ├── thong_tin_ca_nhan.js
│   │   │   ├── quan_ly_can_bo.js
│   │   │   └── quan_ly_sinh_vien.js
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── styles/              # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── backend/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                # MySQL connection
│   ├── middleware/
│   │   └── auth.js              # JWT & role-based auth
│   ├── controllers/             # Business logic
│   │   ├── auth_controller.js
│   │   ├── don_vi_controller.js
│   │   ├── can_bo_huong_dan_controller.js
│   │   ├── can_bo_quan_ly_controller.js
│   │   ├── sinh_vien_controller.js
│   │   └── admin_controller.js
│   ├── routes/                  # API routes
│   │   ├── auth_routes.js
│   │   ├── don_vi_routes.js
│   │   ├── can_bo_huong_dan_routes.js
│   │   ├── can_bo_quan_ly_routes.js
│   │   ├── sinh_vien_routes.js
│   │   └── admin_routes.js
│   ├── server.js                # Main server
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── setup_database.sql           # Database setup script
└── README.md
```

## Cài đặt và Chạy

### 1. Setup Database

Kết nối MySQL và chạy script:

```bash
mysql -u root -p < setup_database.sql
```

Hoặc import file `setup_database.sql` vào MySQL Workbench / phpMyAdmin

### 2. Setup Backend

```bash
cd backend
npm install
```

Cấu hình file `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ql_thuctap
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Chạy backend:

```bash
npm start          # Production
npm run dev        # Development (với nodemon)
```

Backend chạy tại: `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Cấu hình file `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Chạy frontend:

```bash
npm start
```

Frontend chạy tại: `http://localhost:3000`

## Tài khoản Test

**Admin:**
- Username: `admin1`
- Password: `admin123`

**Cán bộ quản lý:**
- Username: `canbo1`
- Password: `admin123`

**Sinh viên:**
- Username: `sinhvien1`
- Password: `sinhvien123`

## Phân quyền theo Vai trò

### Admin
- Xem thống kê số lượng tài khoản
- Quản lý cán bộ (thêm, sửa, xóa)
- Quản lý sinh viên (thêm, sửa, xóa)
- Xem thông tin cá nhân

### Cán bộ quản lý
- Xem danh sách đơn vị (bảng, với tìm kiếm/lọc)
- Quản lý đơn vị (thêm, sửa, xóa)
- Xem danh sách cán bộ hướng dẫn (bảng, với tìm kiếm/lọc)
- Quản lý cán bộ hướng dẫn (thêm, sửa, xóa)
- Xem thông tin cá nhân

### Sinh viên
- Xem danh sách đơn vị (card layout hoặc bảng)
- Xem chi tiết từng đơn vị
- Xem danh sách cán bộ hướng dẫn
- Xem chi tiết cán bộ hướng dẫn
- Tìm kiếm và lọc
- Xem/cập nhật thông tin cá nhân

## API Endpoints

### Auth
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký (mặc định role = sinh_vien)
- `GET /api/auth/me` - Lấy thông tin người dùng hiện tại (require JWT)

### Đơn vị
- `GET /api/don_vi` - Lấy danh sách đơn vị
- `GET /api/don_vi/search` - Tìm kiếm đơn vị
- `GET /api/don_vi/:maDonVi` - Lấy chi tiết đơn vị
- `POST /api/don_vi` - Tạo đơn vị (require JWT + can_bo_quan_ly)
- `PUT /api/don_vi/:maDonVi` - Cập nhật đơn vị (require JWT + can_bo_quan_ly)
- `DELETE /api/don_vi/:maDonVi` - Xóa đơn vị (require JWT + can_bo_quan_ly)

### Cán bộ Hướng dẫn
- `GET /api/can_bo_huong_dan` - Lấy danh sách
- `GET /api/can_bo_huong_dan/search` - Tìm kiếm
- `GET /api/can_bo_huong_dan/:maCanBo` - Lấy chi tiết
- `POST /api/can_bo_huong_dan` - Tạo (require JWT + can_bo_quan_ly)
- `PUT /api/can_bo_huong_dan/:maCanBo` - Cập nhật (require JWT + can_bo_quan_ly)
- `DELETE /api/can_bo_huong_dan/:maCanBo` - Xóa (require JWT + can_bo_quan_ly)

### Cán bộ Quản lý
- `GET /api/can_bo_quan_ly` - Lấy danh sách (require JWT + admin)
- `GET /api/can_bo_quan_ly/:id` - Lấy chi tiết (require JWT)
- `POST /api/can_bo_quan_ly` - Tạo (require JWT + admin)
- `PUT /api/can_bo_quan_ly/:id` - Cập nhật (require JWT + admin hoặc chính người đó)
- `DELETE /api/can_bo_quan_ly/:id` - Xóa (require JWT + admin)

### Sinh viên
- `GET /api/sinh_vien` - Lấy danh sách (require JWT + admin)
- `GET /api/sinh_vien/:id` - Lấy chi tiết (require JWT)
- `POST /api/sinh_vien` - Tạo (require JWT + admin)
- `PUT /api/sinh_vien/:id` - Cập nhật (require JWT + admin hoặc chính người đó)
- `DELETE /api/sinh_vien/:id` - Xóa (require JWT + admin)

### Admin
- `GET /api/admin/thong_ke` - Lấy thống kê (require JWT + admin)

## Chức năng Chính

### Frontend
- ✅ Đăng nhập/Đăng ký với JWT
- ✅ Persistent login (giữ trạng thái khi reload)
- ✅ Phân quyền route theo role
- ✅ Trang chủ theo vai trò
- ✅ Danh sách đơn vị (card view cho sinh viên, table view cho cán bộ)
- ✅ Chi tiết đơn vị
- ✅ Danh sách cán bộ hướng dẫn (table view)
- ✅ Chi tiết cán bộ hướng dẫn
- ✅ Tìm kiếm và lọc nâng cao
- ✅ Thông tin cá nhân (xem/sửa)
- ✅ Quản lý cán bộ (cho admin)
- ✅ Quản lý sinh viên (cho admin)
- ✅ Responsive design

### Backend
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ CRUD cho tất cả entities
- ✅ Tìm kiếm và lọc
- ✅ Validation dữ liệu
- ✅ Error handling
- ✅ MySQL connection pooling

## Database Schema

### Bảng chính
- `admin` - Tài khoản admin
- `can_bo_quan_ly` - Cán bộ quản lý
- `sinh_vien` - Sinh viên
- `don_vi` - Đơn vị thực tập
- `can_bo_huong_dan` - Cán bộ hướng dẫn (liên kết với don_vi)

## Notes

- Token JWT có hiệu lực 7 ngày
- Password được hash bằng bcryptjs
- Sử dụng MySQL connection pooling cho hiệu suất
- Tất cả route được bảo vệ bằng JWT middleware
- Validation dữ liệu ở cả backend và frontend

## Mở rộng

Dự án được xây dựng dễ mở rộng:
- Thêm entity mới: Tạo controller, route, model
- Thêm chức năng: Tuân theo cấu trúc hiện tại
- Thêm UI: CSS trong `styles/` folder
- Thêm service: Tạo trong `services/` folder

## Support

Để debug:
1. Kiểm tra console (F12)
2. Kiểm tra Network tab
3. Kiểm tra backend logs (terminal)
4. Kiểm tra MySQL logs

---

**Phát triển bởi**: [Tên bạn]  
**Ngày tạo**: 2025  
**Phiên bản**: 1.0.0
#   c n - d a 2 2 t t a - n g u y e n t h i e n a n - i n t e r n s h i p m g m t  
 