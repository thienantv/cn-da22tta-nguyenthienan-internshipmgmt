# 🔐 HƯỚNG DẪN TRIỂN KHAI CHỨC NĂNG QUÊN MẬT KHẨU

## 📌 TỔNG QUAN

Chức năng quên mật khẩu được triển khai theo 5 bước:
1. ✅ Nhập username
2. ✅ Xác nhận email
3. ✅ Gửi email reset
4. ✅ Xác thực token
5. ✅ Đặt lại mật khẩu

---

## 🔧 CẤU HÌNH BACKEND

### Bước 1: Chạy Migration SQL

Chạy file `ql_thuctap_migrations.sql` để tạo các bảng cần thiết:

```sql
-- Chạy lệnh này trên MySQL
source ql_thuctap_migrations.sql
```

**Hoặc copy-paste các lệnh CREATE TABLE từ file vào MySQL Workbench**

### Bước 2: Cấu Hình Environment Variables

Tạo/Cập nhật file `.env` ở thư mục `backend/`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ql_thuctap

# JWT
JWT_SECRET=your_very_secret_key_here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # Không phải mật khẩu Gmail thông thường!

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Server
PORT=5000
```

**⚠️ QUAN TRỌNG: Để sử dụng Gmail, bạn cần:**
1. Bật "2-Step Verification" trong Google Account
2. Tạo "App Password" tại https://myaccount.google.com/apppasswords
3. Sử dụng mật khẩu ứng dụng (16 ký tự) thay vì mật khẩu Gmail thực

### Bước 3: Cài Đặt Package nodemailer

```bash
cd backend
npm install nodemailer
```

### Bước 4: Kiểm Tra File Backend

File `backend/controllers/QuenMatKhauController.js` đã được tạo với:
- ✅ Hàm kiểm tra username
- ✅ Hàm xác nhận email
- ✅ Hàm gửi email (dùng nodemailer)
- ✅ Hàm xác thực token JWT
- ✅ Hàm đặt lại mật khẩu

File `backend/routes/QuenMatKhauRoutes.js` định tuyến các endpoint

---

## 💻 CẤU HÌNH FRONTEND

### Bước 1: Kiểm Tra File Frontend

Các file đã được tạo:
- ✅ `frontend/src/pages/auth/trang_quen_mat_khau.js` (Bước 1)
- ✅ `frontend/src/pages/auth/trang_xac_nhan_email.js` (Bước 2)
- ✅ `frontend/src/pages/auth/trang_dat_lai_mat_khau.js` (Bước 4)

### Bước 2: Cập Nhật API URL

File `.env` hoặc `.env.local` ở `frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Bước 3: Các Routes Đã Được Thêm

Trang đăng nhập (`trang_dang_nhap.js`) đã có link "Quên mật khẩu"

Routes trong `App.js`:
- `/quen-mat-khau` → Nhập username
- `/quen-mat-khau/xac-nhan-email` → Xác nhận email
- `/dat-lai-mat-khau` → Đặt lại mật khẩu

---

## 🔄 LUỒNG HOẠT ĐỘNG CHI TIẾT

### Bước 1: Nhập Username

**Request:**
```
POST /api/quen-mat-khau/buoc-1
Body: { username: "canbo1" }
```

**Response (Thành Công):**
```json
{
  "message": "Username được tìm thấy. Vui lòng tiếp tục với email xác nhận",
  "sessionToken": "abcd1234...",
  "step": 2
}
```

**Response (Lỗi):**
```json
{
  "message": "Username hoặc email không tồn tại trong hệ thống"
}
```

**Backend Logic:**
- Kiểm tra username trong 3 bảng: admin, can_bo_quan_ly, sinh_vien
- Tạo session token tạm thời (30 phút)
- Lưu vào bảng `forgot_password_sessions`

---

### Bước 2: Xác Nhận Email

**Request:**
```
POST /api/quen-mat-khau/buoc-2
Body: { 
  sessionToken: "abcd1234...",
  email: "canbo1@example.com"
}
```

**Response (Thành Công):**
```json
{
  "message": "Email xác nhận thành công",
  "step": 3,
  "sessionToken": "abcd1234..."
}
```

**Response (Lỗi):**
```json
{
  "message": "Email không khớp với tài khoản"
}
```

**Backend Logic:**
- Xác thực session token
- Kiểm tra email khớp với user
- Cập nhật session: `step = 3`
- Tự động chuyển sang bước 3

---

### Bước 3: Gửi Email Reset

**Request:**
```
POST /api/quen-mat-khau/buoc-3
Body: {
  sessionToken: "abcd1234...",
  email: "canbo1@example.com"
}
```

**Response:**
```json
{
  "message": "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn",
  "step": 4
}
```

**Backend Logic:**
- Kiểm tra giới hạn gửi email (max 5 lần/1 giờ)
- Tạo JWT reset token (15 phút)
- Lưu token vào bảng `password_reset_tokens`
- Gửi email với link reset (bất đồng bộ)
- Email chứa link: `https://domain.com/dat-lai-mat-khau?token=xxxxx`

---

### Bước 4: Xác Thực Token (Khi Truy Cập Link)

**Request:**
```
GET /api/quen-mat-khau/verify-token/{token}
```

**Response (Hợp Lệ):**
```json
{
  "message": "Token hợp lệ",
  "userId": 1,
  "userType": "can_bo_quan_ly",
  "email": "canbo1@example.com"
}
```

**Response (Hết Hạn):**
```json
{
  "message": "Token đã hết hạn"
}
```

