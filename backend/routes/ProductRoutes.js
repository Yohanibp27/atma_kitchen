import express from "express";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizePermission("product.view"),
  getProducts,
);
router.get(
  "/:id",
  authenticateToken,
  authorizePermission("product.view"),
  getProductById,
);
router.post(
  "/",
  authenticateToken,
  authorizePermission("product.create"),
  createProduct,
);
router.put(
  "/:id",
  authenticateToken,
  authorizePermission("product.update"),
  updateProduct,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizePermission("product.delete"),
  deleteProduct,
);

export default router;
