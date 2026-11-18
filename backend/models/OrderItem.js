import { DataTypes, DATEONLY } from "sequelize";
import db from "../config/Database.js";

const OrderItem = db.define(
  "OrderItem",
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
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_variant_id",
      references: {
        model: "product_variants",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "unit_price",
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
    underscored: true,
  },
);

export default OrderItem;
