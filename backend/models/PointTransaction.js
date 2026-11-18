// Riwayat penambahan, pengurangan, dan penyesuaian (1:N)
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const PointTransaction = db.define(
  "PointTransaction",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "order_id",
      references: {
        model: "orders",
        key: "id",
      },
    },
    pointEarningRuleId: {
      // 1 pesanan bisa mendapatkan poin dari beberapa aturan
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "point_earning_rule_id",
    },
    transactionType: {
      type: DataTypes.ENUM("earn", "redeem", "adjustment"),
      allowNull: false,
      field: "transaction_type",
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pointValue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "point_value",
    },
    multiplier: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "point_transactions",
    timestamps: true,
    underscored: true,
  },
);

export default PointTransaction;
