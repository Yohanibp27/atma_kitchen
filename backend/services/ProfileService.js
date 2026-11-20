import bcrypt from "bcryptjs";
import { User, Role } from "../models/Associations.js";

export const getMyProfile = async (id) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
  });

  if (!user || !user.isActive) {
    throw new Error("Pengguna tidak ditemukan atau tidak aktif!");
  }
  return user;
};

export const updateMyProfile = async (
  id,
  { username, email, firstName, lastName, birthDate, address },
) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Pengguna tidak ditemukan atau tidak aktif!");
  }

  if (
    username === undefined &&
    email === undefined &&
    firstName === undefined &&
    lastName === undefined &&
    birthDate === undefined &&
    address === undefined
  ) {
    throw new Error("Tidak ada data profil yang diperbarui!");
  }

  if (username !== undefined) {
    if (typeof username !== "string" || !username.trim()) {
      throw new Error("Username tidak boleh kosong!");
    }

    const existingUsername = await User.findOne({
      where: { username: username.trim() },
    });
    if (existingUsername && existingUsername.id !== user.id) {
      throw new Error("Username sudah digunakan!");
    }

    user.username = username.trim();
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim()) {
      throw new Error("Email tidak boleh kosong!");
    }

    const normalizedEmail = email.trim().toLocaleLowerCase();

    const existingEmail = await User.findOne({
      where: { email: normalizedEmail },
    });
    if (existingEmail && existingEmail.id !== user.id) {
      throw new Error("Email sudah digunakan!");
    }

    user.email = normalizedEmail;
  }

  if (firstName !== undefined) {
    if (typeof firstName !== "string" || !firstName.trim()) {
      throw new Error("Nama depan tidak boleh kosong!");
    }

    user.firstName = firstName.trim();
  }

  if (birthDate !== undefined) {
    if (birthDate === null) {
      user.birthDate = null;
    } else {
      if (
        typeof birthDate !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)
      ) {
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

      user.birthDate = birthDate;
    }
  }

  if (address !== undefined) {
    if (address !== null && typeof address !== "string") {
      throw new Error("Alamat harus berupa teks atau null!");
    }
    user.address = address === null ? null : address.trim();
  }

  user.lastName = lastName.trim();
  await user.save();

  const updatedUser = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
  });
  return updatedUser;
};

export const changePassword = async (
  id,
  { currentPass, newPass, confirmPass },
) => {
  const user = await User.findByPk(id);
  if (!user || !user.isActive) {
    throw new Error("Pengguna tidak ditemukan atau akun tidak aktif!");
  }

  if (!currentPass) {
    throw new Error("Password lama wajib diisi!");
  } else if (!newPass) {
    throw new Error("Password baru wajib diisi!");
  } else if (!confirmPass) {
    throw new Error("Konfirmasi password wajib diisi!");
  }

  if (newPass.length < 8) {
    throw new Error("Password baru minimal 8 karakter!");
  }

  if (newPass !== confirmPass) {
    throw new Error("Konfirmasi password tidak sesuai!");
  }

  const isPassValid = await bcrypt.compare(currentPass, user.password);
  if (!isPassValid) {
    throw new Error("Password lama tidak sesuai!");
  }

  const isSamePassword = await bcrypt.compare(newPass, user.password);
  if (isSamePassword) {
    throw new Error("Password baru tidak boleh sama dengan password lama!");
  }

  const newPassword = await bcrypt.hash(newPass, 10);
  user.password = newPassword;
  await user.save();
  return true;
};
