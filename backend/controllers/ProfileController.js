import {
  getMyProfile as myProfile,
  updateMyProfile as updateProfile,
  changePassword as changePass,
} from "../services/ProfileService.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await myProfile(userId);
    return res.status(200).json({
      message: "Berhasil menampilkan profile!",
      data: profile,
    });
  } catch (e) {
    console.error("Get my profile error", e);
    const statusCode =
      e.message === "Pengguna tidak ditemukan atau tidak aktif!"
        ? "404"
        : "500";
    return res.status(statusCode).json({
      message: "Gagal menampilkan data profil!",
      error: e.message,
    });
  }
};

export const updatedMyProfile = async (req, res) => {
  try {
    const profile = await updateProfile(req.user.id, req.body ?? {});
    return res.status(200).json({
      message: "Berhasil mengubah data profil!",
      data: profile,
    });
  } catch (e) {
    console.error("Update my profile error:", e);
    const statusCode =
      e.message === "Pengguna tidak ditemukan atau tidak aktif!"
        ? "404"
        : "500";
    return res.status(statusCode).json({
      message: "Gagal mengubah data profil!",
      error: e.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    await changePass(userId, req.body);
    return res.status(200).json({
      message: "Password berhasil diperbarui!",
    });
  } catch (e) {
    console.error("Change password error:", e);
    const statusCode =
      e.message === "Pengguna tidak ditemukan atau tidak aktif!"
        ? "404"
        : "500";
    return res.status(statusCode).json({
      message: "Gagal mengubah data profil!",
      error: e.message,
    });
  }
};
