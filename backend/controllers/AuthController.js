// controller mengelola request & response HTTP
import {
  register as registerUser,
  login as loginUser,
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
    return res.status(400).json({
      message: e.message,
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
    return res.status(400).json({
      message: e.message,
    });
  }
};

export const stay = async (req, res) => {
  return res.status(200).json({
    message: "Autentikasi berhasil!",
    data: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    },
  });
};
