// Service mengelola logika dan proses registrasi, login, dll
import bcrypt from "bcryptjs";
import {
  User,
  Role,
  Permission,
  RolePermission,
} from "../models/Associations.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./../utils/SendEmail.js";

export const register = async ({
  username,
  firstName,
  lastName,
  email,
  password,
  birthDate,
}) => {
  // Validasi input
  if (!username) {
    throw new Error("Username wajib diisi!");
  } else if (!firstName) {
    throw new Error("Nama depan wajib diisi!");
  } else if (!email) {
    throw new Error("Email wajib diisi!");
  } else if (!birthDate) {
    throw new Error("Tanggal lahir wajib diisi!");
  } else if (!password) {
    throw new Error("Password wajib diisi!");
  }

  // Validasi username
  const existingUsername = await User.findOne({
    where: { username },
  });

  if (existingUsername) {
    throw new Error("Username sudah digunakan!");
  }

  // Validasi email
  const existingEmail = await User.findOne({
    where: { email },
  });
  if (existingEmail) {
    throw new Error("Email sudah digunakan!");
  }

  // Validasi tanggal lahir
  if (typeof birthDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    throw new Error("Tanggal lahir harus menggunakan format YYYY-MM-DD!");
  }

  const parsedBirthDate = new Date(`${birthDate}T00:00:00.000Z`);
  if (
    Number.isNaN(parsedBirthDate.getTime()) ||
    parsedBirthDate.toISOString().slice(0, 10) !== birthDate
  ) {
    throw new Error("Tanggal lahir tidak valid!");
  }

  const now = new Date();
  const today =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-` +
    String(now.getDate()).padStart(2, "0");
  if (birthDate > today) {
    throw new Error("Tanggal lahir tidak boleh di masa depan!");
  }

  // Validasi panjang password
  if (password.length < 8) {
    throw new Error("Password minimal 8 karakter!");
  }

  // Default role User
  const defaultRole = await Role.findOne({
    where: { name: "Customer" },
  });

  if (!defaultRole) {
    throw new Error("Role default User tidak ditemukan!");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10); // angka 10 merupakan nilai salt rounds untuk proses hashing
  const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    birthDate,
    password: passwordHash,
    roleId: defaultRole.id,
  });

  return {
    id: newUser.id,
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    birthDate: newUser.birthDate,
    email: newUser.email,
    roleId: newUser.roleId,
  };
};

export const login = async ({ email, password }) => {
  // Validasi input
  if (!email || !password) {
    throw new Error("Email dan password wajib diisi!");
  }

  // Cek pengguna berdasarkan email
  const user = await User.findOne({
    where: { email },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name", "description"],
    },
  });

  if (!user) {
    throw new Error("Email atau password salah!");
  }

  // Cek status akun
  if (!user.isActive) {
    throw new Error("Akun tidak aktif!");
  }

  // verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email atau password salah!");
  }

  // Buat JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  // Return token dan info pengguna
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
    },
  };
};

export const getCurrentUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
      include: {
        model: Permission,
        as: "permissions",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    },
  });

  if (!user || !user.isActive) {
    throw new Error("Akun tidak ditemukan atau tidak aktif!");
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};

export const forgotPassword = async ({ email }) => {
  if (!email) {
    throw new Error("Email wajib diisi!");
  }

  const { JWT_RESET_SECRET, FRONTEND_URL } = process.env;
  if (!JWT_RESET_SECRET) {
    throw new Error("JWT_RESET_SECRET belum tersedia pada server!");
  } else if (!FRONTEND_URL) {
    throw new Error("FRONTEND_URL belum tersedia pada server!");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Email tidak ditemukan!");
  }

  const resetToken = jwt.sign({ id: user.id }, JWT_RESET_SECRET, {
    expiresIn: "15m",
  });

  const frontendUrl = FRONTEND_URL.replace(/\/$/, "");
  const resetLink =
    `${frontendUrl}/reset-password/` + encodeURIComponent(resetToken);

  const subject = "Link Reset Password - Atma Kitchen";
  const text = `Halo ${user.username},\nKami menerima permintaan untuk mengatur ulang password akun Atma Kitchen Anda.\nSilakan buka tautan berikut untuk mengatur ulang password Anda: ${resetLink}.\nTautan ini hanya berlaku selama 15 menit. Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini.`;
  await sendEmail(user.email, subject, text);
  return {
    message: "Email reset password berhasil dikirim!",
  };
};

export const resetPassword = async ({ token, newPassword }) => {
  if (!token || !newPassword) {
    throw new Error("Token dan password baru wajib diisi!");
  }

  const { JWT_RESET_SECRET } = process.env;
  if (!JWT_RESET_SECRET) {
    throw new Error("JWT_RESET_SECRET belum tersedia pada server!");
  }

  if (typeof newPassword !== "string") {
    throw new Error("Password harus berupa teks!");
  } else if (newPassword.length < 8) {
    throw new Error("Password minimal 8 karakter!");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_RESET_SECRET);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      throw new Error("Link reset password sudah kedaluwarsa!");
    }
    throw new Error("Token reset password tidak valid!");
  }

  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error("Pengguna tidak ditemukan!");
  } else if (!user.isActive) {
    throw new Error("Akun pengguna tidak aktif!");
  }

  const hasPassword = await bcrypt.hash(newPassword, 10);
  user.password = hasPassword;
  await user.save();
  return {
    message: "Password berhasil diperbarui!",
  };
};
