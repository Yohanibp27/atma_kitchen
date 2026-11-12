import {
  User,
  Role,
  Permission,
  RolePermission,
} from "../models/Associations.js";

export const authorizePermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Pengguna belum terautentikasi!",
        });
      }

      const user = await User.findByPk(req.user.id, {
        include: {
          model: Role,
          as: "role",
          include: {
            model: Permission,
            as: "permissions",
            through: {
              attributes: [],
            },
          },
        },
      });

      if (!user || !user.isActive) {
        return res.status(401).json({
          message: "Pengguna tidak ditemukan atau akun tidak aktif!",
        });
      }

      const userPermissions = user.role.permissions.map(
        (permission) => permission.name,
      );

      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({
          message: "Anda tidak memiliki izin untuk mengakses fitur ini!",
        });
      }

      next();
    } catch (e) {
      console.error("Authorization error:", e.message);
      return res.status(500).json({
        message: "Terjadi kesalahan saat memeriksa hak akses!",
      });
    }
  };
};
