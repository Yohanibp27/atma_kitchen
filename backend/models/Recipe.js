// Menyimpan resep produk
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Recipe = db.define(
  "Recipe",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchOutputQuantity: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: true,
      field: "batch_output_quantity",
    },
    batchOutputUnit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "batch_output_unit",
    },
    instructions: {
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
    tableName: "recipes",
    timestamps: true,
    underscored: true,
  },
);

export default Recipe;
