import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const PointSetting = db.define(
  "PointSetting",
  {
    pointValue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "point_value",
    },
    birthdayMultiplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      field: "birthday_multiplier",
    },
    birthdayDaysBefore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      field: "birthday_days_before",
    },
    birthdayDaysAfter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      field: "birthday_days_after",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "point_settings",
    timestamps: true,
    underscored: true,
  },
);

export default PointSetting;
