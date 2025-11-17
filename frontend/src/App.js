import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import API from "./api/api";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DonViList from "./components/DonVi/DonViList";
import DonViDetail from "./components/DonVi/DonViDetail";

import Layout from "./components/TrangChu/TrangChu";
import CanBoList from "./components/CanBo/CanBoList";
import CanBoDetail from "./components/CanBo/CanBoDetail";
import CanBoForm from "./components/CanBo/CanBoForm";

import "./assets/css/App.css"; // file CSS riêng

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.warn("Token không hợp lệ hoặc hết hạn.");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải ứng dụng...</p>
      </div>
    );
  }

  const PrivateRoute = ({ children }) => (user ? children : <Navigate to="/login" replace />);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register setUser={setUser} />} />

        {/* Private routes */}
        <Route path="/" element={<PrivateRoute><Layout user={user} setUser={setUser} /></PrivateRoute>}>
          <Route index element={<div>Chào mừng {user?.name || "bạn"}!</div>} />

          {/* Đơn vị */}
          <Route path="donvi" element={<DonViList />} />
          <Route path="donvi/:ma_don_vi" element={<DonViDetail />} />

          {/* Cán bộ hướng dẫn */}
          <Route path="canbo" element={<CanBoList />} />
          <Route path="canbo/add" element={<CanBoForm />} />
          <Route path="canbo/edit/:ma_can_bo" element={<CanBoForm />} />
          <Route path="canbo/:ma_can_bo" element={<CanBoDetail />} />
        </Route>

        {/* Nếu không khớp route nào */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;