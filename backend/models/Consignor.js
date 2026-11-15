// 	Menyimpan data penitip
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Consignor = db.define(
  "Consignor",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profitShare: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
      field: "profit_share",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "consignors",
    timestamps: true,
    underscored: true,
  },
);

export default Consignor;
