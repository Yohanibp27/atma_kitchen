import { User, Role, Permission } from "../models/Associations.js";

export const getDashboardData = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
  });
  if (!user || !user.isActive) {
    throw new Error("Pengguna tidak ditemukan atau akun tidak aktif!");
  }

  const roleName = user.role.name;
  if (roleName === "Owner" || roleName === "Admin") {
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalRoles,
      totalPermissions,
    ] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      User.count({ where: { isActive: false } }),
      Role.count(),
      Permission.count(),
    ]);

    return {
      role: roleName,
      summary: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalRoles,
        totalPermissions,
      },
    };
  }

  if (roleName === "Manager") {
    const [totalRoles, totalPermissions] = await Promise.all([
      Role.count(),
      Permission.count(),
    ]);

    return {
      role: roleName,
      summary: {
        totalRoles,
        totalPermissions,
      },
    };
  }

  return {
    role: roleName,
    summary: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      isActive: user.isActive,
    },
  };
};
