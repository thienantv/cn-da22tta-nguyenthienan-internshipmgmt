import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ToastContext = createContext();

// Hằng số cấu hình
const MAX_TOASTS = 4; // Tối đa 4 toast cùng lúc
const TOAST_DURATION = 3000; // Thời gian hiển thị (ms)
const ANIMATION_DURATION = 300; // Thời gian animation (ms)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [queue, setQueue] = useState([]); // Hàng đợi toast

  // removeToast với animation
  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const updated = prev.map((toast) =>
        toast.id === id ? { ...toast, isExiting: true } : toast
      );
      
      // Xóa sau animation hoàn tất
      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, ANIMATION_DURATION);
      
      return updated;
    });
  }, []);

  // addToast với queue system
  const addToast = useCallback(
    (message, type = 'info', duration = TOAST_DURATION) => {
      const id = Date.now() + Math.random();
      const newToast = { id, message, type, isExiting: false };

      // Nếu chưa đạt tối đa, thêm ngay
      if (toasts.length < MAX_TOASTS) {
        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
          setTimeout(() => {
            removeToast(id);
          }, duration);
        }
      } else {
        // Nếu đã đạt tối đa, thêm vào queue
        setQueue((prev) => [...prev, { newToast, duration }]);
      }

      return id;
    },
    [toasts.length, removeToast]
  );

  // Xử lý queue khi toast bị xóa
  useEffect(() => {
    if (toasts.length < MAX_TOASTS && queue.length > 0) {
      const { newToast, duration } = queue[0];
      setToasts((prev) => [...prev, newToast]);
      setQueue((prev) => prev.slice(1));

      if (duration > 0) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, duration);
      }
    }
  }, [toasts.length, queue, removeToast]);

  // Các hàm show toast
  const showError = useCallback((message) => addToast(message, 'error'), [addToast]);
  const showSuccess = useCallback((message) => addToast(message, 'success'), [addToast]);
  const showInfo = useCallback((message) => addToast(message, 'info'), [addToast]);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, showError, showSuccess, showInfo }}
    >
      {children}
    </ToastContext.Provider>
  );
};