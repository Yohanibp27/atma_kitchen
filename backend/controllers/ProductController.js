import {
  getProducts as Products,
  getProductById as ProductById,
  createProduct as CreateProduct,
  updateProduct as UpdateProduct,
  deleteProduct as DeleteProduct,
} from "../services/ProductService.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products();
    return res.status(200).json({
      message: "Berhasil mengambil seluruh data produk!",
      data: products,
    });
  } catch (e) {
    console.error("Get products error:", e);
    return res.status(500).json({
      message: "Gagal mengambil seluruh data produk!",
      error: e.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductById(id);

    if (!product) {
      return res.status(404).json({
        message: `ID ${id} produk tidak ditemukan!`,
      });
    }

    return res.status(200).json({
      message: `Berhasil mengambil data ID produk ${id}`,
      data: product,
    });
  } catch (e) {
    console.error("Get product error:", e);
    return res.status(500).json({
      message: "Gagal mengambil data produk!",
      error: e.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await CreateProduct(req.body);
    return res.status(201).json({
      message: "Berhasil menambah data produk!",
      data: product,
    });
  } catch (e) {
    console.error("Create product error", e);
    return res.status(400).json({
      message: "Gagal menambah data produk!",
      error: e.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await UpdateProduct(id, req.body);
    return res.status(200).json({
      message: "Berhasil mengubah data produk!",
      data: product,
    });
  } catch (e) {
    console.error("Update product error:", e);
    return res.status(400).json({
      message: "Gagal mengubah data produk!",
      error: e.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await DeleteProduct(id);
    return res.status(200).json({
      message: `Berhasil menghapus data ID produk ${id}`,
      data: product,
    });
  } catch (e) {
    console.error("Delete product error:", e);
    return res.status(400).json({
      message: "Gagal menghapus data produk!",
      error: e.message,
    });
  }
};
