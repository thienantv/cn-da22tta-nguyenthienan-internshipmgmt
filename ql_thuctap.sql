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
  gioi_thieu TEXT,
  dieu_kien_thuc_tap TEXT,
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
  ma_don_vi VARCHAR(10) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE SET NULL
);

DROP TABLE IF EXISTS can_bo_huong_dan;

-- ========================================
-- BẢNG ADMIN
-- ========================================
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- BẢNG CÁN BỘ
-- ========================================
CREATE TABLE IF NOT EXISTS can_bo_quan_ly (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  ho_ten VARCHAR(255) NOT NULL,
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- BẢNG SINH VIÊN
-- ========================================
CREATE TABLE IF NOT EXISTS sinh_vien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  ho_ten VARCHAR(255),
  gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
  so_dien_thoai VARCHAR(50),
  email_sinh_vien VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Chèn dữ liệu mẫu cho bảng don_vi
INSERT INTO don_vi
(ma_don_vi, ten_don_vi, dia_chi, so_dien_thoai, email_don_vi, gioi_thieu, dieu_kien_thuc_tap) VALUES
-- 1
('DV001', 'Phòng Truyền thông và Quảng bá Cộng đồng (TVU)', '126 Nguyễn Thiện Thành, K4, P5, TP Trà Vinh', NULL, 'tttt@tvu.edu.vn','Đơn vị trực thuộc Trường Đại học Trà Vinh, phụ trách truyền thông và quảng bá hình ảnh nhà trường.', 'Sinh viên năm 3 trở lên, có kỹ năng truyền thông, CNTT hoặc thiết kế cơ bản.'),

-- 2
('DV002', 'Công ty Cổ phần Hệ Sinh Thái 365', 'P903, Tầng 9, Toà nhà Diamond Plaza, 34 Lê Duẩn, P. Bến Nghé, Q1, TP.HCM', NULL, 'contact@hesinhthai365.vn', 'Doanh nghiệp hoạt động trong lĩnh vực công nghệ, truyền thông và giải pháp số.','Sinh viên CNTT, Truyền thông đa phương tiện; có kiến thức cơ bản về công nghệ.'),

-- 3
('DV003', 'Công ty Cổ phần Thủy sản Cửu Long', '36 Bạch Đằng, P4, TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'info@cuulongfish.vn', 'Doanh nghiệp hoạt động trong lĩnh vực nuôi trồng và chế biến thủy sản.', 'Sinh viên CNTT, Quản trị hệ thống hoặc Văn phòng.'),

-- 4
('DV004', 'Công ty Cổ phần Văn hóa Tổng hợp Trà Vinh', '72A Trần Phú, P3, TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'vanhoa@travinh.vn', 'Đơn vị hoạt động trong lĩnh vực văn hóa, truyền thông và xuất bản.', 'Sinh viên CNTT, Truyền thông, Thiết kế hoặc Văn phòng.'),

-- 5
('DV005', 'Công ty Cổ phần Viễn thông FPT - Chi nhánh Trà Vinh','TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'fpttravinh@fpt.com.vn', 'Chi nhánh FPT Telecom tại Trà Vinh, cung cấp dịch vụ viễn thông và CNTT.', 'Sinh viên CNTT, Mạng máy tính; có kiến thức cơ bản về mạng.'),

-- 6
('DV006', 'Công ty TNHH Quảng Cáo NAHY', '141 Nguyễn Đáng, Khóm 1, Phường 7, TP Trà Vinh', NULL, 'nahyads@gmail.com', 'Doanh nghiệp hoạt động trong lĩnh vực quảng cáo và truyền thông.', 'Sinh viên Truyền thông, CNTT hoặc Marketing.'),

-- 7
('DV007', 'Công ty TNHH Giải Pháp Cloud Air', '571/25A Phạm Văn Bạch, P15, Q. Tân Bình, TP. Hồ Chí Minh', NULL, 'cloudair@cloudair.vn', 'Công ty chuyên cung cấp giải pháp điện toán đám mây và hạ tầng CNTT.', 'Sinh viên CNTT, Hệ thống thông tin, Điện toán đám mây.'),

-- 8
('DV008', 'Phòng Bán hàng Khu vực Duyên Hải - VNPT Trà Vinh', 'Khóm 1, Phường 1, TX Duyên Hải, Tỉnh Trà Vinh', NULL, 'vnptduyenhai@vnpt.vn', 'Đơn vị kinh doanh trực thuộc VNPT Trà Vinh.', 'Sinh viên CNTT, Kinh doanh hoặc Hệ thống thông tin.'),

-- 9
('DV009', 'Khoa Kỹ thuật và Công nghệ (TVU)', '126 Nguyễn Thiện Thành, K4, P5, TP Trà Vinh', NULL, 'ktcn@tvu.edu.vn', 'Khoa đào tạo các ngành kỹ thuật và công nghệ của Trường Đại học Trà Vinh.', 'Sinh viên khoa CNTT, Kỹ thuật; thực tập theo phân công.'),

-- 10
('DV010', 'Phòng Công nghệ Thông tin - Trường Đại học Trà Vinh', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'cntt@tvu.edu.vn', 'Đơn vị phụ trách quản lý và vận hành hệ thống CNTT của nhà trường.', 'Sinh viên CNTT năm 3 trở lên, có kiến thức phần cứng và phần mềm.'),

-- 11
('DV011', 'Phòng Công tác Sinh viên - Trường Đại học Trà Vinh', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'ctsv@tvu.edu.vn', 'Đơn vị quản lý và hỗ trợ công tác sinh viên.', 'Sinh viên CNTT hoặc Hành chính.'),

-- 12
('DV012', 'Trung tâm CNTT Tài nguyên và Môi trường - Sở TN&MT Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'cntt@tnmttravinh.gov.vn', 'Trung tâm CNTT trực thuộc Sở Tài nguyên và Môi trường tỉnh Trà Vinh.', 'Sinh viên CNTT, Hệ thống thông tin.'),

-- 13
('DV013', 'Trung tâm CNTT VNPT Trà Vinh', '109 Nguyễn Chí Thanh, P9, TP Trà Vinh', NULL, 'cntttravinh@vnpt.vn', 'Đơn vị phụ trách hạ tầng và giải pháp CNTT của VNPT Trà Vinh.', 'Sinh viên CNTT, Mạng máy tính.'),

-- 14
('DV014', 'FPT Bến Tre', 'Tỉnh Bến Tre', NULL, 'fptbentre@fpt.com.vn', 'Chi nhánh FPT hoạt động tại tỉnh Bến Tre.', 'Sinh viên CNTT, Phần mềm hoặc Mạng máy tính.'),
 
 -- 15
('DV015', 'Bộ môn CNTT - Khoa KT&CN - Trường Đại học Trà Vinh', '126 Nguyễn Thiện Thành, K4, P5, TP Trà Vinh', NULL, 'bmcntt@tvu.edu.vn', 'Bộ môn đào tạo và nghiên cứu lĩnh vực Công nghệ Thông tin thuộc Khoa Kỹ thuật và Công nghệ.', 'Sinh viên CNTT năm 3 trở lên, thực tập theo phân công của khoa.'),

-- 16
('DV016', 'Công ty TNHH Công nghệ Cao Hùng', 'TP Trà Vinh', NULL, 'caohung@congnghe.vn', 'Doanh nghiệp hoạt động trong lĩnh vực công nghệ và dịch vụ CNTT.', 'Sinh viên CNTT, Phần mềm hoặc Mạng máy tính.'),

-- 17
('DV017', 'Khoa Máy tính CNTT - Trường Cao đẳng Nghề Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'cntt@tvvc.edu.vn', 'Đơn vị đào tạo ngành Công nghệ Thông tin bậc cao đẳng nghề.', 'Sinh viên CNTT, hỗ trợ giảng dạy và hệ thống.'),

-- 18
('DV018', 'Công ty Nhiệt điện Duyên Hải', 'Ấp Mù U, Xã Dân Thành, TX Duyên Hải, Tỉnh Trà Vinh', NULL, 'nhietdienduyenhai@evn.vn', 'Nhà máy nhiệt điện trực thuộc Tập đoàn Điện lực Việt Nam.', 'Sinh viên CNTT, Tự động hóa hoặc Hệ thống.'),

-- 19
('DV019', 'Đài Phát thanh và Truyền hình Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'dttt@travinh.gov.vn', 'Cơ quan báo chí – truyền thông của tỉnh Trà Vinh.', 'Sinh viên CNTT, Truyền thông đa phương tiện.'),

-- 20
('DV020', 'Bưu điện Tỉnh Trà Vinh', '577 Mậu Thân, P6, TP Trà Vinh', NULL, 'buudientv@vnpost.vn', 'Đơn vị cung cấp dịch vụ bưu chính và chuyển phát.', 'Sinh viên CNTT, Hệ thống thông tin.'),

-- 21
('DV021', 'Công ty TNHH Vi tính Toàn Phúc', 'TP Trà Vinh', NULL, 'toanphuc@vitinh.vn', 'Doanh nghiệp kinh doanh và sửa chữa thiết bị tin học.', 'Sinh viên CNTT, Phần cứng máy tính.'),

-- 22
('DV022', 'Công ty TNHH Công nghệ Anh Quân', '8/24 Nguyễn Đình Khơi, Q. Tân Bình, TP. Hồ Chí Minh', NULL, 'anhquan@congnghe.vn', 'Công ty chuyên cung cấp giải pháp và thiết bị công nghệ.', 'Sinh viên CNTT, Kỹ thuật máy tính.'),

-- 23
('DV023', 'Viettel Post Trà Vinh', '156 Nguyễn Đáng, P7, TP Trà Vinh', NULL, 'viettelpost.tv@viettel.com.vn', 'Đơn vị chuyển phát nhanh thuộc Tập đoàn Viettel.', 'Sinh viên CNTT, Hệ thống thông tin.'),

-- 24
('DV024', 'FPT Vĩnh Long', 'Tỉnh Vĩnh Long', NULL, 'fptvinhlong@fpt.com.vn', 'Chi nhánh FPT hoạt động tại tỉnh Vĩnh Long.', 'Sinh viên CNTT, Phần mềm hoặc Mạng máy tính.'),

-- 25
('DV025', 'Ngân hàng TNHH MTV VIKKI - Chi nhánh Trà Vinh', '17 Nguyễn Đáng, P9, TP Trà Vinh', NULL, 'vikki.tv@bank.vn', 'Ngân hàng thương mại hoạt động trên địa bàn tỉnh Trà Vinh.', 'Sinh viên CNTT, Hệ thống thông tin hoặc Phần mềm.'),

-- 26
('DV026', 'Ban Quản lý Ký túc xá - Trường Đại học Trà Vinh', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'ktx@tvu.edu.vn', 'Đơn vị quản lý và vận hành khu ký túc xá sinh viên.', 'Sinh viên CNTT, Hành chính hoặc Hệ thống.'),

-- 27
('DV027', 'Trung tâm Ngoại ngữ - Tin học Victory', '105 Kiên Thị Nhẫn, K1, P7, TP Trà Vinh', NULL, 'victory@ngoaingu.vn', 'Trung tâm đào tạo ngoại ngữ và tin học.', 'Sinh viên CNTT, Tin học ứng dụng.'),

-- 28
('DV028', 'Trung tâm Tin học và Viễn thông Đồng Tiến', 'TP Trà Vinh', NULL, 'dongtien@cntt.vn', 'Đơn vị đào tạo và cung cấp dịch vụ CNTT và viễn thông.', 'Sinh viên CNTT, Mạng máy tính.'),

-- 29
('DV029', 'Trung tâm Văn hóa Miền Tây - Trường Claska (TVU)', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'vanhoa@tvu.edu.vn', 'Đơn vị đào tạo và giao lưu văn hóa – kỹ năng.', 'Sinh viên CNTT, Truyền thông.'),

-- 30
('DV030', 'Trường Thực hành Sư phạm Trà Vinh', '227 Phạm Ngũ Lão, K4, P1, TP Trà Vinh', NULL, 'thsp@travinh.edu.vn', 'Trường thực hành trực thuộc ngành giáo dục tỉnh Trà Vinh.', 'Sinh viên CNTT, Quản trị hệ thống.'),

-- 31
('DV031', 'Trung tâm CNTT VNPT Trà Vinh', '109 Nguyễn Chí Thanh, P9, TP Trà Vinh', NULL, 'cntttravinh@vnpt.vn', 'Đơn vị phụ trách hạ tầng CNTT và viễn thông VNPT Trà Vinh.', 'Sinh viên CNTT, Mạng máy tính.'),
 
 -- 32
('DV032', 'Công ty Cổ phần Điện gió Trường Thành Trà Vinh', 'Tỉnh Trà Vinh', NULL, 'diengio@truongthanh.vn', 'Doanh nghiệp hoạt động trong lĩnh vực năng lượng tái tạo, điện gió.', 'Sinh viên CNTT, Tự động hóa hoặc Hệ thống.'),

-- 33
('DV033', 'Công ty TNHH Thiết Bị Số CMT', 'TP Trà Vinh', NULL, 'cmt@thietbiso.vn', 'Doanh nghiệp cung cấp thiết bị số và giải pháp CNTT.', 'Sinh viên CNTT, Kỹ thuật máy tính.'),

-- 34
('DV034', 'Công ty TNHH Trà Bắc (Trabaco)', 'Tỉnh Trà Vinh', NULL, 'trabaco@traba.vn', 'Doanh nghiệp hoạt động trong lĩnh vực sản xuất và chế biến.', 'Sinh viên CNTT, Văn phòng hoặc Hệ thống.'),

-- 35
('DV035', 'Thư viện Tỉnh Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'thuvien@travinh.gov.vn', 'Đơn vị phục vụ lưu trữ, quản lý và khai thác tài liệu.', 'Sinh viên CNTT, Thư viện – Thông tin.'),

-- 36
('DV036', 'Trung tâm Dịch vụ Việc làm Trường Đại học Trà Vinh', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'vieclam@tvu.edu.vn', 'Đơn vị hỗ trợ giới thiệu việc làm và kết nối doanh nghiệp.', 'Sinh viên CNTT, Hệ thống thông tin.'),

-- 37
('DV037', 'Trung tâm ĐHTT và CNTT - VNPT', 'Tỉnh Trà Vinh', NULL, 'dhttcntt@vnpt.vn', 'Trung tâm tích hợp và triển khai giải pháp CNTT của VNPT.', 'Sinh viên CNTT, Mạng máy tính.'),

-- 38
('DV038', 'Trung tâm Giáo dục Thường xuyên TP Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'gdtx@travinh.edu.vn', 'Đơn vị đào tạo và bồi dưỡng giáo dục thường xuyên.', 'Sinh viên CNTT, Quản trị hệ thống.'),

-- 39
('DV039', 'Trung tâm Học liệu – Phát triển Dạy và Học', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'hoclieu@tvu.edu.vn', 'Đơn vị hỗ trợ học liệu và phát triển hoạt động giảng dạy.', 'Sinh viên CNTT, Hệ thống hoặc Phần mềm.'),

-- 40
('DV040', 'Trung tâm Nghiên cứu Phát triển – Viện Phát triển Nguồn lực (TVU)', 'Trường Đại học Trà Vinh, TP Trà Vinh', NULL, 'nghiencuu@tvu.edu.vn', 'Đơn vị nghiên cứu và phát triển trực thuộc Trường Đại học Trà Vinh.', 'Sinh viên CNTT, Hệ thống thông tin, Phần mềm.'),

-- 41
('DV041', 'Trường Trung cấp Nghề Dân tộc Nội trú An Giang', 'Tỉnh An Giang', NULL, 'dantoc@angiang.edu.vn', 'Cơ sở đào tạo nghề cho học sinh dân tộc nội trú.', 'Sinh viên CNTT, Hỗ trợ kỹ thuật.'),

-- 42
('DV042', 'Ủy ban Nhân dân Tỉnh Trà Vinh', 'TP Trà Vinh, Tỉnh Trà Vinh', NULL, 'ubnd@travinh.gov.vn', 'Cơ quan hành chính nhà nước cấp tỉnh.', 'Sinh viên CNTT, Hệ thống thông tin, Chính phủ điện tử.');

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

INSERT INTO admin (username, password_hash) VALUES
('admin1', '$2b$10$.FiYZZotsN/DTdaqRdiR/evidVeKv6tkaBOr5z964LPFDgnBKuMgC');

INSERT INTO can_bo_quan_ly (username, password_hash, ho_ten, gioi_tinh, so_dien_thoai) VALUES
('canbo1', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'Nguyễn Văn A', 'Nam', '0909123456'),
('canbo2', '$2b$10$0RCYzCnkO52an08zhDf2fOWpbZ2vaIIosQPBg.ZjkH5fg0myrXKbO', 'Trần Thị B', 'Nữ', '0912345678');

INSERT INTO sinh_vien (username, password_hash) VALUES
('sinhvien1', '$2b$10$SSpKUn8soEFEFnFp6/17yOZLUposB5izTpHXGzUdGwy0b89TsNPV.'),
('sinhvien2', '$2b$10$QfkLGi06WgEVKhy35rwMheOSUQxJ9eEX6g6ECwMRY92i4zXSEHHp2');