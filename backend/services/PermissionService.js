import { Permission } from "../models/Associations.js";

export const getPermissions = async () => {
  const permissions = await Permission.findAll({ order: [["id", "ASC"]] });
  return permissions;
};
