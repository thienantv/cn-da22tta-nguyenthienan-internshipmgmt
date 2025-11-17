-- ========================================
-- DATABASE
-- ========================================
CREATE DATABASE IF NOT EXISTS ql_thuctap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ql_thuctap;

-- ========================================
-- BẢNG ĐƠN VỊ THỰC TẬP
-- ========================================
CREATE TABLE IF NOT EXISTS don_vi (
  ma_don_vi VARCHAR(10) PRIMARY KEY,
  ten_don_vi VARCHAR(255) NOT NULL,
  dia_chi VARCHAR(255),
  so_dien_thoai VARCHAR(50),
  email_don_vi VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS don_vi;

-- ========================================
-- BẢNG CÁN BỘ HƯỚNG DẪN
-- ========================================
CREATE TABLE IF NOT EXISTS can_bo_huong_dan (
  ma_can_bo VARCHAR(10) PRIMARY KEY,
  ho_ten VARCHAR(255) NOT NULL,
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  email_can_bo VARCHAR(100) UNIQUE,
  so_tk_ngan_hang VARCHAR(50),
  chuc_vu VARCHAR(100),
  chuyen_mon VARCHAR(255),
  ma_don_vi VARCHAR(10) UNIQUE,  -- UNIQUE để đảm bảo 1 đơn vị chỉ có 1 cán bộ
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE SET NULL
);

DROP TABLE IF EXISTS can_bo_huong_dan;

-- ========================================
-- BẢNG TÀI KHOẢN
-- ========================================
CREATE TABLE IF NOT EXISTS tai_khoan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','canbo','sinhvien') DEFAULT 'sinhvien',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu cho bảng don_vi
INSERT INTO don_vi (ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi)
VALUES 
('DV001', 'Công ty ABC', '123 Đường Lê Lợi, TP.HCM', '0281234567', 'contact@abc.com'),
('DV002', 'Công ty XYZ', '456 Đường Trần Hưng Đạo, Hà Nội', '0247654321', 'info@xyz.com');

-- Chèn dữ liệu mẫu cho bảng can_bo_huong_dan
INSERT INTO can_bo_huong_dan (ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi)
VALUES
('CB001', 'Nguyễn Văn A', 'Nam', '0909123456', 'nguyenvana@abc.com', '1234567890', 'Trưởng phòng', 'CNTT', 'DV001'),
('CB002', 'Trần Thị B', 'Nữ', '0912345678', 'tranthib@xyz.com', '0987654321', 'Giám sát', 'Mạng máy tính', 'DV002');

-- ========================================
-- DỮ LIỆU MẪU CHO TÀI KHOẢN
-- (mật khẩu được băm sẵn bằng bcrypt)
-- ========================================
INSERT INTO tai_khoan (username, password_hash, role) VALUES
('admin1', '$2b$10$.FiYZZotsN/DTdaqRdiR/evidVeKv6tkaBOr5z964LPFDgnBKuMgC', 'admin'),
('canbo1', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'canbo'),
('canbo2', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'canbo'),
('sinhvien1', '$2b$10$SSpKUn8soEFEFnFp6/17yOZLUposB5izTpHXGzUdGwy0b89TsNPV.', 'sinhvien'),
('sinhvien2', '$2b$10$QfkLGi06WgEVKhy35rwMheOSUQxJ9eEX6g6ECwMRY92i4zXSEHHp2', 'sinhvien');
