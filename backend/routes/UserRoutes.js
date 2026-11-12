import express, { Router } from "express";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get(
  "/test-view",
  authenticateToken,
  authorizePermission("user.view"),
  (req, res) => {
    return res.status(200).json({
      message: "Berhasil mengakses data pengguna!",
      user: req.user,
    });
  },
);
router.get(
  "/test-profile",
  authenticateToken,
  authorizePermission("profile.view"),
  (req, res) => {
    return res.status(200).json({
      message: "Berhasil mengakses profil!",
      user: req.user,
    });
  },
);

router.get("/", authenticateToken, authorizePermission("user.view"), getUsers);
router.get(
  "/:id",
  authenticateToken,
  authorizePermission("user.view"),
  getUsersById,
);
router.post(
  "/",
  authenticateToken,
  authorizePermission("user.create"),
  createUser,
);
router.put(
  "/:id",
  authenticateToken,
  authorizePermission("user.update"),
  updateUser,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizePermission("user.delete"),
  deleteUser,
);

export default router;
