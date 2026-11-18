// Mengatur kebutuhan kemasan setiap varian dan transaksi
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductPackaging = db.define(
  "ProductPackaging",
  {
    productVariantId: {
      // productVariantId boleh NULL untuk aturan per_order, seperti tas spunbond
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "product_variant_id",
      references: {
        model: "product_variants",
        key: "id",
      },
    },
    packagingItemId: {
      // packagingItemId wajib diisi karena setiap aturan packaging harus menunjuk jenis kemasan
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "packaging_item_id",
      references: {
        model: "packaging_items",
        key: "id",
      },
    },
    usageScope: {
      type: DataTypes.ENUM("per_product", "per_order"),
      allowNull: false,
      field: "usage_scope",
    },
    quantity: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
  },
  {
    tableName: "product_packagings",
    timestamps: true,
    underscored: true,
  },
);

export default ProductPackaging;
