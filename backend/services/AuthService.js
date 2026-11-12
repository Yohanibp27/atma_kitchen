// Service mengelola logika dan proses registrasi, login, dll
import bcrypt from "bcryptjs";
import {
  User,
  Role,
  Permission,
  RolePermission,
} from "../models/Associations.js";
import jwt from "jsonwebtoken";

export const register = async ({
  username,
  firstName,
  lastName,
  email,
  password,
}) => {
  // Validasi input
  if (!username) {
    throw new Error("Username wajib diisi!");
  } else if (!firstName) {
    throw new Error("Nama depan wajib diisi!");
  } else if (!email) {
    throw new Error("Email wajib diisi!");
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
    password: passwordHash,
    roleId: defaultRole.id,
  });

  return {
    id: newUser.id,
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
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
