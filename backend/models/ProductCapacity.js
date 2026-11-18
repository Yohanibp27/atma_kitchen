// Mengatur kapasitas berdasarkan tanggal
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductCapacity = db.define(
  "ProductCapacity",
  {
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_variant_id",
      references: {
        model: "product_variants",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    reservedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      field: "reserved_quantity",
    },
  },
  {
    tableName: "product_capacities",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["product_variant_id", "date"],
      },
    ],
  },
);

export default ProductCapacity;
