// controller mengelola request & response HTTP
import {
  register as registerUser,
  login as loginUser,
  getCurrentUser as stayMe,
} from "../services/AuthService.js";

// named export: fungsi register dieskpor secara langsung tanpa object controller
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      message: "Registrasi akun berhasil!",
      data: user,
    });
  } catch (e) {
    console.error("Register user error:", 1);
    return res.status(400).json({
      message: "Gagal register user!",
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.status(201).json({
      message: "Login akun berhasil!",
      data: user,
    });
  } catch (e) {
    console.error("Login user error:", e);
    return res.status(400).json({
      message: "Gagal login user!",
      error: e.message,
    });
  }
};

export const stay = async (req, res) => {
  try {
    const user = await stayMe(req.user.id);
    return res.status(200).json({
      message: "Autentikasi berhasil!",
      data: user,
    });
  } catch (e) {
    console.error("Stay user error:", e);
    return res.status(401).json({
      message: "Gagal mengambil stay user!",
      error: e.message,
    });
  }
};
