# Hệ Thống Quản Lý Thực Tập CNTT - Giới Thiệu Dự Án

## 📋 Tổng Quan

Đây là một ứng dụng web toàn diện (Full-Stack) được phát triển để quản lý các đơn vị thực tập của sinh viên Công Nghệ Thông Tin. Hệ thống cung cấp một nền tảng trung tâm cho phép các sinh viên, cán bộ quản lý và quản trị viên tương tác và quản lý thông tin về các cơ sở thực tập.

**Tên dự án:** Hệ Thống Quản Lý Thực Tập (Internship Management System)  
**Loại dự án:** Full-Stack Web Application  
**Người phát triển:** Nguyễn Thiện An  
**Trường:** Đại học Trà Vinh

---

## 🎯 Mục Đích Dự Án

- **Quản lý tập trung:** Cung cấp một hệ thống duy nhất để quản lý tất cả thông tin về các đơn vị thực tập
- **Phân quyền người dùng:** Hỗ trợ ba vai trò khác nhau (Admin, Cán bộ quản lý, Sinh viên) với các quyền khác nhau
- **Tìm kiếm và lọc:** Cho phép người dùng dễ dàng tìm kiếm và lọc thông tin
- **Xác thực an toàn:** Sử dụng JWT để bảo vệ các API
- **Quản lý tài khoản:** Hỗ trợ đăng ký, đăng nhập, quên mật khẩu và xác thực email

---

## 🏗️ Kiến Trúc và Công Nghệ

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Styling:** Pure CSS3 (không sử dụng UI library)
- **Thư viện UI:** FontAwesome, React Icons
- **Tính năng:** 
  - Upload tập tin (Multer)
  - Hệ thống thông báo (Toast)
  - Bối cảnh (Context API) cho quản lý trạng thái

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL 8
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Express Validator
- **Mã hóa:** bcryptjs
- **Gửi Email:** Nodemailer
- **CORS:** Được kích hoạt
- **Upload File:** Multer
- **Environment:** dotenv

### Database
- **Hệ quản trị:** MySQL
- **Encoding:** UTF-8MB4
- **Kết nối:** Connection Pool (10 kết nối)

---

## 📁 Cấu Trúc Dự Án

