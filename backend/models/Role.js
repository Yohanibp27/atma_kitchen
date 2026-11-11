import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Role = db.define(
  "Role",
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
    tableName: "roles",
    timestamps: true,
    underscored: true,
  },
);

export default Role;
