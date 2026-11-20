import {
  getRoles as Roles,
  updateRolePermissions as UpdateRole,
} from "../services/RolesService.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Roles();
    return res.status(200).json({
      message: "Berhasil menampilkan seluruh data role!",
      data: roles,
    });
  } catch (e) {
    console.error("Get roles error:", e);
    return res.status(500).json({
      message: "Gagal mengambil seluruh data role!",
      error: e.message,
    });
  }
};

export const updateRolePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissiondId } = req.body;
    const role = await UpdateRole(id, permissiondId);
    return res
      .status(200)
      .json({ message: "Berhasil mengubah role permission!", data: role });
  } catch (e) {
    console.error("Update role permissions error:", e);
    const notFoundErrors = [
      "Role tidak ditemukan!",
      "Terdapat permission ID yang tidak ditemukan!",
    ];
    const statusCode = notFoundErrors.includes(e.message) ? 404 : 400;
    return res.status(statusCode).json({
      message: e.message,
    });
  }
};
