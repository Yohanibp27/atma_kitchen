import {
  getRawMaterials as RawMaterials,
  getRawMaterialById as RawMaterialById,
  createRawMaterial as CreateRawMaterial,
  updateRawMaterial as UpdateRawMaterial,
  deleteRawMaterial as DeleteRawMaterial,
} from "../services/RawMaterialService.js";

export const getRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterials();
    return res.status(200).json({
      message: "Berhasil menampilkan seluruh bahan mentah!",
      data: rawMaterials,
    });
  } catch (e) {
    console.error("Get raw materials error:", e);
    return res.status(500).json({
      message: "Gagal mengambil seluruh data bahan mentah!",
      error: e.message,
    });
  }
};

export const getRawMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const rawmaterial = await RawMaterialById(id);
    if (!rawmaterial) {
      throw new Error(`ID ${id} data mentah tidak ditemukan!`);
    }

    return res.status(200).json({
      message: `Berhasil menampilkan data ID data mentah ${id}`,
      data: rawmaterial,
    });
  } catch (e) {
    console.error("Get raw material error:", e);
    return res.status(500).json({
      message: "Gagal mengambil data bahan mentah!",
      error: e.message,
    });
  }
};

export const createRawMaterial = async (req, res) => {
  try {
    const rawMaterial = await CreateRawMaterial(req.body);
    return res.status(200).json({
      message: "Berhasil menambah data mentah!",
      data: rawMaterial,
    });
  } catch (e) {
    console.error("Create raw material error:", e);
    return res.status(500).json({
      message: "Gagal membuat data bahan mentah!",
      error: e.message,
    });
  }
};

export const updateRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const rawMaterial = await UpdateRawMaterial(id, req.body);
    return res.status(200).json({
      message: "Berhasil mengubah data bahan mentah!",
      data: rawMaterial,
    });
  } catch (e) {
    console.error("Update raw material error:", e);
    return res.status(500).json({
      message: "Gagal mengubah data bahan mentah!",
      error: e.message,
    });
  }
};

export const deleteRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const rawMaterial = await DeleteRawMaterial(id);
    return res.status(200).json({
      message: "Berhasil menghapus data bahan mentah!",
      data: rawMaterial,
    });
  } catch (e) {
    console.error("Delete raw material error:", e);
    return res.status(500).json({
      message: "Gagal mengahapus data bahan mentah!",
      error: e.message,
    });
  }
};
