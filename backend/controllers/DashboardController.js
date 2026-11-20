import { getDashboardData as Dashboard } from "../services/DashboardService.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const dashboard = await Dashboard(userId);
    return res.status(200).json({
      message: "Berhasil menampilkan data dashboard",
      data: dashboard,
    });
  } catch (e) {
    console.error("Get dashboard error:", e);
    const statusCode =
      e.message === "Pengguna tidak ditemukan atau akun tidak aktif!"
        ? "404"
        : "500";
    return res.status(statusCode).json({
      message: "Gagal menampilkan data dasboard!",
      error: e.message,
    });
  }
};