---

### Bước 5: Đặt Lại Mật Khẩu

**Request:**
```
POST /api/quen-mat-khau/buoc-4
Body: {
  token: "eyJhbGc...",
  newPassword: "newpass123",
  confirmPassword: "newpass123"
}
```

**Response (Thành Công):**
```json
{
  "message": "Đặt lại mật khẩu thành công. Vui lòng đăng nhập với mật khẩu mới"
}
```

**Backend Logic:**
- Xác thực JWT token
- Kiểm tra token trong DB (chưa sử dụng, chưa hết hạn)
- Hash mật khẩu mới với bcrypt
- Cập nhật password_hash cho user
- Đánh dấu token đã sử dụng (`is_used = true`)

---

## 🔒 BẢO MẬT

### Các Biện Pháp An Toàn Được Triển Khai

✅ **Không Tiết Lộ Thông Tin:**
- Thông báo lỗi chung cho cả trường hợp username không tồn tại

✅ **Rate Limiting:**
- Giới hạn tối đa 5 email reset/1 giờ trên mỗi email
- Lock tài khoản 1 giờ nếu vượt quá

✅ **Token An Toàn:**
- JWT token chỉ có hiệu lực 15 phút
- Token chỉ dùng một lần (`is_used` flag)
- Session token lưu trong sessionStorage (không localStorage)

✅ **Hash Mật Khẩu:**
- Dùng bcrypt 10 rounds để hash mật khẩu mới

✅ **HTTPS:**
- Email reset link phải qua HTTPS trên production

---

## 🧪 KIỂM TRA & DEBUG

### 1. Kiểm Tra Database

```sql
-- Xem các session đang hoạt động
SELECT * FROM forgot_password_sessions WHERE is_active = true;

-- Xem các token reset
SELECT * FROM password_reset_tokens WHERE is_used = false;

-- Xem số lần gửi email
SELECT * FROM reset_email_attempts;
```

### 2. Log Backend

Tất cả các lỗi đều được ghi log ở console/file, kiểm tra:
- `console.error()` trong `QuenMatKhauController.js`

### 3. Test Endpoints

Dùng Postman/Insomnia:

```
1. POST http://localhost:5000/api/quen-mat-khau/buoc-1
   { "username": "canbo1" }

2. POST http://localhost:5000/api/quen-mat-khau/buoc-2
   { "sessionToken": "xxx", "email": "canbo1@tvu.edu.vn" }

3. POST http://localhost:5000/api/quen-mat-khau/buoc-3
   { "sessionToken": "xxx", "email": "canbo1@tvu.edu.vn" }

4. GET http://localhost:5000/api/quen-mat-khau/verify-token/eyJ...

5. POST http://localhost:5000/api/quen-mat-khau/buoc-4
   { "token": "eyJ...", "newPassword": "newpass123", "confirmPassword": "newpass123" }
```

---

## 📝 CÁC THAY ĐỔI HỆ THỐNG

### Backend

| File | Thay Đổi |
|------|----------|
| `server.js` | Thêm route `quenMatKhauRoutes` |
| Controllers | Tạo `QuenMatKhauController.js` |
| Routes | Tạo `QuenMatKhauRoutes.js` |
| Database | Thêm 3 bảng mới (migration SQL) |

### Frontend

| File | Thay Đổi |
|------|----------|
| `App.js` | Thêm 3 routes mới cho quên mật khẩu |
| `services/api.js` | Thêm `quenMatKhauService` |
| `trang_dang_nhap.js` | Thêm link "Quên mật khẩu" |
| Pages | Tạo 3 pages mới |

---

## 🚀 TRIỂN KHAI PRODUCTION

### 1. Database

```bash
# Backup database trước
mysqldump -u root -p ql_thuctap > backup.sql

# Chạy migration
mysql -u root -p ql_thuctap < ql_thuctap_migrations.sql
```

### 2. Environment

Đặt các biến environment đúng:
```
FRONTEND_URL=https://your-domain.com
EMAIL_USER=your-smtp-email
EMAIL_PASSWORD=app-password
JWT_SECRET=strong-random-secret
```

### 3. Email Service

Nếu không dùng Gmail:
- Đổi `transporter` config trong `QuenMatKhauController.js`
- Sử dụng SendGrid, Mailgun, AWS SES, v.v.

### 4. HTTPS

Link reset trong email PHẢI là HTTPS trên production

---

## ❓ FAQ

**Q: Reset token lưu ở đâu?**
A: Lưu trong bảng `password_reset_tokens` với thời gian hết hạn 15 phút

**Q: Session token là gì?**
A: Mã tạm thời để liên kết các bước 1→2→3, tồn tại 30 phút, không dùng JWT

**Q: Email không được gửi, sao?**
A: Kiểm tra `EMAIL_USER`, `EMAIL_PASSWORD`, hoặc bật "Less secure apps" nếu dùng Gmail

**Q: Token hết hạn, người dùng phải làm gì?**
A: Bắt đầu lại từ trang quên mật khẩu (30 phút cho toàn bộ quy trình)

**Q: Có thể đặt lại mật khẩu mà không cần email không?**
A: Không, bắt buộc phải xác nhận email để đảm bảo bảo mật

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:
1. Kiểm tra logs backend: `console.error()`
2. Kiểm tra database: các bảng có dữ liệu?
3. Kiểm tra config: `.env` có đúng không?
4. Kiểm tra network: request có đến backend?

---

**✅ Triển khai xong! Chúc bạn thành công! 🎉**
