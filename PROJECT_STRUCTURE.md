# PROJECT STRUCTURE SUMMARY

## 📁 Full Stack Internship Management System

### 🔧 Technology Stack
- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL with connection pooling
- **Auth**: JWT (7 days expiry)
- **Styling**: Pure CSS3

---

## 📦 Frontend Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js                  # Navigation header with user info
│   │   ├── Navigation.js              # Role-based navigation
│   │   └── ProtectedRoute.js          # Route guard component
│   ├── pages/
│   │   ├── home.js                    # Landing page
│   │   ├── trang_dang_nhap.js         # Login page
│   │   ├── trang_dang_ky.js           # Register page
│   │   ├── trang_chu_admin.js         # Admin dashboard
│   │   ├── trang_chu_can_bo.js        # Staff home
│   │   ├── trang_chu_sinh_vien.js     # Student home
│   │   ├── danh_sach_don_vi.js        # List internship units (card/table)
│   │   ├── chi_tiet_don_vi.js         # Unit detail page
│   │   ├── danh_sach_can_bo.js        # List advisors
│   │   ├── chi_tiet_can_bo.js         # Advisor detail page
│   │   ├── thong_tin_ca_nhan.js       # User profile
│   │   ├── quan_ly_can_bo.js          # Admin: manage staff
│   │   └── quan_ly_sinh_vien.js       # Admin: manage students
│   ├── services/
│   │   └── api.js                     # Axios instance + API calls
│   ├── styles/
│   │   ├── index.css                  # Global styles
│   │   ├── app.css                    # App layout
│   │   ├── header.css
│   │   ├── navigation.css
│   │   ├── auth.css
│   │   ├── home.css
│   │   ├── trang_chu.css
│   │   ├── danh_sach.css
│   │   ├── chi_tiet.css
│   │   ├── thong_tin_ca_nhan.css
│   │   └── quan_ly.css
│   ├── App.js                         # Main app + routing
│   └── index.js                       # React entry point
├── .env
├── .gitignore
└── package.json
```

---

## 🖥️ Backend Structure

```
backend/
├── config/
│   └── db.js                          # MySQL connection pool
├── middleware/
│   └── auth.js                        # JWT verification + role check
├── controllers/
│   ├── auth_controller.js             # Login, register, getCurrentUser
│   ├── don_vi_controller.js           # CRUD + search internship units
│   ├── can_bo_huong_dan_controller.js # CRUD advisors
│   ├── can_bo_quan_ly_controller.js   # CRUD staff accounts
│   ├── sinh_vien_controller.js        # CRUD student accounts
│   └── admin_controller.js            # Statistics
├── routes/
│   ├── auth_routes.js
│   ├── don_vi_routes.js
│   ├── can_bo_huong_dan_routes.js
│   ├── can_bo_quan_ly_routes.js
│   ├── sinh_vien_routes.js
│   └── admin_routes.js
├── server.js                          # Express server setup
├── .env
├── .gitignore
└── package.json
```

---

## 🗄️ Database Schema

### Tables:
1. **admin** - Administrators (id, username, password_hash)
2. **can_bo_quan_ly** - Staff managers (id, username, password_hash, ho_ten, gioi_tinh, so_dien_thoai)
3. **sinh_vien** - Students (id, username, password_hash, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien)
4. **don_vi** - Internship units (ma_don_vi, ten_don_vi, dia_chi, tinh_thanh_pho, quan_huyen, xa_phuong, so_dien_thoai, email_don_vi, gioi_thieu, dieu_kien_thuc_tap, hinh_anh, created_at, updated_at)
5. **can_bo_huong_dan** - Advisors (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi FK)

All tables have `created_at` and `updated_at` timestamps (except admin).

Sample data: 2 units, 2 advisors, 2 staff, 2 students, 1 admin

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/login          - Login
POST   /api/auth/register       - Register (default role: student)
GET    /api/auth/me             - Get current user (protected)
```

