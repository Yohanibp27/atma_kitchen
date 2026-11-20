import { Role, RolePermission, Permission } from "../models/Associations.js";
import db from "../config/Database.js";

export const getRoles = async () => {
  const roles = await Role.findAll({
    include: {
      model: Permission,
      as: "permissions",
      attributes: ["id", "name", "description"],
      through: {
        attributes: [],
      },
    },
    order: [["id", "ASC"]],
  });
  return roles;
};

export const updateRolePermissions = async (id, permissionId) => {
  if (!Array.isArray(permissionId)) {
    throw new Error("Permission ID harus berupa array!");
  }

  const validId = permissionId.every(
    (permissionId) => Number.isInteger(permissionId) && permissionId > 0,
  );
  if (!validId) {
    throw new Error(
      "Setiap permission ID harus berupa bilangan bulat positif!",
    );
  }

  if (new Set(permissionId).size !== permissionId.length) {
    throw new Error("Terdapat permission ID yang terduplikat!");
  }

  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error("Role tidak ditemukan!");
  }

  if (role.name === "Owner") {
    throw new Error("Permission Owner tidak dapat diubah!");
  }

  const permission = await Permission.findAll({ where: { id: permissionId } });
  if (permission.length !== permissionId.length) {
    throw new Error("Terdapat permission ID yang tidak ditemukan!");
  }

  await db.transaction(async (transaction) => {
    await role.setPermissions(permission, { transaction });
  });

  const updatedRole = await Role.findByPk(id, {
    include: {
      model: Permission,
      as: "permissions",
      attributes: ["id", "name", "description"],
      through: {
        attributes: [],
      },
    },
  });
  return updatedRole;
};
