# Hướng dẫn Cài đặt & Chạy Dự án

## Yêu cầu Hệ thống

- Node.js 14+ (lấy từ https://nodejs.org/)
- MySQL 5.7+ (lấy từ https://www.mysql.com/downloads/)
- Git (tùy chọn)
- Code Editor (VS Code, Sublime, etc.)

## Bước 1: Cài đặt MySQL & Setup Database

### 1.1 Cài đặt MySQL
- Tải MySQL từ https://www.mysql.com/downloads/
- Chạy installer và follow các bước
- Lưu root password (mặc định: trống "")
- Chạy MySQL Server

### 1.2 Setup Database
Mở command prompt/terminal và chạy:

```bash
mysql -u root -p < setup_database.sql
```

Nếu không có password, bỏ `-p`:
```bash
mysql -u root < setup_database.sql
```

Hoặc nếu muốn nhập từng lệnh, mở MySQL:
```bash
mysql -u root -p
```

Rồi copy toàn bộ content từ file `setup_database.sql` và paste vào MySQL console.

**Xác nhận**: Chạy lệnh này để kiểm tra database đã tạo:
```bash
mysql -u root -e "SHOW DATABASES;"
```

Sẽ thấy database `ql_thuctap` trong danh sách.

## Bước 2: Setup Backend (Node.js + Express)

### 2.1 Mở Terminal tại folder Backend

```bash
cd backend
```

### 2.2 Cài đặt Dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả packages theo `package.json`:
- express
- mysql2
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- nodemon (development)

### 2.3 Cấu hình .env

File `.env` đã có sẵn, kiểm tra nội dung:

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

Nếu MySQL có password, sửa `DB_PASSWORD=` thành `DB_PASSWORD=your_password`

### 2.4 Chạy Backend

**Development mode** (tự reload khi code thay đổi):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Khi chạy thành công, sẽ thấy:
```
✓ Kết nối MySQL thành công
✓ Backend server đang chạy tại http://localhost:5000
```

## Bước 3: Setup Frontend (React)

### 3.1 Mở Terminal tại folder Frontend (terminal khác)

```bash
cd frontend
```

### 3.2 Cài đặt Dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

Chờ quá trình cài đặt hoàn thành (có thể mất 5-10 phút lần đầu).

### 3.3 Cấu hình .env

File `.env` đã có sẵn:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Nếu backend chạy ở port khác, sửa lại URL.

### 3.4 Chạy Frontend

```bash
npm start
```

Browser sẽ tự mở tại `http://localhost:3000`

Nếu không mở tự động, truy cập https://localhost:3000 thủ công.

## Kiểm tra Lỗi Thường Gặp

### ❌ Lỗi: "Cannot find module 'mysql2'"
**Giải pháp**: 
```bash
cd backend
npm install mysql2
```

### ❌ Lỗi: "EADDRINUSE: address already in use :::5000"
**Giải pháp**: Port 5000 đang bị dùng. Dừng process khác hoặc đổi PORT trong `.env`

### ❌ Lỗi: "Access denied for user 'root'@'localhost'"
**Giải pháp**: Kiểm tra `DB_USER` và `DB_PASSWORD` trong `.env` có đúng không

### ❌ Lỗi: "Unknown database 'ql_thuctap'"
**Giải pháp**: Chạy lại `setup_database.sql` để tạo database

### ❌ Lỗi: "npm: command not found"
**Giải pháp**: Node.js chưa cài đặt hoặc chưa thêm vào PATH. Cài đặt lại Node.js

## Test Ứng dụng

### 1. Test Backend API

Mở Postman hoặc cURL, test endpoint:

```bash
curl http://localhost:5000/api/health
```

Sẽ trả về:
```json
{"message":"Server is running"}
```

### 2. Test Đăng nhập

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "password": "admin123",
    "role": "admin"
  }'
```

Sẽ trả về access token.

### 3. Test Frontend

Truy cập http://localhost:3000

**Đăng nhập**:
- Username: `admin1`
- Password: `admin123`
- Role: `Admin`

Sẽ chuyển hướng đến trang chủ Admin.

## Cấu trúc Thư mục

```
QL_ThucTap/
├── backend/
│   ├── config/db.js           ← MySQL connection
│   ├── controllers/           ← Business logic
│   ├── middleware/            ← JWT auth
│   ├── routes/                ← API endpoints
│   ├── server.js              ← Main file
│   ├── .env                   ← Database config
│   └── package.json
│
├── frontend/
│   ├── public/index.html      ← HTML template
│   ├── src/
│   │   ├── pages/             ← React pages
│   │   ├── components/        ← Reusable components
│   │   ├── services/api.js    ← API calls
│   │   ├── styles/            ← CSS files
│   │   ├── App.js             ← Main component
│   │   └── index.js           ← Entry point
│   ├── .env                   ← API URL config
│   └── package.json
│
├── setup_database.sql         ← Database script
└── README.md
```

## Tài khoản Test

| Role | Username | Password |
|------|----------|----------|
| Admin | admin1 | admin123 |
| Cán bộ | canbo1 | admin123 |
| Sinh viên | sinhvien1 | sinhvien123 |

## Phát triển Tiếp tục

### Thêm trang mới
1. Tạo component `.js` trong `frontend/src/pages/`
2. Thêm import trong `App.js`
3. Thêm route trong `App.js`

### Thêm API endpoint
1. Tạo controller trong `backend/controllers/`
2. Tạo route trong `backend/routes/`
3. Import route trong `server.js`

### Chỉnh sửa CSS
- File CSS trong `frontend/src/styles/`
- Global CSS trong `index.css`
- Component CSS cùng tên component

## Production Deployment

### Backend
1. Đổi `NODE_ENV=development` thành `production` trong `.env`
2. Đổi `JWT_SECRET` thành string ngẫu nhiên dài
3. Deploy lên server (Heroku, Render, AWS, etc.)

### Frontend
```bash
cd frontend
npm run build
```

Build output sẽ trong folder `build/`, deploy lên hosting (Vercel, Netlify, etc.)

## Support & Debug

### Log chi tiết
- Backend: Kiểm tra terminal chạy `npm run dev`
- Frontend: Mở F12 → Console tab
- Database: Kiểm tra MySQL logs

### Xóa cache
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

✅ Hoàn tất! Dự án sẵn sàng phát triển.

Có câu hỏi? Kiểm tra README.md hoặc debug qua browser console (F12).
