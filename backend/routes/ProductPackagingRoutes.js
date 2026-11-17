import express from "express";
import {
  getProductPackagings,
  getProductPackagingById,
  createProductPackaging,
  updateProductPackaging,
  deleteProductPackaging,
} from "../controllers/ProductPackagingController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizePermission("product.packaging.view"),
  getProductPackagings,
);
router.get(
  "/:id",
  authenticateToken,
  authorizePermission("product.packaging.view"),
  getProductPackagingById,
);
router.post(
  "/",
  authenticateToken,
  authorizePermission("product.packaging.create"),
  createProductPackaging,
);
router.put(
  "/:id",
  authenticateToken,
  authorizePermission("product.packaging.update"),
  updateProductPackaging,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizePermission("product.packaging.delete"),
  deleteProductPackaging,
);

export default router;
