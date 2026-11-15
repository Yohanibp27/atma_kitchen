// Mengelompokkan kategori produk
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Category = db.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    underscored: true,
  },
);

export default Category;
