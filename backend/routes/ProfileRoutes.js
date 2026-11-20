import express from "express";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";
import {
  getMyProfile,
  updatedMyProfile,
  changePassword,
} from "../controllers/ProfileController.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizePermission("profile.view"),
  getMyProfile,
);
router.put(
  "/:id",
  authenticateToken,
  authorizePermission("profile.update"),
  updatedMyProfile,
);
router.patch(
  "/:id",
  authenticateToken,
  authorizePermission("profile.update"),
  changePassword,
);

export default router;
