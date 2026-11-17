import {
  getProductPackagings as ProductPackagings,
  getProductPackagingById as ProductPackagingById,
  createProductPackaging as CreateProductPackaging,
  updateProductPackaging as UpdateProduckPackaging,
  deleteProductPackaging as DeleteProductPackaging,
} from "../services/ProductPackagingService.js";

export const getProductPackagings = async (req, res) => {
  try {
    const productPackagings = await ProductPackagings();
    return res.status(200).json({
      message: "Berhasil menampilkan seluruh data kemasan produk!",
      data: productPackagings,
    });
  } catch (e) {
    console.error("Get product packagings error:", e);
    return res.status(500).json({
      message: "Gagal mengambil seluruh data kemasan produk!",
    });
  }
};

export const getProductPackagingById = async (req, res) => {
  try {
    const { id } = req.params;
    const productPackaging = await ProductPackagingById(id);
    if (!productPackaging) {
      throw new Error("ID kemasan produk tidak ditemukan!");
    }

    return res.status(200).json({
      message: `Berhasil menampilkan data ID ${id} kemasan produk!`,
      data: productPackaging,
    });
  } catch (e) {
    console.error("Get product packaging error", e);
    return res.status(500).json({
      message: "Gagal mengambil data kemasan produk!",
      error: e.message,
    });
  }
};

export const createProductPackaging = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Body request tidak boleh kosong!",
      });
    }

    const productPackaging = await CreateProductPackaging(req.body);
    return res.status(200).json({
      message: "Berhasil menambah data kemasan produk!",
      data: productPackaging,
    });
  } catch (e) {
    console.error("Create product packaging error:", e);
    return res.status(500).json({
      message: "Gagal menambah data kemasan produk!",
      error: e.message,
    });
  }
};

export const updateProductPackaging = async (req, res) => {
  try {
    const { id } = res.params;
    const productPackaging = await UpdateProduckPackaging(id, req.body);
    return res.status(200).json({
      message: `Berhasil mengudat ID ${id} kemasan produk!`,
      data: productPackaging,
    });
  } catch (e) {
    console.error("Update product packaging error:", e);
    return res.status(500).json({
      message: "Gagal mengubah data kemasan produk!",
      error: e.message,
    });
  }
};

export const deleteProductPackaging = async (req, res) => {
  try {
    const { id } = req.params;
    const productPackaging = await DeleteProductPackaging(id);
    return res.status(200).json({
      message: `Berhasil menghapus ID ${id} kemasan produk`,
      data: productPackaging,
    });
  } catch (e) {
    console.error("Delete product packaging error:", e);
    return res.status(500).json({
      message: "Gagal menghapus data kemasan produk!",
      error: e.message,
    });
  }
};
