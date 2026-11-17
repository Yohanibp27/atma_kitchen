import express from "express";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { authorizePermission } from "../middleware/AuthorizePermission.js";
import {
  getRawMaterials,
  getRawMaterialById,
  createRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
} from "../controllers/RawMaterialController.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizePermission("raw.material.view"),
  getRawMaterials,
);
router.get(
  "/:id",
  authenticateToken,
  authorizePermission("raw.material.view"),
  getRawMaterialById,
);
router.post(
  "/",
  authenticateToken,
  authorizePermission("raw.material.create"),
  createRawMaterial,
);
router.put(
  "/:id",
  authenticateToken,
  authorizePermission("raw.material.update"),
  updateRawMaterial,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizePermission("raw.material.delete"),
  deleteRawMaterial,
);

export default router;
