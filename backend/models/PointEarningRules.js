import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const PointEarningRule = db.define(
  "PointEarningRule",
  {
    amountMultiple: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "amount_multiple",
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "point_earning_rules",
    timestamps: true,
    underscored: true,
  },
);

export default PointEarningRule;
