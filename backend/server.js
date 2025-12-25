const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/XacThucRoutes');
const donViRoutes = require('./routes/DonViRoutes');
const canBoHuongDanRoutes = require('./routes/CanBoHuongDanRoutes');
const canBoQuanLyRoutes = require('./routes/CanBoQuanLyRoutes');
const sinhVienRoutes = require('./routes/SinhVienRoutes');
const adminRoutes = require('./routes/QuanTriVienRoutes');
const yeuThichRoutes = require('./routes/YeuThichRoutes');
const quenMatKhauRoutes = require('./routes/QuenMatKhauRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/don_vi', donViRoutes);
app.use('/api/can_bo_huong_dan', canBoHuongDanRoutes);
app.use('/api/can_bo_quan_ly', canBoQuanLyRoutes);
app.use('/api/sinh_vien', sinhVienRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/yeu_thich', yeuThichRoutes);
app.use('/api/quen-mat-khau', quenMatKhauRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✓ Backend server đang chạy tại http://localhost:${PORT}`);
  console.log(`✓ Chạy: npm run dev (development) hoặc npm start (production)\n`);
});

module.exports = app;
