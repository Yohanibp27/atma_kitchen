import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Permission = db.define(
  "Permission",
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
  },
  {
    tableName: "permissions",
    timestamps: true,
    underscored: true,
  },
);

export default Permission;
