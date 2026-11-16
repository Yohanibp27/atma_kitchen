// controller mengelola request & response HTTP
import {
  register as registerUser,
  login as loginUser,
  getCurrentUser as stayMe,
  forgotPassword as forgotPassword,
  resetPassword as resetPass,
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
    console.error("Register user error:", e);
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

export const forgot = async (req, res) => {
  try {
    const result = await forgotPassword(req.body);
    return res.status(200).json({
      message: "Link reset password berhasil dikirim!",
      data: result,
    });
  } catch (e) {
    console.error("Forgot account error:", e);
    return res.status(401).json({
      message: "Gagal mengirim link reset password!",
      error: e.message,
    });
  }
};

export const reset = async (req, res) => {
  try {
    const result = await resetPass(req.body);
    return res.status(200).json({
      message: "Berhasil melakukan reset password!",
      data: result,
    });
  } catch (e) {
    console.error("Reset account error:", e);
    return res.status(401).json({
      message: "Gagal melakukan reset password!",
      error: e.message,
    });
  }
};
