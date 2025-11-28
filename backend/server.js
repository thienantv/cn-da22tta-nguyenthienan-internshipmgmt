const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth_routes');
const donViRoutes = require('./routes/don_vi_routes');
const canBoHuongDanRoutes = require('./routes/can_bo_huong_dan_routes');
const canBoQuanLyRoutes = require('./routes/can_bo_quan_ly_routes');
const sinhVienRoutes = require('./routes/sinh_vien_routes');
const adminRoutes = require('./routes/admin_routes');

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
