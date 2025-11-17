import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Khởi tạo root React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (Tuỳ chọn) Theo dõi hiệu năng - chỉ bật nếu cần
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);