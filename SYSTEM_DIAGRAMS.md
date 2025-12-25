# Sơ Đồ Hệ Thống Quản Lý Thực Tập

## 1. BIỂU ĐỒ USE CASE

### 1.1 Use Case - Sinh Viên (Student)
```mermaid
graph TB
    SV[Sinh Viên]
    
    SV -->|UC1| DK["Đăng Ký Tài Khoản"]
    SV -->|UC2| DN["Đăng Nhập"]
    SV -->|UC3| XDV["Xem Danh Sách Đơn Vị"]
    SV -->|UC4| XCD["Xem Chi Tiết Đơn Vị"]
    SV -->|UC5| QL["Xem Danh Sách Cán Bộ<br/>Hướng Dẫn"]
    SV -->|UC6| YTDV["Yêu Thích / Like Đơn Vị"]
    SV -->|UC7| XYT["Xem Danh Sách Yêu Thích"]
    SV -->|UC8| CT["Cập Nhật Thông Tin<br/>Cá Nhân"]
    
    style SV fill:#e1f5ff
    style DK fill:#fff9c4
    style DN fill:#fff9c4
    style XDV fill:#f3e5f5
    style XCD fill:#f3e5f5
    style QL fill:#f3e5f5
    style YTDV fill:#c8e6c9
    style XYT fill:#f3e5f5
    style CT fill:#fff9c4
```

### 1.2 Use Case - Cán Bộ Quản Lý (Management Staff)
```mermaid
graph TB
    CBQL[Cán Bộ Quản Lý]
    
    CBQL -->|UC1| DN["Đăng Nhập"]
    CBQL -->|UC2| QLSVi["Quản Lý Sinh Viên<br/>(Thêm/Sửa/Xóa)"]
    CBQL -->|UC3| XLDV["Xem Danh Sách Đơn Vị"]
    CBQL -->|UC4| QLDV["Quản Lý Đơn Vị<br/>(Thêm/Sửa/Xóa)"]
    CBQL -->|UC5| QLCB["Quản Lý Cán Bộ<br/>Hướng Dẫn"]
    CBQL -->|UC6| CT["Cập Nhật Thông Tin<br/>Cá Nhân"]
    
    style CBQL fill:#ffccbc
    style DN fill:#fff9c4
    style QLSVi fill:#ffccbc
    style XLDV fill:#f3e5f5
    style QLDV fill:#ffccbc
    style QLCB fill:#ffccbc
    style CT fill:#fff9c4
```

### 1.3 Use Case - Quản Trị Viên (Administrator)
```mermaid
graph TB
    QTV[Quản Trị Viên]
    
    QTV -->|UC1| DN["Đăng Nhập"]
    QTV -->|UC2| QLSV["Quản Lý Sinh Viên<br/>(Thêm/Sửa/Xóa)"]
    QTV -->|UC3| QLDV["Quản Lý Đơn Vị<br/>(Thêm/Sửa/Xóa)"]
    QTV -->|UC4| QLCB["Quản Lý Cán Bộ<br/>Hướng Dẫn"]
    QTV -->|UC5| QLCBQL["Quản Lý Cán Bộ<br/>Quản Lý"]
    QTV -->|UC6| TKHONG["Xem Thống Kê &<br/>Báo Cáo"]
    QTV -->|UC7| QLUP["Quản Lý Upload Ảnh"]
    
    style QTV fill:#c5cae9
    style DN fill:#fff9c4
    style QLSV fill:#ffccbc
    style QLDV fill:#ffccbc
    style QLCB fill:#ffccbc
    style QLCBQL fill:#ffccbc
    style TKHONG fill:#b2dfdb
    style QLUP fill:#fff9c4
```

### 1.4 Use Case - Cán Bộ Hướng Dẫn (Supervisor)
```mermaid
graph TB
    CBHD[Cán Bộ Hướng Dẫn]
    
    CBHD -->|UC1| DN["Đăng Nhập"]
    CBHD -->|UC2| XDV["Xem Danh Sách Đơn Vị<br/>của mình"]
    CBHD -->|UC3| XSV["Xem Danh Sách Sinh Viên<br/>Thực Tập"]
    CBHD -->|UC4| CT["Cập Nhật Thông Tin<br/>Cá Nhân"]
    
    style CBHD fill:#d1c4e9
    style DN fill:#fff9c4
    style XDV fill:#f3e5f5
    style XSV fill:#f3e5f5
    style CT fill:#fff9c4
```