```
cn-da22tta-nguyenthienan-internshipmgmt/
│
├── backend/                          # Ứng dụng Node.js/Express
│   ├── config/
│   │   └── db.js                    # Cấu hình kết nối MySQL
│   ├── controllers/                 # Xử lý logic kinh doanh
│   │   ├── XacThucController.js     # Xác thực/đăng nhập
│   │   ├── DonViController.js       # Quản lý đơn vị thực tập
│   │   ├── CanBoHuongDanController.js  # Quản lý cán bộ hướng dẫn
│   │   ├── CanBoQuanLyController.js # Quản lý cán bộ quản lý
│   │   ├── SinhVienController.js    # Quản lý sinh viên
│   │   ├── QuanTriVienController.js # Quản lý tài khoản Admin
│   │   ├── YeuThichController.js    # Quản lý mục yêu thích
│   │   └── QuenMatKhauController.js # Quản lý quên mật khẩu
│   ├── routes/                      # Định tuyến API
│   │   ├── XacThucRoutes.js
│   │   ├── DonViRoutes.js
│   │   ├── CanBoHuongDanRoutes.js
│   │   ├── CanBoQuanLyRoutes.js
│   │   ├── SinhVienRoutes.js
│   │   ├── QuanTriVienRoutes.js
│   │   ├── YeuThichRoutes.js
│   │   └── QuenMatKhauRoutes.js
│   ├── middleware/
│   │   └── auth.js                  # Middleware xác thực JWT
│   ├── uploads/                     # Thư mục lưu trữ tải lên
│   ├── utils/
│   │   └── yeuThichSql.js          # Tiện ích SQL cho mục yêu thích
│   ├── server.js                    # Điểm khởi động chính
│   └── package.json
│
├── frontend/                         # Ứng dụng React
│   ├── src/
│   │   ├── App.js                   # Thành phần gốc
│   │   ├── index.js                 # Điểm vào
│   │   ├── components/              # Các thành phần tái sử dụng
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ProtectedRoute.js    # Bảo vệ các tuyến
│   │   │   ├── ToastContainer.js    # Hệ thống thông báo
│   │   │   └── FavoriteButton.js
│   │   ├── contexts/                # React Contexts
│   │   │   ├── ToastContext.js
│   │   │   └── useToast.js
│   │   ├── pages/                   # Trang theo vai trò
│   │   │   ├── home.js              # Trang chủ
│   │   │   ├── admin/               # Trang quản trị viên
│   │   │   │   ├── qtv_trang_chu.js
│   │   │   │   ├── qtv_quan_ly_can_bo.js
│   │   │   │   ├── qtv_quan_ly_sinh_vien.js
│   │   │   │   ├── qtv_thong_tin.js
│   │   │   │   ├── qtv_them_can_bo.js
│   │   │   │   ├── qtv_sua_can_bo.js
│   │   │   │   ├── qtv_them_sinh_vien.js
│   │   │   │   └── qtv_sua_sinh_vien.js
│   │   │   ├── auth/                # Trang xác thực
│   │   │   │   ├── trang_dang_nhap.js
│   │   │   │   ├── trang_dang_ky.js
│   │   │   │   ├── trang_quen_mat_khau.js
│   │   │   │   ├── trang_xac_nhan_email.js
│   │   │   │   └── trang_dat_lai_mat_khau.js
│   │   │   ├── canboquanly/         # Trang cán bộ quản lý
│   │   │   │   ├── cbql_trang_chu.js
│   │   │   │   ├── cbql_quan_ly_don_vi.js
│   │   │   │   ├── cbql_quan_ly_can_bo.js
│   │   │   │   ├── cbql_thong_tin.js
│   │   │   │   └── [các trang khác...]
│   │   │   └── sinhvien/            # Trang sinh viên
│   │   │       ├── sv_trang_chu.js
│   │   │       ├── sv_danh_sach_don_vi.js
│   │   │       ├── sv_danh_sach_can_bo.js
│   │   │       ├── sv_yeu_thich_don_vi.js
│   │   │       ├── sv_thong_tin.js
│   │   │       └── [các trang khác...]
│   │   ├── services/
│   │   │   └── api.js               # Cấu hình Axios
│   │   ├── styles/                  # Tệp CSS
│   │   │   ├── app.css
│   │   │   ├── base.css
│   │   │   ├── buttons.css
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── toast.css
│   │   │   └── [các tệp CSS khác...]
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── build/                       # Build production
│   └── package.json
│
├── avt/                             # Thư mục ảnh đại diện
├── ql_thuctap.sql                   # Script cơ sở dữ liệu
├── package.json                     # Phụ thuộc chung
├── README.md                        # Hướng dẫn thiết lập
└── PROJECT_INTRODUCTION.md          # File này

```

---

## 📊 Mô Hình Cơ Sở Dữ Liệu

### Bảng Chính

1. **don_vi** (Đơn vị thực tập)
   - `ma_don_vi` (PK): Mã đơn vị
   - `ten_don_vi`: Tên đơn vị
   - `dia_chi`: Địa chỉ
   - `so_dien_thoai`: Số điện thoại
   - `email_don_vi`: Email
   - `gioi_thieu`: Giới thiệu
   - `dieu_kien_thuc_tap`: Điều kiện thực tập
   - `hinh_anh`: Hình ảnh

2. **can_bo_huong_dan** (Cán bộ hướng dẫn)
   - `ma_can_bo` (PK): Mã cán bộ
   - `ho_ten`: Họ tên
   - `gioi_tinh`: Giới tính
   - `so_dien_thoai`: Số điện thoại
   - `email_can_bo`: Email
   - `chuc_vu`: Chức vụ
   - `chuyen_mon`: Chuyên môn
   - `ma_don_vi` (FK): Liên kết đơn vị

3. **admin** (Quản trị viên)
   - `id` (PK): ID
   - `username`: Tên đăng nhập
   - `password_hash`: Mật khẩu hash
   - `email_admin`: Email

4. **can_bo_quan_ly** (Cán bộ quản lý)
   - `id` (PK): ID
   - `username`: Tên đăng nhập
   - `password_hash`: Mật khẩu hash
   - `ho_ten`: Họ tên
   - `email_can_bo`: Email

5. **sinh_vien** (Sinh viên)
   - `id` (PK): ID
   - `username`: Tên đăng nhập
   - `password_hash`: Mật khẩu hash
   - `ho_ten`: Họ tên
   - `email_sinh_vien`: Email

---

## 👥 Phân Quyền và Vai Trò

### 1. Quản Trị Viên (Admin)
**Quyền hạn:**
- Xem thống kê tổng số tài khoản (Admin, Cán bộ, Sinh viên)
- Quản lý cán bộ quản lý (Thêm, Sửa, Xóa)
- Quản lý sinh viên (Thêm, Sửa, Xóa)
- Xem thông tin cá nhân và chỉnh sửa mật khẩu
- Quản lý tất cả dữ liệu hệ thống

