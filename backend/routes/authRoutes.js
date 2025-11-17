import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/login
router.post("/auth/login", login);

// POST /api/auth/register
router.post("/auth/register", register);

// GET /api/auth/me
router.get("/auth/me", authenticate, getMe);

export default router;
