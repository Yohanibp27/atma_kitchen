// Menyimpan komposisi hampers
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductBundleItem = db.define(
  "ProductBundleItem",
  {
    bundleVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "bundle_variant_id",
    },
    componentVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "component_variant_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "product_bundle_items",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["bundle_variant_id", "component_variant_id"],
      },
    ],
  },
);

export default ProductBundleItem;
