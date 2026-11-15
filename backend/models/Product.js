// Menyimpan identitas produk
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Product = db.define(
  "Product",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",
    },
    consignorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "consignor_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productOrigin: {
      type: DataTypes.ENUM("own_production", "consignment"),
      allowNull: false,
      defaultValue: "own_production",
      field: "product_origin",
    },
    productKind: {
      type: DataTypes.ENUM("standard", "bundle"),
      allowNull: false,
      defaultValue: "standard",
      field: "product_kind",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

export default Product;
