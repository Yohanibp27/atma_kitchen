import {
  User,
  Role,
  Permission,
  RolePermission,
} from "../models/Associations.js";
import bcrypt from "bcryptjs";

export const getUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
    order: [["id", "ASC"]],
  });
  return users;
};

export const getUserById = async (id) => {
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
  return user;
};

export const createUser = async ({
  username,
  email,
  firstName,
  lastName,
  password,
}) => {
  if (!username) {
    throw new Error("Username wajib diisi!");
  } else if (!email) {
    throw new Error("Email wajib diisi!");
  } else if (!firstName) {
    throw new Error("Nama depan wajib diisi!");
  } else if (!password) {
    throw new Error("Password wajib diisi!");
  }

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error("Username sudah digunakan!");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Format email tidak valid!");
  }

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    throw new Error("Email sudah digunakan!");
  }

  if (password.length < 8) {
    throw new Error("Password minimal 8 karakter!");
  }

  const defaultRole = await Role.findOne({ where: { name: "Customer" } });
  if (!defaultRole) {
    throw new Error("Nama role tidak ditemukan!");
  }

  const passwordHash = await bcrypt.hash(password, 10);
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

export const updateUser = async (
  id,
  { username, email, firstName, lastName, isActive },
) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("Pengguna tidak ditemukan!");
  }

  if (username !== undefined) {
    if (!username.trim()) {
      throw new Error("Username tidak boleh kosong!");
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername && existingUsername.id !== user.id) {
      throw new Error("Username sudah digunakan!");
    }
    user.username = username;
  }

  if (email !== undefined) {
    if (!email.trim()) {
      throw new Error("Email tidak boleh kosong!");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Format email tidak valid!");
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail && existingEmail.id !== user.id) {
      throw new Error("Email sudah digunakan!");
    }
    user.email = email;
  }

  if (firstName !== undefined) {
    if (!firstName.trim()) {
      throw new Error("Nama depan tidak boleh kosong!");
    }
    user.firstName = firstName;
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      throw new Error("Status akun harus berupa boolean!");
    }
    user.isActive = isActive;
  }

  user.lastName = lastName;
  await user.save();
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  };
};

export const deleteUser = async (id, requesterId) => {
  const user = await User.findByPk(id, {
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
  });

  if (!user) {
    throw new Error("Pengguna tidak ditemukan!");
  }

  // Mencegah pengguna menghapus akun diri sendiri
  if (Number(user.id) === Number(requesterId)) {
    throw new Error("Anda tidak dapat menghapus akun diri sendiri!");
  }

  // Jika target adalah Owner, Admin, Manager periksa jumlah Owner
  if (user.role.name === "Owner") {
    const totalOwner = await User.count({
      where: { roleId: user.roleId },
    });

    if (totalOwner <= 1) {
      throw new Error("Owner terkahir tidak dapat dihapus!");
    }
  }

  await user.destroy();
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role.name,
  };
};
