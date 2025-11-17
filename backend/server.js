import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ===== Import các route =====
import authRoutes from './routes/authRoutes.js';
import donviRoutes from './routes/donviRoutes.js';
import canboRoutes from './routes/canboRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ===== Fix lỗi __dirname trong ES module =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Cấu hình CORS =====
app.use(cors({
  origin: "http://localhost:3000", // domain frontend khi deploy có thể thay đổi
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ===== Middleware =====
app.use(bodyParser.json());

// ===== Định nghĩa các API routes =====
app.use('/api', authRoutes);
app.use('/api/donvi', donviRoutes);
app.use('/api/canbo', canboRoutes); // ✅ Thêm API cán bộ hướng dẫn

// ===== (Tùy chọn) route test backend =====
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// ===== Phục vụ React build khi deploy =====
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Express 5 yêu cầu dùng "/*" thay vì "*"
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ===== Khởi động server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`));

app.use('/api/users', userRoutes);