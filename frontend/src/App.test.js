import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

// Giả lập localStorage
beforeEach(() => {
  localStorage.clear();
});

test("Hiển thị trang đăng nhập khi chưa có token", async () => {
  render(<App />);
  const loginTitle = await screen.findByText(/Đăng nhập/i);
  expect(loginTitle).toBeInTheDocument();
});