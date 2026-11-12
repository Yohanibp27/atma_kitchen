import express from "express";
import { register, login, stay } from "../controllers/AuthController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/stay", authenticateToken, stay);

export default router;
