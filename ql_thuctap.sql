-- ========================================
-- DATABASE
-- ========================================
CREATE DATABASE IF NOT EXISTS ql_thuctap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ql_thuctap;

-- ========================================
-- BẢNG ĐƠN VỊ THỰC TẬP
-- ========================================
DROP TABLE IF EXISTS don_vi;

CREATE TABLE IF NOT EXISTS don_vi (
  ma_don_vi VARCHAR(10) PRIMARY KEY,
  ten_don_vi VARCHAR(255) NOT NULL,
  dia_chi VARCHAR(255),
  so_dien_thoai VARCHAR(50),
  email_don_vi VARCHAR(100),
  gioi_thieu TEXT,
  dieu_kien_thuc_tap TEXT,
  hinh_anh VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- BẢNG CÁN BỘ HƯỚNG DẪN
-- ========================================
DROP TABLE IF EXISTS can_bo_huong_dan;

CREATE TABLE IF NOT EXISTS can_bo_huong_dan (
  ma_can_bo VARCHAR(10) PRIMARY KEY,
  avatar LONGTEXT DEFAULT NULL,
  ho_ten VARCHAR(255) NOT NULL,
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  email_can_bo VARCHAR(100) UNIQUE,
  so_tk_ngan_hang VARCHAR(50),
  chuc_vu VARCHAR(100),
  chuyen_mon VARCHAR(255),
  ma_don_vi VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE SET NULL
);

-- ========================================
-- BẢNG ADMIN
-- ========================================
DROP TABLE IF EXISTS admin;

CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email_admin VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- BẢNG CÁN BỘ
-- ========================================
DROP TABLE IF EXISTS can_bo_quan_ly;

CREATE TABLE IF NOT EXISTS can_bo_quan_ly (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  ho_ten VARCHAR(255) NOT NULL,
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  email_can_bo VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- BẢNG SINH VIÊN
-- ========================================
DROP TABLE IF EXISTS sinh_vien;

CREATE TABLE IF NOT EXISTS sinh_vien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  ho_ten VARCHAR(255),
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  email_sinh_vien VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu cho bảng don_vi
INSERT INTO don_vi
(ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi, gioi_thieu, dieu_kien_thuc_tap) VALUES

('DV001','Phòng Truyền thông và Quảng bá Cộng đồng (TVU)',
'126 Nguyễn Thiện Thành, K4, P5, TP Trà Vinh','02943881234','tttt@tvu.edu.vn',
'Đơn vị trực thuộc Trường Đại học Trà Vinh, phụ trách truyền thông và quảng bá hình ảnh nhà trường.',
'Sinh viên năm 3 trở lên, có kỹ năng truyền thông, CNTT hoặc thiết kế cơ bản.'),

('DV002','Công ty Cổ phần Hệ Sinh Thái 365',
'P903, Tầng 9, Toà nhà Diamond Plaza, 34 Lê Duẩn, Q1, TP.HCM','02838291234','contact@hesinhthai365.vn',
'Doanh nghiệp hoạt động trong lĩnh vực công nghệ, truyền thông và giải pháp số.',
'Sinh viên CNTT, Truyền thông đa phương tiện; có kiến thức cơ bản về công nghệ.'),

('DV003','Công ty Cổ phần Thủy sản Cửu Long',
'36 Bạch Đằng, P4, TP Trà Vinh','02943894567','info@cuulongfish.vn',
'Doanh nghiệp hoạt động trong lĩnh vực nuôi trồng và chế biến thủy sản.',
'Sinh viên CNTT, Quản trị hệ thống hoặc Văn phòng.'),

('DV004','Công ty Cổ phần Văn hóa Tổng hợp Trà Vinh',
'72A Trần Phú, P3, TP Trà Vinh','02943895678','vanhoa@travinh.vn',
'Đơn vị hoạt động trong lĩnh vực văn hóa, truyền thông và xuất bản.',
'Sinh viên CNTT, Truyền thông, Thiết kế hoặc Văn phòng.'),

('DV005','Công ty Cổ phần Viễn thông FPT - Chi nhánh Trà Vinh',
'TP Trà Vinh','02943896789','fpttravinh@fpt.com.vn',
'Chi nhánh FPT Telecom tại Trà Vinh, cung cấp dịch vụ viễn thông và CNTT.',
'Sinh viên CNTT, Mạng máy tính; có kiến thức cơ bản về mạng.'),

('DV006','Công ty TNHH Quảng Cáo NAHY',
'141 Nguyễn Đáng, P7, TP Trà Vinh','02943897890','nahyads@gmail.com',
'Doanh nghiệp hoạt động trong lĩnh vực quảng cáo và truyền thông.',
'Sinh viên Truyền thông, CNTT hoặc Marketing.'),

('DV007','Công ty TNHH Giải Pháp Cloud Air',
'571/25A Phạm Văn Bạch, Q.Tân Bình, TP.HCM','02838123456','cloudair@cloudair.vn',
'Công ty chuyên cung cấp giải pháp điện toán đám mây và hạ tầng CNTT.',
'Sinh viên CNTT, Hệ thống thông tin, Điện toán đám mây.'),

('DV008','Phòng Bán hàng Khu vực Duyên Hải - VNPT Trà Vinh',
'TX Duyên Hải, Tỉnh Trà Vinh','02943898901','vnptduyenhai@vnpt.vn',
'Đơn vị kinh doanh trực thuộc VNPT Trà Vinh.',
'Sinh viên CNTT, Kinh doanh hoặc Hệ thống thông tin.'),

('DV009','Khoa Kỹ thuật và Công nghệ (TVU)',
'126 Nguyễn Thiện Thành, TP Trà Vinh','02943890012','ktcn@tvu.edu.vn',
'Khoa đào tạo các ngành kỹ thuật và công nghệ của Trường Đại học Trà Vinh.',
'Sinh viên khoa CNTT, Kỹ thuật.'),

('DV010','Phòng Công nghệ Thông tin - Trường Đại học Trà Vinh',
'Trường Đại học Trà Vinh','02943890123','cntt@tvu.edu.vn',
'Đơn vị quản lý và vận hành hệ thống CNTT.',
'Sinh viên CNTT năm 3 trở lên.'),

('DV011','Phòng Công tác Sinh viên - Trường Đại học Trà Vinh',
'Trường Đại học Trà Vinh','02943890234','ctsv@tvu.edu.vn',
'Đơn vị quản lý và hỗ trợ sinh viên.',
'Sinh viên CNTT hoặc Hành chính.'),

('DV012','Trung tâm CNTT TN&MT Trà Vinh',
'TP Trà Vinh','02943890345','cntt@tnmttravinh.gov.vn',
'Trung tâm CNTT trực thuộc Sở TN&MT.',
'Sinh viên CNTT, Hệ thống thông tin.'),

('DV013','Trung tâm CNTT VNPT Trà Vinh',
'109 Nguyễn Chí Thanh, TP Trà Vinh','02943890456','cntttravinh@vnpt.vn',
'Đơn vị phụ trách hạ tầng CNTT VNPT.',
'Sinh viên CNTT, Mạng máy tính.'),

('DV014','FPT Bến Tre',
'Tỉnh Bến Tre','02753891234','fptbentre@fpt.com.vn',
'Chi nhánh FPT tại Bến Tre.',
'Sinh viên CNTT.'),

('DV015','Bộ môn CNTT - Khoa KT&CN - TVU',
'Trường Đại học Trà Vinh','02943890567','bmcntt@tvu.edu.vn',
'Bộ môn CNTT thuộc Khoa KT&CN.',
'Sinh viên CNTT năm 3 trở lên.'),

('DV016','Công ty TNHH Công nghệ Cao Hùng',
'TP Trà Vinh','02943890678','caohung@congnghe.vn',
'Doanh nghiệp công nghệ.',
'Sinh viên CNTT.'),

('DV017','Khoa Máy tính CNTT - CĐ Nghề Trà Vinh',
'TP Trà Vinh','02943890789','cntt@tvvc.edu.vn',
'Đơn vị đào tạo CNTT.',
'Sinh viên CNTT.'),

('DV018','Công ty Nhiệt điện Duyên Hải',
'TX Duyên Hải, Trà Vinh','02943890890','nhietdienduyenhai@evn.vn',
'Nhà máy nhiệt điện.',
'Sinh viên CNTT, Tự động hóa.'),

('DV019','Đài PT-TH Trà Vinh',
'TP Trà Vinh','02943890901','dttt@travinh.gov.vn',
'Cơ quan báo chí.',
'Sinh viên CNTT, Truyền thông.'),

('DV020','Bưu điện Tỉnh Trà Vinh',
'577 Mậu Thân, TP Trà Vinh','02943891012','buudientv@vnpost.vn',
'Dịch vụ bưu chính.',
'Sinh viên CNTT.'),

('DV021','Công ty TNHH Vi tính Toàn Phúc',
'TP Trà Vinh','02943891123','toanphuc@vitinh.vn',
'Kinh doanh & sửa chữa thiết bị tin học.',
'Sinh viên CNTT.'),

('DV022','Công ty TNHH Công nghệ Anh Quân',
'Q.Tân Bình, TP.HCM','02838124567','anhquan@congnghe.vn',
'Giải pháp công nghệ.',
'Sinh viên CNTT.'),

('DV023','Viettel Post Trà Vinh',
'156 Nguyễn Đáng, TP Trà Vinh','02943891234','viettelpost.tv@viettel.com.vn',
'Chuyển phát nhanh.',
'Sinh viên CNTT.'),

('DV024','FPT Vĩnh Long',
'Tỉnh Vĩnh Long','02703891234','fptvinhlong@fpt.com.vn',
'Chi nhánh FPT.',
'Sinh viên CNTT.'),

('DV025','Ngân hàng VIKKI Trà Vinh',
'17 Nguyễn Đáng, TP Trà Vinh','02943891345','vikki.tv@bank.vn',
'Ngân hàng thương mại.',
'Sinh viên CNTT.'),

('DV026','Ban Quản lý KTX TVU',
'Trường Đại học Trà Vinh','02943891456','ktx@tvu.edu.vn',
'Quản lý KTX.',
'Sinh viên CNTT.'),

('DV027','TT Ngoại ngữ - Tin học Victory',
'105 Kiên Thị Nhẫn, TP Trà Vinh','02943891567','victory@ngoaingu.vn',
'Đào tạo ngoại ngữ & tin học.',
'Sinh viên CNTT.'),

('DV028','TT Tin học & Viễn thông Đồng Tiến',
'TP Trà Vinh','02943891678','dongtien@cntt.vn',
'Dịch vụ CNTT.',
'Sinh viên CNTT.'),

('DV029','TT Văn hóa Miền Tây - TVU',
'Trường Đại học Trà Vinh','02943891789','vanhoa@tvu.edu.vn',
'Đào tạo văn hóa – kỹ năng.',
'Sinh viên CNTT.'),

('DV030','Trường THSP Trà Vinh',
'227 Phạm Ngũ Lão, TP Trà Vinh','02943891890','thsp@travinh.edu.vn',
'Trường thực hành sư phạm.',
'Sinh viên CNTT.'),

('DV031','Trung tâm CNTT VNPT Trà Vinh',
'109 Nguyễn Chí Thanh, TP Trà Vinh','02943891901','cntttravinh@vnpt.vn',
'Hạ tầng CNTT.',
'Sinh viên CNTT.'),

('DV032','CTCP Điện gió Trường Thành',
'Tỉnh Trà Vinh','02943892012','diengio@truongthanh.vn',
'Năng lượng tái tạo.',
'Sinh viên CNTT.'),

('DV033','Công ty TNHH Thiết Bị Số CMT',
'TP Trà Vinh','02943892123','cmt@thietbiso.vn',
'Thiết bị số.',
'Sinh viên CNTT.'),

('DV034','Công ty TNHH Trà Bắc (Trabaco)',
'Tỉnh Trà Vinh','02943892234','trabaco@traba.vn',
'Sản xuất & chế biến.',
'Sinh viên CNTT.'),

('DV035','Thư viện Tỉnh Trà Vinh',
'TP Trà Vinh','02943892345','thuvien@travinh.gov.vn',
'Lưu trữ & khai thác tài liệu.',
'Sinh viên CNTT.'),

('DV036','TT DV Việc làm TVU',
'Trường Đại học Trà Vinh','02943892456','vieclam@tvu.edu.vn',
'Giới thiệu việc làm.',
'Sinh viên CNTT.'),

('DV037','TT ĐHTT & CNTT VNPT',
'Tỉnh Trà Vinh','02943892567','dhttcntt@vnpt.vn',
'Tích hợp hệ thống.',
'Sinh viên CNTT.'),

('DV038','TT GDTX TP Trà Vinh',
'TP Trà Vinh','02943892678','gdtx@travinh.edu.vn',
'Giáo dục thường xuyên.',
'Sinh viên CNTT.'),

('DV039','TT Học liệu – PT Dạy & Học',
'Trường Đại học Trà Vinh','02943892789','hoclieu@tvu.edu.vn',
'Hỗ trợ học liệu.',
'Sinh viên CNTT.'),

('DV040','TT Nghiên cứu Phát triển – TVU',
'Trường Đại học Trà Vinh','02943892890','nghiencuu@tvu.edu.vn',
'Nghiên cứu & phát triển.',
'Sinh viên CNTT.'),

('DV041','Trường TC Nghề DTNT An Giang',
'Tỉnh An Giang','02943892901','dantoc@angiang.edu.vn',
'Đào tạo nghề.',
'Sinh viên CNTT.'),

('DV042','UBND Tỉnh Trà Vinh',
'TP Trà Vinh','02943893012','ubnd@travinh.gov.vn',
'Cơ quan hành chính cấp tỉnh.',
'Sinh viên CNTT.');

-- Chèn dữ liệu mẫu cho bảng can_bo_huong_dan
INSERT INTO can_bo_huong_dan
(ma_can_bo, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo, so_tk_ngan_hang, chuc_vu, chuyen_mon, ma_don_vi) VALUES
('CB001','Đỗ Quốc Vinh','Nam','0901000001','vinhdq@tvu.edu.vn','100000001','Trưởng phòng','Truyền thông – Marketing','DV001'),

('CB002','Nguyễn Chí Bảo','Nam','0901000002','baonc@hesinhthai365.vn','100000002','Giám đốc','Quản trị doanh nghiệp','DV002'),

('CB003','Nghị Chức','Nam','0901000003','chucn@clfish.vn','100000003','Quản lý kỹ thuật','Nuôi trồng thủy sản','DV003'),

('CB004','Trần Ngọc Bích Quyên','Nữ','0901000004','quyenbtn@vhthtravinh.vn','100000004','Phó giám đốc','Văn hóa – Nghệ thuật','DV004'),

('CB005','Nguyễn Thế Phan','Nam','0901000005','phanthe@fpt.vn','100000005','Trưởng chi nhánh','Công nghệ thông tin','DV005'),

('CB006','Trần Anh Duy','Nam','0901000006','duyta@nanhy.vn','100000006','Giám đốc','Quảng cáo – Thiết kế','DV006'),

('CB007','Nguyễn Lê Phú Hải','Nam','0901000007','hailp@cloudair.vn','100000007','Trưởng bộ phận','Điện toán đám mây','DV007'),

('CB008','Huỳnh Nhật Đăng','Nam','0901000008','danghn@vnpt.vn','100000008','Trưởng phòng','Kinh doanh viễn thông','DV008'),

('CB009','Nguyễn Nhứt Lam','Nam','0901000009','lamnn@tvu.edu.vn','100000009','Giảng viên','Kỹ thuật phần mềm','DV009'),

('CB010','Nghi Vĩnh Khanh','Nam','0901000010','khanhnv@tvu.edu.vn','100000010','Trưởng phòng','Hệ thống thông tin','DV010'),

('CB012','Nguyễn Vũ Sơn','Nam','0901000012','sonnv@tnmttravinh.gov.vn','100000012','Giám đốc trung tâm','CNTT – GIS','DV012'),

('CB013','Huỳnh Sa Quang','Nam','0901000013','quanghs@vnpt.vn','100000013','Trưởng trung tâm','Hạ tầng mạng','DV013'),

('CB015','Nguyễn Bảo Ân','Nam','0901000015','annb@tvu.edu.vn','100000015','Giảng viên','Công nghệ thông tin','DV015'),

('CB016','Trần Văn Đặng Em','Nam','0901000016','emtvd@caohung.vn','100000016','Giám đốc kỹ thuật','Tự động hóa','DV016'),

('CB017','Võ Văn Lượng','Nam','0901000017','luongvv@cdnghetravinh.edu.vn','100000017','Trưởng khoa','Mạng máy tính','DV017'),

('CB020','Nguyễn Văn Trầm','Nam','0901000020','tramn@vnpost.vn','100000020','Giám đốc','Bưu chính – Logistics','DV020'),

('CB021','Huỳnh Thanh Toàn','Nam','0901000021','toanht@toanphuc.vn','100000021','Giám đốc','Kỹ thuật máy tính','DV021'),

('CB023','Nguyễn Ngọc Hùng','Nam','0901000023','hungnn@viettelpost.vn','100000023','Trưởng chi nhánh','Logistics','DV023'),

('CB026','Nguyễn Duy','Nam','0901000026','duyn@tvu.edu.vn','100000026','Quản lý','Quản trị ký túc xá','DV026'),

('CB027','Nhan Minh Phúc','Nam','0901000027','phucnm@victory.edu.vn','100000027','Giám đốc','Ngoại ngữ – Tin học','DV027'),

('CB028','Nguyễn Văn Đệ','Nam','0901000028','denv@dongtien.vn','100000028','Giám đốc','CNTT – Viễn thông','DV028'),

('CB029','Lê Văn Sao','Nam','0901000029','saolv@tvu.edu.vn','100000029','Giám đốc trung tâm','Văn hóa – Truyền thông','DV029'),

('CB030','Lê Phong Dũ','Nam','0901000030','dulep@thsptravinh.edu.vn','100000030','Hiệu trưởng','Sư phạm','DV030'),

('CB031','Nguyễn Thành Nam','Nam','0901000031','namnt@vnpt.vn','100000031','Trưởng trung tâm','Hạ tầng CNTT','DV031'),

('CB032','Trần Thị Hồng Tươi','Nữ','0901000032','tuetth@truongthanhwind.vn','100000032','Phó giám đốc','Năng lượng tái tạo','DV032'),

('CB033','Phạm Minh Tân','Nam','0901000033','tanpm@cmt.vn','100000033','Giám đốc','Thiết bị số','DV033'),

('CB035','Huỳnh Tấn Đạt','Nam','0901000035','datht@thuvientravinh.vn','100000035','Giám đốc','Thư viện – Thông tin','DV035'),

('CB036','Nguyễn Hoàng Bảo','Nam','0901000036','baonh@tvu.edu.vn','100000036','Giám đốc trung tâm','Hướng nghiệp – Việc làm','DV036'),

('CB037','Nguyễn Duy Tâm','Nam','0901000037','tamnd@vnpt.vn','100000037','Trưởng phòng','CNTT – ĐHTT','DV037'),

('CB038','Chung Thiên Trí','Nam','0901000038','trict@gdtxtravinh.edu.vn','100000038','Giám đốc','Giáo dục thường xuyên','DV038'),

('CB039','Nguyễn Thái Toàn','Nam','0901000039','toannt@tvu.edu.vn','100000039','Giám đốc','Phát triển học liệu','DV039'),

('CB040','Kim Pi Sích','Nam','0901000040','sichkp@tvu.edu.vn','100000040','Viện trưởng','Phát triển nguồn lực','DV040'),

('CB042','Lê Quang Long','Nam','0901000042','longlq@travinh.gov.vn','100000042','Phó Chủ tịch','Quản lý nhà nước','DV042');

DELETE FROM can_bo_huong_dan;

INSERT INTO admin (username, password_hash, email_admin) VALUES
('admin', '$2b$10$.FiYZZotsN/DTdaqRdiR/evidVeKv6tkaBOr5z964LPFDgnBKuMgC', 'thienantv21@gmail.com');

INSERT INTO can_bo_quan_ly (username, password_hash, ho_ten, gioi_tinh, so_dien_thoai, email_can_bo) VALUES
('canbo1', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'Nguyễn Văn A', 'Nam', '0909123456', 'thienantv211@gmail.com'),
('canbo2', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'Trần Thị B', 'Nữ', '0912345678', 'canbo2@tvu.edu.vn');

INSERT INTO sinh_vien (username, password_hash, email_sinh_vien) VALUES
('sinhvien1', '$2b$10$SSpKUn8soEFEFnFp6/17yOZLUposB5izTpHXGzUdGwy0b89TsNPV.', 'thienantv4894@gmail.com'),
('sinhvien2', '$2b$10$QfkLGi06WgEVKhy35rwMheOSUQxJ9eEX6g6ECwMRY92i4zXSEHHp2', 'sinhvien2@tvu.edu.vn');

-- ========================================
-- BẢNG YÊU THÍCH ĐƠN VỊ THỰC TẬP (Many-to-Many)
-- ========================================
DROP TABLE IF EXISTS yeu_thich_don_vi;

CREATE TABLE IF NOT EXISTS yeu_thich_don_vi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinh_vien_id INT NOT NULL,
  ma_don_vi VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (sinh_vien_id, ma_don_vi),
  FOREIGN KEY (sinh_vien_id) REFERENCES sinh_vien(id) ON DELETE CASCADE,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE CASCADE
);

-- ========================================
-- BẢNG LƯU SESSION TẠM THỜI QUÊN MẬT KHẨU
-- ========================================
DROP TABLE IF EXISTS forgot_password_sessions;

CREATE TABLE IF NOT EXISTS forgot_password_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  user_id INT,
  user_type ENUM('can_bo_quan_ly', 'sinh_vien', 'admin'),
  username VARCHAR(100),
  email VARCHAR(100),
  step INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_session_token (session_token),
  INDEX idx_is_active (is_active)
);

-- ========================================
-- BẢNG LƯU TOKEN RESET PASSWORD
-- ========================================
DROP TABLE IF EXISTS password_reset_tokens;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  token_type ENUM('can_bo_quan_ly', 'sinh_vien', 'admin') NOT NULL,
  email_verified VARCHAR(100) NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  INDEX idx_token (token),
  INDEX idx_user_id (user_id),
  INDEX idx_is_used (is_used)
);

-- ========================================
-- BẢNG GIỚI HẠN SỐ LẦN GỬI EMAIL RESET
-- ========================================
DROP TABLE IF EXISTS reset_email_attempts;

CREATE TABLE IF NOT EXISTS reset_email_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  user_type ENUM('can_bo_quan_ly', 'sinh_vien', 'admin'),
  attempt_count INT DEFAULT 0,
  last_attempt_at TIMESTAMP,
  locked_until TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email_type (email, user_type),
  INDEX idx_email (email)
);