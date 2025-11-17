import express from "express";
import {
  getAll,
  create,
  update,
  remove,
  getByMa,
  search
} from "../controllers/canboController.js";

const router = express.Router();

// Lấy tất cả cán bộ
router.get("/", getAll);

// Tìm kiếm cán bộ
router.get("/search", search);

// Lấy chi tiết theo mã cán bộ
router.get("/:ma_can_bo", getByMa);

// Thêm cán bộ
router.post("/", create);

// Cập nhật cán bộ
router.put("/:ma_can_bo", update);

// Xóa cán bộ
router.delete("/:ma_can_bo", remove);

export default router;