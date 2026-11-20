import express from "express";
import {
  getRoles,
  updateRolePermissions,
} from "../controllers/RoleController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";

const router = express.Router();

router.get("/", authenticateToken, authorizePermission("role.view"), getRoles);
router.put(
  "/:id/permissions",
  authenticateToken,
  authorizePermission("role.manage_permissions", updateRolePermissions),
);

export default router;
