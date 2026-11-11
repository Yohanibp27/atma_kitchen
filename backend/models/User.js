import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name", // nama atribut di database jadi first_name
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 50], // panjang karakter min 8 max 50
        notEmpty: {
          msg: "Password tidak boleh kosong",
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "birth_date",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "users", // nama tabel di database secara eksplisit
    timestamps: true, // kelola waktu buat dan update data
    underscored: true, // format nama atribut menjadi snake_case
    // freezeTableName: true, cegah plularisasi nama model menjadi nama tabel, User -> Users (tetap)
  },
);

export default User;
