import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // removeToast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // addToast (thêm removeToast vào dependency array)
  const addToast = useCallback(
    (message, type = 'info', duration = 3000) => {
      const id = Date.now();
      const newToast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast] // ✅ Thêm removeToast vào đây
  );

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