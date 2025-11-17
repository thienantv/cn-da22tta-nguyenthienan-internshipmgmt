import express from "express";
import {
  getAll,
  create,
  update,
  remove,
  getByMa,
  search,
} from "../controllers/donviController.js";

const router = express.Router();

// Lấy tất cả đơn vị
router.get("/", getAll);

// Tìm kiếm đơn vị
router.get("/search", search);

// Lấy chi tiết theo mã đơn vị
router.get("/:ma_don_vi", getByMa);

// Thêm đơn vị
router.post("/", create);

// Cập nhật đơn vị
router.put("/:ma_don_vi", update);

// Xóa đơn vị
router.delete("/:ma_don_vi", remove);

export default router;