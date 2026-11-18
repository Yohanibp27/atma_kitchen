import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Payment = db.define(
  "Payment",
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
      references: {
        model: "orders",
        key: "id",
      },
    },
    paymentMethod: {
      type: DataTypes.ENUM(""),
      allowNull: false,
      field: "payment_method",
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM(""),
      allowNull: false,
      field: "payment_status",
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "payment_date",
    },
    proofImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "proof_image",
    },
  },
  {
    tableName: "payments",
    timestamps: true,
    underscored: true,
  },
);

export default Payment;
