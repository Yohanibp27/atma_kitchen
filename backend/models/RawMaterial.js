// Menyimpan master bahan baku
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const RawMaterial = db.define(
  "RawMaterial",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentStock: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
      defaultValue: 0,
      field: "current_stock",
    },
    minimumStock: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
      defaultValue: 0,
      field: "minimum_stock",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "raw_materials",
    timestamps: true,
    underscored: true,
  },
);

export default RawMaterial;
