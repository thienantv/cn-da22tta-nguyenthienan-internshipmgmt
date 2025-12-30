 Danh sách các API Backend để kiểm thử

1. API Xác thực (Authentication)
POST /api/auth/login - Đăng nhập
POST /api/auth/register - Đăng ký tài khoản
GET /api/auth/me - Lấy thông tin người dùng hiện tại

2. API Quản lý Sinh viên
GET /api/sinh_vien - Lấy danh sách sinh viên (chỉ admin)
GET /api/sinh_vien/:id - Lấy chi tiết sinh viên
POST /api/sinh_vien - Tạo sinh viên mới (chỉ admin)
PUT /api/sinh_vien/:id - Cập nhật thông tin sinh viên
DELETE /api/sinh_vien/:id - Xóa sinh viên (chỉ admin)

3. API Quản lý Cán bộ Quản lý
GET /api/can_bo_quan_ly - Lấy danh sách cán bộ quản lý (chỉ admin)
GET /api/can_bo_quan_ly/:id - Lấy chi tiết cán bộ quản lý
POST /api/can_bo_quan_ly - Tạo cán bộ quản lý mới (chỉ admin)
PUT /api/can_bo_quan_ly/:id - Cập nhật thông tin cán bộ quản lý
DELETE /api/can_bo_quan_ly/:id - Xóa cán bộ quản lý (chỉ admin)

4. API Quản lý Cán bộ Hướng dẫn
GET /api/can_bo_huong_dan - Lấy danh sách cán bộ hướng dẫn
GET /api/can_bo_huong_dan/search - Tìm kiếm cán bộ hướng dẫn
GET /api/can_bo_huong_dan/:maCanBo - Lấy chi tiết cán bộ hướng dẫn
POST /api/can_bo_huong_dan - Tạo cán bộ hướng dẫn mới (chỉ cán bộ quản lý)
PUT /api/can_bo_huong_dan/:maCanBo - Cập nhật thông tin cán bộ hướng dẫn
DELETE /api/can_bo_huong_dan/:maCanBo - Xóa cán bộ hướng dẫn

5. API Quản lý Đơn vị
GET /api/don_vi - Lấy danh sách đơn vị
GET /api/don_vi/search - Tìm kiếm đơn vị
GET /api/don_vi/:maDonVi - Lấy chi tiết đơn vị
POST /api/don_vi - Tạo đơn vị mới (chỉ cán bộ quản lý)
POST /api/don_vi/upload - Upload ảnh đơn vị (chỉ cán bộ quản lý)
PUT /api/don_vi/:maDonVi - Cập nhật thông tin đơn vị (chỉ cán bộ quản lý)
DELETE /api/don_vi/:maDonVi - Xóa đơn vị (chỉ cán bộ quản lý)

6. API Quản trị viên
GET /api/admin/thong_ke - Lấy thống kê hệ thống (chỉ admin)
GET /api/admin/list-admin - Lấy danh sách tất cả admin (chỉ admin)
GET /api/admin/list-can-bo - Lấy danh sách cán bộ quản lý (chỉ admin)
GET /api/admin/list-sinh-vien - Lấy danh sách sinh viên (chỉ admin)
GET /api/admin/profile/:id - Lấy thông tin chi tiết admin
PUT /api/admin/:id - Cập nhật thông tin admin

7. API Yêu thích (Favorites)
POST /api/yeu_thich/toggle - Toggle like/unlike đơn vị (chỉ sinh viên)
GET /api/yeu_thich/check/:ma_don_vi - Kiểm tra trạng thái yêu thích
GET /api/yeu_thich/danh-sach - Lấy danh sách đơn vị yêu thích
POST /api/yeu_thich/batch-check - Kiểm tra trạng thái yêu thích cho nhiều đơn vị
GET /api/yeu_thich/count/:ma_don_vi - Lấy số lượng yêu thích

8. API Quên mật khẩu (Forgot Password)
POST /api/quen-mat-khau/buoc-1 - Kiểm tra username
POST /api/quen-mat-khau/buoc-2 - Xác nhận email
POST /api/quen-mat-khau/buoc-3 - Gửi email reset
GET /api/quen-mat-khau/verify-token/:token - Xác thực reset token
POST /api/quen-mat-khau/buoc-4 - Đặt lại mật khẩu

9. API Khác
GET /api/health - Kiểm tra trạng thái server