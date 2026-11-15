// Menyimpan ukuran, satuan, harga, dan sistem penjualan
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductVariant = db.define(
  "ProductVariant",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    variantName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "variant_name",
    },
    sizeDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "size_description",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    salesType: {
      type: DataTypes.ENUM("pre_order", "ready_stock"),
      allowNull: false,
      field: "sales_type",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "product_variants",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["product_id", "variant_name"],
      },
    ],
  },
);

export default ProductVariant;
