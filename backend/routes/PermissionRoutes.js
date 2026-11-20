import express from "express";
import { getPermissions } from "../controllers/PermissionController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizePermission("permission.view"),
  getPermissions,
);

export default router;
