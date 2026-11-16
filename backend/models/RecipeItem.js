// Menyimpan komposisi bahan setiap resep
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const RecipeItem = db.define(
  "RecipeItem",
  {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "recipe_id",
    },
    rawMaterialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "raw_material_id",
    },
    quantity: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "recipe_items",
    timestamps: true,
    underscored: true,
  },
);

export default RecipeItem;
