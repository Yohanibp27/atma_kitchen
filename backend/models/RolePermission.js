import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const RolePermission = db.define(
  "RolePermission",
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
      references: {
        model: "roles",
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "permission_id",
      references: {
        model: "permissions",
        key: "id",
      },
    },
  },
  {
    tableName: "role_permissions",
    timestamps: false, // role permission tidak perlu waktu buat & update atribut
    underscored: true,
  },
);

export default RolePermission;
