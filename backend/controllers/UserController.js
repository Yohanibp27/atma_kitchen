import {
  getUsers as Users,
  getUserById as UserById,
  createUser as CreateUser,
  updateUser as UpdateUser,
  deleteUser as DeleteUser,
} from "../services/UserService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users();
    return res.status(200).json({
      message: "Berhasil mengambil seluruh data pengguna!",
      length: users.length,
      data: users,
    });
  } catch (e) {
    console.error("Get users error:", e.message);
    return res.status(500).json({
      message: "Gagal mengambil seluruh data pengguna!",
    });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserById(id);

    if (!user) {
      return res.status(404).json({
        message: "ID pengguna tidak ditemukan!",
      });
    }

    return res.status(200).json({
      message: `Berhasil menggambil data ID pengguna ${id}`,
      data: user,
    });
  } catch (e) {
    console.error("Get user error:", e.message);
    return res.status(500).json({
      message: "Gagal mengambil data pengguna!",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await CreateUser(req.body);
    return res.status(201).json({
      message: "Berhasil menambah data pengguna!",
      data: user,
    });
  } catch (e) {
    console.error("Create user error:", e.message);
    return res.status(400).json({
      message: "Gagal menambah data pengguna!",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UpdateUser(id, req.body);
    return res.status(200).json({
      message: "Berhasil mengubah data pengguna!",
      data: user,
    });
  } catch (e) {
    console.error("Update user error:", e.message);
    return res.status(400).json({
      message: "Gagal mengubah data pengguna!",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const user = await DeleteUser(id, requesterId);
    return res.status(200).json({
      message: "Berhasil menghapus data pengguna!",
      data: user,
    });
  } catch (e) {
    console.error("Delete user error:", e.message);
    return res.status(400).json({
      message: "Gagal menghapus data penggun!",
    });
  }
};
