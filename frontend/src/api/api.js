import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Gắn token tự động vào mọi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔍 Gửi token:", token); // thêm dòng này để kiểm tra
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;