**Tài khoản test:**
- Username: `admin1`
- Password: `admin123`

### 2. Cán Bộ Quản Lý
**Quyền hạn:**
- Xem danh sách đơn vị thực tập (bảng, tìm kiếm, lọc)
- Quản lý đơn vị (Thêm, Sửa, Xóa, Upload hình ảnh)
- Xem danh sách cán bộ hướng dẫn (bảng, tìm kiếm, lọc)
- Quản lý cán bộ hướng dẫn (Thêm, Sửa, Xóa)
- Xem thông tin cá nhân và chỉnh sửa mật khẩu

**Tài khoản test:**
- Username: `canbo1`
- Password: `canbo123`

### 3. Sinh Viên
**Quyền hạn:**
- Xem danh sách đơn vị thực tập (bảng, tìm kiếm, lọc)
- Xem chi tiết đơn vị thực tập
- Xem danh sách cán bộ hướng dẫn (bảng, tìm kiếm, lọc)
- Xem chi tiết cán bộ hướng dẫn
- Quản lý danh sách yêu thích đơn vị
- Xem thông tin cá nhân

**Tài khoản test:**
- Username: `sinhvien1`
- Password: `sv123456`

---

## 🔐 Tính Năng Bảo Mật

### Xác Thực
- **JWT (JSON Web Token):** Sử dụng JWT để bảo vệ các API
- **Mã hóa mật khẩu:** Sử dụng bcryptjs để hash mật khẩu
- **Protected Routes:** Các tuyến yêu cầu xác thực

### Quên Mật Khẩu
- Gửi email xác nhận
- Tạo token khôi phục
- Đặt lại mật khẩu an toàn
- Xác thực email

### Middleware
- `auth.js`: Xác thực JWT cho các endpoint được bảo vệ

---

## 🚀 Các Tính Năng Chính

### 1. Quản Lý Đơn Vị
- ✅ Xem danh sách đơn vị
- ✅ Tìm kiếm và lọc đơn vị
- ✅ Xem chi tiết đơn vị
- ✅ Thêm đơn vị mới (Cán bộ/Admin)
- ✅ Chỉnh sửa thông tin đơn vị
- ✅ Xóa đơn vị
- ✅ Upload hình ảnh đơn vị

### 2. Quản Lý Cán Bộ Hướng Dẫn
- ✅ Xem danh sách cán bộ
- ✅ Tìm kiếm và lọc cán bộ
- ✅ Xem chi tiết cán bộ
- ✅ Thêm cán bộ mới
- ✅ Chỉnh sửa thông tin cán bộ
- ✅ Xóa cán bộ

### 3. Quản Lý Sinh Viên (Admin)
- ✅ Xem danh sách sinh viên
- ✅ Thêm sinh viên mới
- ✅ Chỉnh sửa thông tin sinh viên
- ✅ Xóa sinh viên

### 4. Quản Lý Tài Khoản Cán Bộ (Admin)
- ✅ Xem danh sách cán bộ quản lý
- ✅ Thêm cán bộ quản lý
- ✅ Chỉnh sửa cán bộ quản lý
- ✅ Xóa cán bộ quản lý

### 5. Mục Yêu Thích (Sinh Viên)
- ✅ Thêm đơn vị vào yêu thích
- ✅ Xóa đơn vị khỏi yêu thích
- ✅ Xem danh sách yêu thích
- ✅ Quản lý yêu thích