---

## 2. BIỂU ĐỒ LUỒNG DỮ LIỆU (DFD)

### DFD Level 0 - Ngữ Cảnh Hệ Thống
```mermaid
graph LR
    subgraph "Hệ Thống Quản Lý Thực Tập"
        HT["Hệ Thống<br/>Quản Lý Thực Tập"]
    end
    
    SV[Sinh Viên]
    CBQL[Cán Bộ Quản Lý]
    QTV[Quản Trị Viên]
    CBHD[Cán Bộ Hướng Dẫn]
    DB[(Cơ Sở Dữ Liệu)]
    
    SV <-->|Thông tin SV, Yêu thích| HT
    CBQL <-->|Quản lý dữ liệu| HT
    QTV <-->|Quản trị hệ thống| HT
    CBHD <-->|Xem dữ liệu| HT
    HT <-->|Lưu/Truy xuất dữ liệu| DB
    
    style HT fill:#fff3e0
    style SV fill:#e1f5ff
    style CBQL fill:#ffccbc
    style QTV fill:#c5cae9
    style CBHD fill:#d1c4e9
    style DB fill:#ffe0b2
```

### DFD Level 1 - Các Quá Trình Chính
```mermaid
graph TB
    subgraph "Input"
        SV["Sinh Viên"]
        CBQL["Cán Bộ Quản Lý"]
        QTV["Quản Trị Viên"]
        CBHD["Cán Bộ Hướng Dẫn"]
    end
    
    subgraph "Xử Lý"
        P1["1. Quản Lý<br/>Xác Thực &<br/>Tài Khoản"]
        P2["2. Quản Lý<br/>Đơn Vị<br/>Thực Tập"]
        P3["3. Quản Lý<br/>Sinh Viên"]
        P4["4. Quản Lý<br/>Cán Bộ"]
        P5["5. Quản Lý<br/>Yêu Thích"]
    end
    
    subgraph "Output"
        D1["Tài Khoản & JWT"]
        D2["Danh sách Đơn Vị"]
        D3["Danh sách Sinh Viên"]
        D4["Danh sách Cán Bộ"]
        D5["Danh Sách Yêu Thích"]
    end
    
    SV --> P1
    CBQL --> P2
    CBQL --> P3
    QTV --> P1
    QTV --> P2
    QTV --> P3
    QTV --> P4
    CBHD --> P5
    SV --> P5
    
    P1 --> D1
    P2 --> D2
    P3 --> D3
    P4 --> D4
    P5 --> D5
    
    style P1 fill:#fff9c4
    style P2 fill:#ffccbc
    style P3 fill:#ffccbc
    style P4 fill:#ffccbc
    style P5 fill:#c8e6c9
```

### DFD Chi Tiết - Quá Trình Yêu Thích Đơn Vị
```mermaid
graph LR
    subgraph "Input"
        SV["Sinh Viên<br/>Đăng Nhập"]
    end
    
    subgraph "Xử Lý"
        P1["Toggle Favorite<br/>Like/Unlike"]
        P2["Kiểm Tra Tồn Tại"]
        P3["Batch Check<br/>Trạng Thái"]
        P4["Lấy Danh Sách<br/>Yêu Thích"]
    end
    
    subgraph "Storage"
        DB1["Sinh Viên"]
        DB2["Đơn Vị"]
        DB3["Yêu Thích"]
    end
    
    subgraph "Output"
        O1["Trạng Thái Like"]
        O2["Danh Sách Yêu Thích"]
    end
    
    SV --> P1
    SV --> P3
    SV --> P4
    
    P1 --> P2
    P2 --> DB1
    P2 --> DB2
    P2 --> DB3
    
    P3 --> DB3
    P4 --> DB3
    
    P1 --> O1
    P3 --> O1
    P4 --> O2
    
    style P1 fill:#c8e6c9
    style P2 fill:#c8e6c9
    style P3 fill:#c8e6c9
    style P4 fill:#c8e6c9
```

---

## 3. BIỂU ĐỒ THỰC THỂ - QUAN HỆ (ERD)

