import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Product = db.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  },
);

export default Product;
