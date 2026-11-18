// Sumber transaksi poin dari pesanan
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Order = db.define(
  "Order",
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
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "order_number",
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "order_date",
    },
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "pickup_date",
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    discountAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: "discount_amount",
    },
    shippingCost: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "shipping_cost",
    },
    pointDiscount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: "point_discount",
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "total_amount",
    },
    orderStatus: {
      type: DataTypes.ENUM(""),
      allowNull: false,
      field: "order_status",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true,
  },
);

export default Order;
