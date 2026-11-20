import { getPermissions as Permissions } from "../services/PermissionService.js";

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permissions();
    return res.status(200).json({
      message: "Berhasil menampilkan seluruh data permissions!",
      data: permissions,
    });
  } catch (e) {
    console.error("Get permissions error:", e);
    return res.status(400).json({
      message: "Gagal mengambil seluruh data permission!",
      error: e.message,
    });
  }
};