### 6. Xác Thực & Bảo Mật
- ✅ Đăng ký tài khoản
- ✅ Đăng nhập
- ✅ Xác thực email
- ✅ Quên mật khẩu
- ✅ Đặt lại mật khẩu
- ✅ Quản lý phiên đăng nhập

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /dang-ky` - Đăng ký
- `POST /dang-nhap` - Đăng nhập
- `POST /logout` - Đăng xuất
- `GET /me` - Lấy thông tin user hiện tại

### Đơn Vị Routes (`/api/don_vi`)
- `GET /` - Lấy danh sách đơn vị
- `GET /:id` - Lấy chi tiết đơn vị
- `POST /` - Tạo đơn vị (Cán bộ/Admin)
- `PUT /:id` - Cập nhật đơn vị
- `DELETE /:id` - Xóa đơn vị

### Cán Bộ Hướng Dẫn Routes (`/api/can_bo_huong_dan`)
- `GET /` - Lấy danh sách cán bộ
- `GET /:id` - Lấy chi tiết cán bộ
- `POST /` - Tạo cán bộ
- `PUT /:id` - Cập nhật cán bộ
- `DELETE /:id` - Xóa cán bộ

### Cán Bộ Quản Lý Routes (`/api/can_bo_quan_ly`)
- `GET /` - Lấy danh sách (Admin)
- `POST /` - Tạo cán bộ (Admin)
- `PUT /:id` - Cập nhật cán bộ (Admin)
- `DELETE /:id` - Xóa cán bộ (Admin)

### Sinh Viên Routes (`/api/sinh_vien`)
- `GET /` - Lấy danh sách (Admin)
- `POST /` - Tạo sinh viên (Admin)
- `PUT /:id` - Cập nhật sinh viên (Admin)
- `DELETE /:id` - Xóa sinh viên (Admin)

### Mục Yêu Thích Routes (`/api/yeu_thich`)
- `GET /` - Lấy danh sách yêu thích
- `POST /` - Thêm vào yêu thích
- `DELETE /:donViId` - Xóa khỏi yêu thích

### Quên Mật Khẩu Routes (`/api/quen-mat-khau`)
- `POST /request` - Yêu cầu đặt lại mật khẩu
- `POST /verify` - Xác thực email
- `POST /reset` - Đặt lại mật khẩu

---

## 🛠️ Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn
- MySQL Server (v8.0 hoặc cao hơn)

### 1. Cài Đặt Cơ Sở Dữ Liệu

```bash
# Kết nối MySQL
mysql -u root -p

# Chạy script
source ql_thuctap.sql;
```

Hoặc nhập file `ql_thuctap.sql` vào MySQL Workbench/phpMyAdmin

### 2. Cài Đặt Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=ql_thuctap
# DB_PORT=3306
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000
# NODE_ENV=development

# Chạy backend
npm start              # Production
npm run dev            # Development (với nodemon)
```

Backend sẽ chạy tại: `http://localhost:5000`

### 3. Cài Đặt Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env
# REACT_APP_API_URL=http://localhost:5000/api

# Chạy frontend
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

---

## 🧪 Tài Khoản Kiểm Thử

| Vai Trò | Username | Password | Ghi Chú |
|---------|----------|----------|--------|
| Admin | `admin1` | `admin123` | Quản trị viên hệ thống |
| Cán bộ quản lý | `canbo1` | `admin123` | Quản lý đơn vị và cán bộ |
| Sinh viên | `sinhvien1` | `sv123456` | Xem danh sách và yêu thích |

---

## 📝 Ghi Chú Thêm

### Tính Năng Nâng Cao
- **Real-time Notifications:** Có thể tích hợp WebSocket cho thông báo real-time
- **Advanced Filtering:** Lọc nâng cao trên multiple fields
- **CSV Export:** Xuất dữ liệu ra CSV
- **Email Notifications:** Gửi email cho các sự kiện quan trọng
- **Activity Logging:** Ghi lại lịch sử hoạt động

### Cấu Trúc File Upload
- `backend/uploads/` - Lưu trữ hình ảnh đơn vị và avatar
- Endpoint: `/uploads/:filename`

### Xử Lý Lỗi
- Middleware xử lý lỗi tập trung
- Error logging cho debugging
- Custom error messages cho client

### Performance
- Connection pooling cho MySQL (10 kết nối)
- Caching có thể được thêm vào
- Pagination cho danh sách lớn

---

## 📚 Tài Liệu Liên Quan

- [README.md](README.md) - Hướng dẫn thiết lập chi tiết
- [HUONG_DAN_QUEN_MAT_KHAU.md](HUONG_DAN_QUEN_MAT_KHAU.md) - Hướng dẫn quên mật khẩu
- [FORGOT_PASSWORD_SUMMARY.md](FORGOT_PASSWORD_SUMMARY.md) - Tóm tắt chức năng quên mật khẩu

---

## 🎓 Kết Luận

Hệ thống Quản Lý Thực Tập CNTT là một giải pháp toàn diện cho phép các sinh viên, cán bộ và quản trị viên quản lý thông tin thực tập một cách hiệu quả. Với kiến trúc Full-Stack hiện đại, bảo mật vắng chắc, và giao diện người dùng thân thiện, hệ thống đáp ứng các yêu cầu của các trường đại học trong quản lý thực tập.

---

**Cập nhật lần cuối:** Tháng 12, 2024
