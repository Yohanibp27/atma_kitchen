// Menyimpan saldo customer
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const CustomerPoint = db.define(
  "CustomerPoint",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "customer_points",
    timestamps: true,
    underscored: true,
  },
);

export default CustomerPoint;
