import express from "express";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { getDashboard } from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/", authenticateToken, getDashboard);

export default router;
