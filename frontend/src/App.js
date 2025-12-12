import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Pages Admin
import AdminQuanLyCanBo from './pages/admin/qtv_quan_ly_can_bo';
import AdminQuanLySinhVien from './pages/admin/qtv_quan_ly_sinh_vien';
import AdminTrangChu from './pages/admin/qtv_trang_chu';
import AdminThongTin from './pages/admin/qtv_thong_tin';

// Pages Auth
import TrangDangKy from './pages/auth/trang_dang_ky';
import TrangDangNhap from './pages/auth/trang_dang_nhap';

// Pages Cán bộ quản lý
import CanBoChiTietCanBo from './pages/canboquanly/cbql_chi_tiet_can_bo';
import CanBoChiTietDonVi from './pages/canboquanly/cbql_chi_tiet_don_vi';
import CanBoQuanLyCanBoHuongDan from './pages/canboquanly/cbql_quan_ly_can_bo';
import CanBoQuanLyDonVi from './pages/canboquanly/cbql_quan_ly_don_vi';
import CanBoThemCanBoHuongDan from './pages/canboquanly/cbql_them_can_bo';
import CanBoSuaCanBoHuongDan from './pages/canboquanly/cbql_sua_can_bo';
import CanBoThemDonVi from './pages/canboquanly/cbql_them_don_vi';
import CanBoSuaDonVi from './pages/canboquanly/cbql_sua_don_vi';
import CanBoThongTinCaNhan from './pages/canboquanly/cbql_thong_tin';
import CanBoTrangChu from './pages/canboquanly/cbql_trang_chu';

// Pages Sinh viên
import SinhVienChiTietCanBo from './pages/sinhvien/sv_chi_tiet_can_bo';
import SinhVienChiTietDonVi from './pages/sinhvien/sv_chi_tiet_don_vi';
import SinhVienDanhSachCanBo from './pages/sinhvien/sv_danh_sach_can_bo';
import SinhVienDanhSachDonVi from './pages/sinhvien/sv_danh_sach_don_vi';
import SinhVienThongTin from './pages/sinhvien/sv_thong_tin';
import SinhVienTrangChu from './pages/sinhvien/sv_trang_chu';

// Pages chung
import Home from './pages/home';

// Styles
import './styles/app.css';

// Wrapper để quản lý header
const AppWrapper = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/dang-nhap', '/dang-ky'];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <main className="main-content">
        <Routes>
          {/* Khi chưa đăng nhập */}
          <Route path="/dang-nhap" element={<TrangDangNhap />} />
          <Route path="/dang-ky" element={<TrangDangKy />} />

          {/* Khi đã đăng nhập */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* Admin routes */}
                  <Route
                    path="/trang-chu-admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminTrangChu />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quan-ly-can-bo"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminQuanLyCanBo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quan-ly-sinh-vien"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminQuanLySinhVien />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/thong-tin-ca-nhan-admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminThongTin />
                      </ProtectedRoute>
                    }
                  />

                  {/* Cán bộ routes */}
                  <Route
                    path="/trang-chu-can-bo"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoTrangChu />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quan-ly-don-vi"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoQuanLyDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quan-ly-can-bo-huong-dan"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoQuanLyCanBoHuongDan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/them-don-vi"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoThemDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/can-bo/sua-don-vi/:ma_don_vi"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoSuaDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/can-bo/sua-can-bo/:ma_can_bo"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoSuaCanBoHuongDan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/them-can-bo-huong-dan"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoThemCanBoHuongDan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/can-bo/chi-tiet-can-bo/:maCanBo"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoChiTietCanBo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/can-bo/chi-tiet-don-vi/:maDonVi"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoChiTietDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/thong-tin-ca-nhan-can-bo"
                    element={
                      <ProtectedRoute requiredRole="can_bo_quan_ly">
                        <CanBoThongTinCaNhan />
                      </ProtectedRoute>
                    }
                  />

                  {/* Sinh viên routes */}
                  <Route
                    path="/trang-chu-sinh-vien"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienTrangChu />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/danh-sach-don-vi"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienDanhSachDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/danh-sach-can-bo"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienDanhSachCanBo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sinh-vien/chi-tiet-don-vi/:maDonVi"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienChiTietDonVi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sinh-vien/chi-tiet-can-bo/:maCanBo"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienChiTietCanBo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/thong-tin-ca-nhan"
                    element={
                      <ProtectedRoute requiredRole="sinh_vien">
                        <SinhVienThongTin />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<div className="not-found">Trang không tồn tại</div>} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;