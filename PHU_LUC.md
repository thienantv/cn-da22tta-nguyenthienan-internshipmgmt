# PHỤ LỤC

---

# PHỤ LỤC A – DANH SÁCH API BACKEND CỦA HỆ THỐNG

## A.1 API Xác Thực

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| POST | `/api/auth/login` | Đăng nhập và cấp token JWT |
| POST | `/api/auth/register` | Đăng ký tài khoản mới |
| GET | `/api/auth/me` | Lấy thông tin người dùng hiện tại |

---

## A.2 API Quản Lý Sinh Viên

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/sinh_vien` | Lấy danh sách sinh viên (chỉ admin) |
| GET | `/api/sinh_vien/:id` | Lấy thông tin chi tiết sinh viên |
| POST | `/api/sinh_vien` | Thêm sinh viên mới (chỉ admin) |
| PUT | `/api/sinh_vien/:id` | Cập nhật thông tin sinh viên |
| DELETE | `/api/sinh_vien/:id` | Xóa sinh viên (chỉ admin) |

---

## A.3 API Quản Lý Cán Bộ Quản Lý

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/can_bo_quan_ly` | Lấy danh sách cán bộ quản lý (chỉ admin) |
| GET | `/api/can_bo_quan_ly/:id` | Lấy thông tin chi tiết cán bộ quản lý |
| POST | `/api/can_bo_quan_ly` | Thêm cán bộ quản lý mới (chỉ admin) |
| PUT | `/api/can_bo_quan_ly/:id` | Cập nhật thông tin cán bộ quản lý |
| DELETE | `/api/can_bo_quan_ly/:id` | Xóa cán bộ quản lý (chỉ admin) |

---

## A.4 API Quản Lý Cán Bộ Hướng Dẫn

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/can_bo_huong_dan` | Lấy danh sách cán bộ hướng dẫn |
| GET | `/api/can_bo_huong_dan/:maCanBo` | Lấy thông tin chi tiết cán bộ hướng dẫn |
| GET | `/api/can_bo_huong_dan/search` | Tìm kiếm cán bộ hướng dẫn |
| POST | `/api/can_bo_huong_dan` | Thêm cán bộ hướng dẫn mới (chỉ cán bộ quản lý) |
| PUT | `/api/can_bo_huong_dan/:maCanBo` | Cập nhật cán bộ hướng dẫn (chỉ cán bộ quản lý) |
| DELETE | `/api/can_bo_huong_dan/:maCanBo` | Xóa cán bộ hướng dẫn (chỉ cán bộ quản lý) |

---

## A.5 API Quản Lý Đơn Vị Thực Tập

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/don_vi` | Lấy danh sách đơn vị thực tập (công khai) |
| GET | `/api/don_vi/:maDonVi` | Lấy thông tin chi tiết đơn vị |
| GET | `/api/don_vi/search` | Tìm kiếm đơn vị thực tập (công khai) |
| POST | `/api/don_vi` | Thêm đơn vị mới (chỉ cán bộ quản lý) |
| POST | `/api/don_vi/upload` | Upload ảnh đơn vị (chỉ cán bộ quản lý) |
| PUT | `/api/don_vi/:maDonVi` | Cập nhật đơn vị (chỉ cán bộ quản lý) |
| DELETE | `/api/don_vi/:maDonVi` | Xóa đơn vị (chỉ cán bộ quản lý) |

---