### Internship Units
```
GET    /api/don_vi              - Get all units
GET    /api/don_vi/search       - Search/filter units
GET    /api/don_vi/:maDonVi     - Get unit details
POST   /api/don_vi              - Create (protected: staff only)
PUT    /api/don_vi/:maDonVi     - Update (protected: staff only)
DELETE /api/don_vi/:maDonVi     - Delete (protected: staff only)
```

### Advisors
```
GET    /api/can_bo_huong_dan          - Get all advisors
GET    /api/can_bo_huong_dan/search   - Search advisors
GET    /api/can_bo_huong_dan/:maCanBo - Get advisor details
POST   /api/can_bo_huong_dan          - Create (protected: staff)
PUT    /api/can_bo_huong_dan/:maCanBo - Update (protected: staff)
DELETE /api/can_bo_huong_dan/:maCanBo - Delete (protected: staff)
```

### Staff Management
```
GET    /api/can_bo_quan_ly      - Get all staff (protected: admin)
GET    /api/can_bo_quan_ly/:id  - Get staff details (protected)
POST   /api/can_bo_quan_ly      - Create staff (protected: admin)
PUT    /api/can_bo_quan_ly/:id  - Update staff (protected: admin/self)
DELETE /api/can_bo_quan_ly/:id  - Delete staff (protected: admin)
```

### Student Management
```
GET    /api/sinh_vien           - Get all students (protected: admin)
GET    /api/sinh_vien/:id       - Get student details (protected)
POST   /api/sinh_vien           - Create student (protected: admin)
PUT    /api/sinh_vien/:id       - Update student (protected: admin/self)
DELETE /api/sinh_vien/:id       - Delete student (protected: admin)
```

### Admin
```
GET    /api/admin/thong_ke      - Get statistics (protected: admin)
```

---

## 👥 User Roles & Permissions

### Admin
- View statistics (count by type)
- Manage staff accounts (CRUD)
- Manage student accounts (CRUD)
- View own profile

### Staff Manager (can_bo_quan_ly)
- View units list (table with search/filter)
- Manage units (CRUD)
- View advisors list (table with search/filter)
- Manage advisors (CRUD)
- Advanced search: by name, address, province, district, ward
- View own profile

### Student (sinh_vien)
- View units (card or table view)
- View unit details
- View advisors list
- View advisor details
- Advanced search/filter
- View own profile

---

## 🔐 Authentication & Authorization

- **JWT Token**: 7 days expiry
- **Password Hash**: bcryptjs (10 rounds)
- **Persistent Login**: Token stored in localStorage
- **Protected Routes**: Checked in ProtectedRoute component
- **API Protection**: JWT middleware on backend
- **Role-Based Access**: checkRole middleware

---

## 📝 File Naming Convention

- **Pages**: `trang_*.js`, `danh_sach_*.js`, `chi_tiet_*.js`, `quan_ly_*.js` (no Vietnamese diacritics)
- **CSS**: Matches component name
- **Components**: PascalCase (Header, Navigation, ProtectedRoute)
- **Services**: camelCase (api.js)
- **Controllers**: camelCase with `_controller.js` suffix
- **Routes**: camelCase with `_routes.js` suffix

---

## 🚀 Quick Start

1. **Setup Database**:
   ```bash
   mysql -u root < setup_database.sql
   ```

2. **Backend** (Terminal 1):
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Runs at: http://localhost:5000

3. **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Runs at: http://localhost:3000

4. **Login** with test accounts:
   - Admin: `admin1` / `admin123`
   - Staff: `canbo1` / `admin123`
   - Student: `sinhvien1` / `sinhvien123`

---

## 🎨 UI Features

- Pure CSS3 (no UI library)
- Responsive design (mobile-friendly)
- Card layout for units (student view)
- Table view for lists (staff/admin view)
- Advanced search with multiple filters
- Form validation on client & server
- Error/success messages
- Loading states
- Role-based navigation

---

## 📋 Ready for Extension

- Add new pages: Create in `pages/` and add route to App.js
- Add new entities: Create controller, routes, model
- Add features: Follow existing patterns
- Custom styling: Add CSS files to `styles/`

---

**Status**: ✅ Complete Skeleton Ready for Development
**Version**: 1.0.0
**Last Updated**: 2025