### Toàn Bộ Schema
```mermaid
erDiagram
    ADMIN ||--o{ SINH_VIEN : "manages"
    ADMIN ||--o{ CAN_BO_QUAN_LY : "manages"
    ADMIN ||--o{ CAN_BO_HUONG_DAN : "manages"
    ADMIN ||--o{ DON_VI : "manages"
    
    CAN_BO_QUAN_LY ||--o{ DON_VI : "manages"
    CAN_BO_QUAN_LY ||--o{ CAN_BO_HUONG_DAN : "manages"
    
    CAN_BO_HUONG_DAN }o--|| DON_VI : "works_at"
    CAN_BO_HUONG_DAN ||--o{ SINH_VIEN : "supervises"
    
    DON_VI ||--o{ SINH_VIEN : "recruits"
    
    SINH_VIEN }o--o{ DON_VI : "favorite" 
    
    ADMIN {
        int id PK
        string username UK
        string password_hash
        timestamp created_at
    }
    
    CAN_BO_QUAN_LY {
        int id PK
        string username UK
        string password_hash
        string ho_ten
        string gioi_tinh
        string so_dien_thoai
        timestamp created_at
    }
    
    SINH_VIEN {
        int id PK
        string username UK
        string password_hash
        string ho_ten
        string gioi_tinh
        string so_dien_thoai
        string email_sinh_vien UK
        timestamp created_at
    }
    
    DON_VI {
        string ma_don_vi PK
        string ten_don_vi
        string dia_chi
        string so_dien_thoai
        string email_don_vi
        string hinh_anh
        text gioi_thieu
        text dieu_kien_thuc_tap
        timestamp created_at
        timestamp updated_at
    }
    
    CAN_BO_HUONG_DAN {
        string ma_can_bo PK
        string avatar
        string ho_ten
        string gioi_tinh
        string so_dien_thoai
        string email_can_bo UK
        string so_tk_ngan_hang
        string chuc_vu
        string chuyen_mon
        string ma_don_vi FK
        timestamp created_at
        timestamp updated_at
    }
    
    YEU_THICH_DON_VI {
        int id PK
        int sinh_vien_id FK
        string ma_don_vi FK
        timestamp created_at
    }
```