## A.6 API Quản Trị Viên

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/admin/thong_ke` | Lấy thống kê tổng quan (chỉ admin) |
| GET | `/api/admin/list-admin` | Lấy danh sách quản trị viên (chỉ admin) |
| GET | `/api/admin/list-can-bo` | Lấy danh sách cán bộ quản lý (chỉ admin) |
| GET | `/api/admin/list-sinh-vien` | Lấy danh sách sinh viên (chỉ admin) |
| GET | `/api/admin/profile/:id` | Lấy thông tin chi tiết quản trị viên (chỉ admin) |
| PUT | `/api/admin/:id` | Cập nhật thông tin quản trị viên (chỉ admin) |

---

## A.7 API Yêu Thích

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| POST | `/api/yeu_thich/toggle` | Thêm/xóa đơn vị yêu thích (chỉ sinh viên) |
| GET | `/api/yeu_thich/check/:ma_don_vi` | Kiểm tra đơn vị có yêu thích hay không (chỉ sinh viên) |
| GET | `/api/yeu_thich/danh-sach` | Lấy danh sách yêu thích của sinh viên (chỉ sinh viên) |
| GET | `/api/yeu_thich/count/:ma_don_vi` | Lấy số lượng yêu thích của đơn vị (chỉ sinh viên) |
| POST | `/api/yeu_thich/batch-check` | Kiểm tra trạng thái yêu thích cho nhiều đơn vị (chỉ sinh viên) |

---

## A.8 API Quên Mật Khẩu

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| POST | `/api/quen-mat-khau/buoc-1` | Kiểm tra tên đăng nhập |
| POST | `/api/quen-mat-khau/buoc-2` | Xác nhận email |
| POST | `/api/quen-mat-khau/buoc-3` | Gửi email đặt lại mật khẩu |
| GET | `/api/quen-mat-khau/verify-token/:token` | Xác thực token đặt lại mật khẩu |
| POST | `/api/quen-mat-khau/buoc-4` | Đặt lại mật khẩu mới |

---

## A.9 API Kiểm Tra Sức Khỏe Server

| Phương thức | Đường dẫn | Mô tả |
|:---:|:---|:---|
| GET | `/api/health` | Kiểm tra trạng thái server |

---

# PHỤ LỤC B – HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY HỆ THỐNG

## B.1 Yêu Cầu Môi Trường

- **Node.js**: Phiên bản 14.0 hoặc cao hơn
- **npm**: Phiên bản 6.0 hoặc cao hơn
- **MySQL**: Phiên bản 5.7 hoặc cao hơn (hoặc MariaDB tương đương)
- **Trình duyệt web**: Chrome, Firefox, Safari, Edge (phiên bản gần đây)
- **Công cụ bổ sung** (tùy chọn):
  - Postman hoặc Insomnia: để kiểm tra API
  - MySQL Workbench hoặc phpMyAdmin: để quản lý cơ sở dữ liệu
  - Visual Studio Code: để chỉnh sửa mã nguồn

---

## B.2 Cài Đặt Cơ Sở Dữ Liệu

### Bước 1: Kết nối MySQL

Mở MySQL Command Line Client hoặc công cụ quản lý cơ sở dữ liệu:

```bash
mysql -u root -p
```

(Nhập mật khẩu nếu có)

### Bước 2: Import File SQL

Chạy file SQL để tạo cơ sở dữ liệu và bảng dữ liệu:

```bash
mysql -u root -p < ql_thuctap.sql
```

Hoặc sử dụng MySQL Workbench/phpMyAdmin: vào menu File → Import, chọn file `ql_thuctap.sql`.

### Bước 3: Kiểm Tra Cơ Sở Dữ Liệu

Sau khi import thành công, kiểm tra database `ql_thuctap` đã được tạo:

```bash
mysql -u root -p -e "SHOW DATABASES;"
```

Cơ sở dữ liệu bao gồm các bảng:
- `admin`: Quản trị viên
- `can_bo_quan_ly`: Cán bộ quản lý
- `can_bo_huong_dan`: Cán bộ hướng dẫn
- `sinh_vien`: Sinh viên
- `don_vi`: Đơn vị thực tập
- `yeu_thich`: Danh sách yêu thích

---

## B.3 Cài Đặt và Chạy Backend

### Bước 1: Điều Hướng vào Thư Mục Backend

```bash
cd backend
```

### Bước 2: Cài Đặt Thư Viện Phụ Thuộc

```bash
npm install
```

### Bước 3: Cấu Hình Biến Môi Trường

Tạo file `.env` trong thư mục `backend` với nội dung:

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

**Lưu ý**: Cấu hình `DB_USER`, `DB_PASSWORD` phải khớp với thông tin MySQL trên máy của bạn.

### Bước 4: Chạy Server Backend

**Chế độ Production:**
```bash
npm start
```

**Chế độ Development** (tự động reload khi thay đổi code):
```bash
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**

Kiểm tra:
```bash
curl http://localhost:5000/api/health
```

---

## B.4 Cài Đặt và Chạy Frontend

### Bước 1: Điều Hướng vào Thư Mục Frontend

```bash
cd frontend
```

### Bước 2: Cài Đặt Thư Viện Phụ Thuộc

```bash
npm install
```

### Bước 3: Cấu Hình Biến Môi Trường

Tạo file `.env` trong thư mục `frontend` với nội dung:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Bước 4: Chạy Ứng Dụng Frontend

```bash
npm start
```

Frontend sẽ tự động mở trình duyệt tại: **http://localhost:3000**

---

## B.5 Tài Khoản Mẫu Để Đăng Nhập

### Quản Trị Viên (Admin)
| Trường | Giá trị |
|:---|:---|
| **Tên đăng nhập** | `admin1` |
| **Mật khẩu** | `admin123` |
| **Vai trò** | Quản trị viên hệ thống |

### Cán Bộ Quản Lý
| Trường | Giá trị |
|:---|:---|
| **Tên đăng nhập** | `canbo1` |
| **Mật khẩu** | `admin123` |
| **Vai trò** | Cán bộ quản lý đơn vị |

