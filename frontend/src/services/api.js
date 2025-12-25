import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Thêm token vào header nếu tồn tại
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== Auth Services ====================
export const authService = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  
  register: (username, password, confirmPassword, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien) =>
    api.post('/auth/register', { username, password, confirmPassword, ho_ten, gioi_tinh, so_dien_thoai, email_sinh_vien }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// ==================== Đơn vị Services ====================
export const donViService = {
  getAll: () =>
    api.get('/don_vi'),
  
  getById: (maDonVi) =>
    api.get(`/don_vi/${maDonVi}`),
  
  search: (params) =>
    api.get('/don_vi/search', { params }),
  
  create: (data) =>
    api.post('/don_vi', data),
  
  update: (maDonVi, data) =>
    api.put(`/don_vi/${maDonVi}`, data),
  
  delete: (maDonVi) =>
    api.delete(`/don_vi/${maDonVi}`),
};

// ==================== Cán bộ Hướng dẫn Services ====================
export const canBoHuongDanService = {
  getAll: () =>
    api.get('/can_bo_huong_dan'),
  
  getById: (maCanBo) =>
    api.get(`/can_bo_huong_dan/${maCanBo}`),
  
  search: (params) =>
    api.get('/can_bo_huong_dan/search', { params }),
  
  create: (data) =>
    api.post('/can_bo_huong_dan', data),
  
  update: (maCanBo, data) =>
    api.put(`/can_bo_huong_dan/${maCanBo}`, data),
  
  delete: (maCanBo) =>
    api.delete(`/can_bo_huong_dan/${maCanBo}`),
};

// ==================== Cán bộ Quản lý Services ====================
export const canBoQuanLyService = {
  getAll: () =>
    api.get('/can_bo_quan_ly'),
  
  getById: (id) =>
    api.get(`/can_bo_quan_ly/${id}`),
  
  create: (data) =>
    api.post('/can_bo_quan_ly', data),
  
  update: (id, data) =>
    api.put(`/can_bo_quan_ly/${id}`, data),
  
  delete: (id) =>
    api.delete(`/can_bo_quan_ly/${id}`),
};

// ==================== Sinh viên Services ====================
export const sinhVienService = {
  getAll: () =>
    api.get('/sinh_vien'),
  
  getById: (id) =>
    api.get(`/sinh_vien/${id}`),
  
  create: (data) =>
    api.post('/sinh_vien', data),
  
  update: (id, data) =>
    api.put(`/sinh_vien/${id}`, data),
  
  delete: (id) =>
    api.delete(`/sinh_vien/${id}`),
};

// ==================== Admin Services ====================
export const adminService = {
  getThongKe: () => api.get('/admin/thong_ke'),

  // Lấy profile admin theo ID
  getProfile: (id) => api.get(`/admin/profile/${id}`),

  // Cập nhật thông tin admin
  update: (id, data) => api.put(`/admin/${id}`, data),
};

// ==================== Yêu thích Services ====================
export const yeuThichService = {
  toggleFavorite: (maDonVi) =>
    api.post('/yeu_thich/toggle', { ma_don_vi: maDonVi }),
  
  checkFavorite: (maDonVi) =>
    api.get(`/yeu_thich/check/${maDonVi}`),
  
  getFavoriteList: () =>
    api.get('/yeu_thich/danh-sach'),
  
  batchCheckFavorites: (donViList) =>
    api.post('/yeu_thich/batch-check', { donViList }),
  
  getFavoriteCount: (maDonVi) =>
    api.get(`/yeu_thich/count/${maDonVi}`),
};

export default api;