### Chi Tiết Schema
```
┌──────────────────────────────────────────────────────────────────┐
│                      ADMIN (Quản Trị Viên)                        │
├──────────────────────────────────────────────────────────────────┤
│ id (PK)              │ INT AUTO_INCREMENT                         │
│ username (UNIQUE)    │ VARCHAR(100)                               │
│ password_hash        │ VARCHAR(255) [bcrypt hashed]              │
│ created_at           │ TIMESTAMP                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│               SINH_VIEN (Sinh Viên)                              │
├──────────────────────────────────────────────────────────────────┤
│ id (PK)              │ INT AUTO_INCREMENT                         │
│ username (UNIQUE)    │ VARCHAR(100)                               │
│ password_hash        │ VARCHAR(255) [bcrypt hashed]              │
│ ho_ten               │ VARCHAR(255)                               │
│ gioi_tinh            │ ENUM('Nam','Nữ','Khác')                   │
│ so_dien_thoai        │ VARCHAR(50)                                │
│ email_sinh_vien (UK) │ VARCHAR(100) [UNIQUE]                      │
│ created_at           │ TIMESTAMP                                  │
└──────────────────────────────────────────────────────────────────┘
            ▲
            │ 1:N
            │
            └─────────────────────────────────┐
                                              │
┌──────────────────────────────────────────────────────────────────┐
│             YEU_THICH_DON_VI (Junction Table)                    │
├──────────────────────────────────────────────────────────────────┤
│ id (PK)              │ INT AUTO_INCREMENT                         │
│ sinh_vien_id (FK)    │ INT → SINH_VIEN.id [ON DELETE CASCADE]   │
│ ma_don_vi (FK)       │ VARCHAR(10) → DON_VI.ma_don_vi            │
│ created_at           │ TIMESTAMP                                  │
│ UNIQUE(sinh_vien_id, │ Prevent duplicates                         │
│        ma_don_vi)    │                                            │
└──────────────────────────────────────────────────────────────────┘
            △                           △
            │ N:N                      │ N:M
            │                          │
            └──────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                 DON_VI (Đơn Vị Thực Tập)                         │
├──────────────────────────────────────────────────────────────────┤
│ ma_don_vi (PK)       │ VARCHAR(10)                                │
│ ten_don_vi           │ VARCHAR(255)                               │
│ dia_chi              │ VARCHAR(255)                               │
│ so_dien_thoai        │ VARCHAR(50)                                │
│ email_don_vi         │ VARCHAR(100)                               │
│ hinh_anh             │ VARCHAR(255)                               │
│ gioi_thieu           │ TEXT                                       │
│ dieu_kien_thuc_tap   │ TEXT                                       │
│ created_at           │ TIMESTAMP                                  │
│ updated_at           │ TIMESTAMP (auto-update)                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│          CAN_BO_QUAN_LY (Cán Bộ Quản Lý)                        │
├──────────────────────────────────────────────────────────────────┤
│ id (PK)              │ INT AUTO_INCREMENT                         │
│ username (UNIQUE)    │ VARCHAR(100)                               │
│ password_hash        │ VARCHAR(255) [bcrypt hashed]              │
│ ho_ten               │ VARCHAR(255)                               │
│ gioi_tinh            │ ENUM('Nam','Nữ','Khác')                   │
│ so_dien_thoai        │ VARCHAR(50)                                │
│ created_at           │ TIMESTAMP                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│        CAN_BO_HUONG_DAN (Cán Bộ Hướng Dẫn)                      │
├──────────────────────────────────────────────────────────────────┤
│ ma_can_bo (PK)       │ VARCHAR(10)                                │
│ avatar               │ LONGTEXT                                   │
│ ho_ten               │ VARCHAR(255)                               │
│ gioi_tinh            │ ENUM('Nam','Nữ','Khác')                   │
│ so_dien_thoai        │ VARCHAR(50)                                │
│ email_can_bo (UK)    │ VARCHAR(100) [UNIQUE]                      │
│ so_tk_ngan_hang      │ VARCHAR(50)                                │
│ chuc_vu              │ VARCHAR(100)                               │
│ chuyen_mon           │ VARCHAR(255)                               │
│ ma_don_vi (FK)       │ VARCHAR(10) → DON_VI.ma_don_vi            │
│                      │ [ON DELETE SET NULL]                       │
│ created_at           │ TIMESTAMP                                  │
│ updated_at           │ TIMESTAMP (auto-update)                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. BẢNG TÓM TẮT CHỨC NĂNG VỚI QUYỀN HẠN

| Use Case | Admin | Cán Bộ QL | Cán Bộ HD | Sinh Viên | API Endpoint |
|----------|:-----:|:---------:|:---------:|:---------:|--------------|
| **Xác Thực** |
| Đăng Nhập | ✓ | ✓ | ✓ | ✓ | POST /api/xac_thuc/login |
| Đăng Ký | - | - | - | ✓ | POST /api/xac_thuc/register |
| Lấy Thông Tin User | ✓ | ✓ | ✓ | ✓ | GET /api/xac_thuc/me |
| **Quản Lý Sinh Viên** |
| Xem Danh Sách | ✓ | - | - | - | GET /api/sinh_vien |
| Xem Chi Tiết | ✓ | - | - | ✓ | GET /api/sinh_vien/:id |
| Thêm | ✓ | - | - | - | POST /api/sinh_vien |
| Sửa | ✓ | - | - | ✓* | PUT /api/sinh_vien/:id |
| Xóa | ✓ | - | - | - | DELETE /api/sinh_vien/:id |
| **Quản Lý Đơn Vị** |
| Xem Danh Sách | ✓ | ✓ | ✓ | ✓ | GET /api/don_vi |
| Xem Chi Tiết | ✓ | ✓ | ✓ | ✓ | GET /api/don_vi/:maDonVi |
| Tìm Kiếm | - | ✓ | ✓ | ✓ | GET /api/don_vi/search |
| Thêm | ✓ | ✓ | - | - | POST /api/don_vi |
| Sửa | ✓ | ✓ | - | - | PUT /api/don_vi/:maDonVi |
| Xóa | ✓ | ✓ | - | - | DELETE /api/don_vi/:maDonVi |
| Upload Ảnh | ✓ | ✓ | - | - | POST /api/don_vi/upload |
| **Quản Lý Cán Bộ Quản Lý** |
| Xem Danh Sách | ✓ | - | - | - | GET /api/can_bo_quan_ly |
| Xem Chi Tiết | ✓ | - | - | - | GET /api/can_bo_quan_ly/:id |
| Thêm | ✓ | - | - | - | POST /api/can_bo_quan_ly |
| Sửa | ✓ | ✓* | - | - | PUT /api/can_bo_quan_ly/:id |
| Xóa | ✓ | - | - | - | DELETE /api/can_bo_quan_ly/:id |
| **Quản Lý Cán Bộ Hướng Dẫn** |
| Xem Danh Sách | ✓ | ✓ | - | ✓ | GET /api/can_bo_huong_dan |
| Xem Chi Tiết | ✓ | ✓ | - | ✓ | GET /api/can_bo_huong_dan/:maCanBo |
| Tìm Kiếm | - | ✓ | - | ✓ | GET /api/can_bo_huong_dan/search |
| Thêm | ✓ | ✓ | - | - | POST /api/can_bo_huong_dan |
| Sửa | ✓ | ✓ | - | - | PUT /api/can_bo_huong_dan/:maCanBo |
| Xóa | ✓ | ✓ | - | - | DELETE /api/can_bo_huong_dan/:maCanBo |
| **Yêu Thích Đơn Vị** |
| Toggle Like/Unlike | - | - | - | ✓ | POST /api/yeu_thich/toggle |
| Kiểm Tra Trạng Thái | - | - | - | ✓ | GET /api/yeu_thich/check/:maDonVi |
| Xem Danh Sách Yêu Thích | - | - | - | ✓ | GET /api/yeu_thich/danh-sach |
| Batch Check | - | - | - | ✓ | POST /api/yeu_thich/batch-check |
| Lấy Số Lượt Thích | - | - | - | ✓ | GET /api/yeu_thich/count/:maDonVi |
| **Quản Trị Viên** |
| Xem Thống Kê | ✓ | - | - | - | GET /api/quan_tri_vien/thong_ke |

> *✓ = Có quyền | ✓* = Chỉ được chỉnh sửa thông tin của chính mình

---

## 5. LUỒNG AUTHENTICATION & AUTHORIZATION

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. LOGIN:
   Client → POST /api/xac_thuc/login (username, password)
   ↓
   Server: Hash mật khẩu & so sánh
   ↓
   Server: Tạo JWT Token {
     - user.id
     - user.role (admin|sinh_vien|can_bo_quan_ly|can_bo_huong_dan)
     - expiresIn: 24h
   }
   ↓
   Client: Lưu token vào localStorage
   
2. REQUEST WITH AUTH:
   Client → GET /api/protected_resource
   Header: Authorization: Bearer <JWT_TOKEN>
   ↓
   Server: Middleware verifyToken() kiểm tra token
   ↓
   Server: Decode token → Lấy user info
   ↓
   Server: Gắn req.user = {id, role, ...}
   ↓
   Middleware checkRole(role1, role2) kiểm tra role
   ↓
   ✓ Pass → Controller xử lý
   ✗ Fail → 403 Forbidden

3. LOGOUT:
   Client: Xóa token khỏi localStorage
   (Server không cần xử lý vì JWT không stateful)
```

---

## 6. CÔNG NGHỆ & STACK

| Thành Phần | Công Nghệ |
|-----------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | MySQL 8.0+ |
| **Frontend** | React 18 + Hooks |
| **Authentication** | JWT + bcrypt |
| **HTTP Client** | Axios |
| **File Upload** | Multer |
| **State Management** | React Context API |
| **Routing (Frontend)** | React Router v6 |
| **Styling** | CSS3 + Grid/Flexbox |

---

## 7. CHỈ SỐ KEY METRICS

- **Số Đơn Vị**: 42+
- **Số Cán Bộ Hướng Dẫn**: 30+
- **Số Sinh Viên**: Không giới hạn
- **Số Tài Khoản Admin**: 1+
- **Số Cán Bộ Quản Lý**: Không giới hạn
- **Max Favorites per SV**: Không giới hạn
- **JWT Expiry**: 24 giờ
- **Password Hash**: bcryptjs (10 salt rounds)

