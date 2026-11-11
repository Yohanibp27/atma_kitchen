import Role from "../models/Role.js";
import Permission from "./Permission.js";
import RolePermission from "./RolePermission.js";
import User from "./User.js";

// Role ↔ User (One to Many)
Role.hasMany(User, { foreignKey: "roleId", as: "users" }); // 1 Role : N Users
User.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // 1 User: 1 Role

// Role ↔ RolePermission (One to Many)
Role.hasMany(RolePermission, { foreignKey: "roleId", as: "role_permissions" }); // 1 Role : N RolePermissions
RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // 1 RolePermission : 1 Role

// Role ↔ Permission (Many to Many)
Permission.belongsToMany(Role, {
  through: RolePermission, // tabel penghubung
  foreignKey: "permissionId", // FK ke model asal
  otherKey: "roleId", //FK ke model tujuan
  as: "roles", // alias model tujuan
}); // 1 Permission : N Roles
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
}); // 1 Role : N Permissions

// Permission ↔ RolePermission (One to Many)
Permission.hasMany(RolePermission, {
  foreignKey: "permissionId",
  as: "role_permissions",
}); // 1 Permission : N RolePermissions
RolePermission.belongsTo(Permission, {
  foreignKey: "permissionId",
  as: "permission",
}); // 1 Permission : 1 RolePermission

export { Role, Permission, RolePermission, User };