### Sinh Viên
| Trường | Giá trị |
|:---|:---|
| **Tên đăng nhập** | `sinhvien1` |
| **Mật khẩu** | `sv123456` |
| **Vai trò** | Sinh viên |

---

## B.6 Danh Sách Đơn Vị Thực Tập Mẫu

Hệ thống đã có 41 đơn vị thực tập mẫu được import vào cơ sở dữ liệu, bao gồm:
- Các phòng ban của Trường Đại học Trà Vinh
- Các công ty công nghệ: FPT, VNPT, Cloud Air
- Các doanh nghiệp khác tại khu vực Trà Vinh và Thành phố Hồ Chí Minh

Danh sách đầy đủ có trong file `ql_thuctap.sql`.

---

# PHỤ LỤC C – TÀI KHOẢN MẪU VÀ PHÂN QUYỀN TRUY CẬP

## C.1 Các Loại Tài Khoản Trong Hệ Thống

### 1. Quản Trị Viên (Admin)

**Quyền hạn:**
- Xem tổng thể thống kê: tổng số quản trị viên, cán bộ quản lý, sinh viên
- Quản lý toàn bộ tài khoản cán bộ quản lý (thêm, sửa, xóa, xem chi tiết)
- Quản lý toàn bộ tài khoản sinh viên (thêm, sửa, xóa, xem chi tiết)
- Cập nhật thông tin cá nhân (email, mật khẩu)

**Mục đích:** Cấp cao nhất, quản lý toàn bộ hệ thống và phân công cho các cán bộ quản lý.

---

### 2. Cán Bộ Quản Lý (Can Bo Quan Ly)

**Quyền hạn:**
- Xem danh sách đơn vị thực tập (duyệt, tìm kiếm, lọc)
- Quản lý đơn vị thực tập (thêm, sửa, xóa, upload ảnh đơn vị)
- Xem danh sách cán bộ hướng dẫn (duyệt, tìm kiếm)
- Quản lý cán bộ hướng dẫn (thêm, sửa, xóa)
- Cập nhật thông tin cá nhân

**Mục đích:** Quản lý các đơn vị thực tập và cán bộ hướng dẫn tại từng đơn vị, hỗ trợ sinh viên tìm kiếm nơi thực tập.

---

### 3. Sinh Viên (Sinh Vien)

**Quyền hạn:**
- Xem danh sách đơn vị thực tập (duyệt, tìm kiếm, lọc)
- Xem chi tiết thông tin đơn vị (địa chỉ, điều kiện, cán bộ hướng dẫn)
- Thêm/bỏ đơn vị vào danh sách yêu thích
- Xem danh sách yêu thích của bản thân
- Xem danh sách cán bộ hướng dẫn và chi tiết
- Cập nhật thông tin cá nhân
- Đặt lại mật khẩu nếu quên

**Mục đích:** Tìm kiếm, lựa chọn nơi thực tập phù hợp và quản lý danh sách yêu thích cá nhân.

---

## C.2 Ma Trận Quyền Truy Cập

| Chức năng | Quản Trị Viên | Cán Bộ Quản Lý | Sinh Viên |
|:---|:---:|:---:|:---:|
| Xem thống kê hệ thống | ✓ | ✗ | ✗ |
| Quản lý cán bộ quản lý | ✓ | ✗ | ✗ |
| Quản lý sinh viên | ✓ | ✗ | ✗ |
| Xem danh sách đơn vị | ✓ | ✓ | ✓ |
| Thêm/sửa/xóa đơn vị | ✗ | ✓ | ✗ |
| Upload ảnh đơn vị | ✗ | ✓ | ✗ |
| Xem danh sách cán bộ hướng dẫn | ✗ | ✓ | ✓ |
| Quản lý cán bộ hướng dẫn | ✗ | ✓ | ✗ |
| Thêm/bỏ yêu thích | ✗ | ✗ | ✓ |
| Xem danh sách yêu thích | ✗ | ✗ | ✓ |
| Đặt lại mật khẩu | ✓ | ✓ | ✓ |
| Cập nhật thông tin cá nhân | ✓ | ✓ | ✓ |

---

## C.3 Ghi Chú Về Bảo Mật

- Tất cả API (trừ những API công khai như danh sách đơn vị, chi tiết đơn vị) đều yêu cầu xác thực bằng JWT token.
- Mật khẩu được mã hóa bằng bcryptjs trước khi lưu vào cơ sở dữ liệu.
- Các tài khoản mẫu nên được thay đổi mật khẩu trong môi trường sản xuất.
- Biến `JWT_SECRET` trong file `.env` cần được thay đổi thành một giá trị bí mật mạnh trong môi trường sản xuất.

---

**Hết Phụ Lục**
