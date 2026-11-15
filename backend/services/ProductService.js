import {
  Category,
  Consignor,
  Product,
  ProductVariant,
  ProductBundleItem,
} from "../models/Associations.js";

export const getProducts = async () => {
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "description", "isActive"],
      },
      {
        model: Consignor,
        as: "consignor",
        attributes: [
          "id",
          "name",
          "email",
          "address",
          "profitShare",
          "isActive",
        ],
      },
    ],
    order: [["id", "ASC"]],
  });
  return products;
};

export const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "description", "isActive"],
      },
      {
        model: Consignor,
        as: "consignor",
        attributes: [
          "id",
          "name",
          "email",
          "address",
          "profitShare",
          "isActive",
        ],
      },
    ],
    order: [["id", "ASC"]],
  });

  if (!product) {
    throw new Error("Produk tidak ditemukan!");
  }
  return product;
};

export const createProduct = async ({
  categoryId,
  consignorId,
  name,
  description,
  productOrigin,
  productKind,
  isActive = true,
}) => {
  if (!categoryId) {
    throw new Error("Kategori produk wajib diisi!");
  } else if (!name || !name.trim()) {
    throw new Error("Nama produk wajib diisi!");
  } else if (!productOrigin) {
    throw new Error("Asal produk wajib dipilih!");
  } else if (!productKind) {
    throw new Error("Jenis produk wajib dipilih!");
  } else if (typeof isActive !== "boolean") {
    throw new Error("Status produk harus berupa boolean!");
  }

  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new Error("Kategori produk tidak ditemukan!");
  }

  const existingName = await Product.findOne({ where: { name: name.trim() } });
  if (existingName) {
    throw new Error("Nama produk sudah digunakan!");
  }

  if (productOrigin === "consignment") {
    if (!consignorId) {
      throw new Error("Produk konsinyasi wajib memeiliki penitip!");
    }

    const consignor = await Consignor.findByPk(consignorId);
    if (!consignor) {
      throw new Error("Data penitip tidak ditemukan!");
    }
  }

  const newProduct = await Product.create({
    categoryId,
    consignorId: productOrigin === "consignment" ? consignorId : null,
    name,
    description,
    productOrigin,
    productKind,
    isActive,
  });

  return {
    id: newProduct.id,
    categoryId: newProduct.categoryId,
    name: newProduct.name.trim(),
    description: newProduct.description,
    productOrigin: newProduct.productOrigin,
    productKind: newProduct.productKind,
    isActive: newProduct.isActive,
  };
};

export const updateProduct = async (
  id,
  {
    categoryId,
    consignorId,
    name,
    description,
    productOrigin,
    productKind,
    isActive,
  },
) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Produk tidak ditemukan!");
  }

  if (categoryId !== undefined) {
    if (!categoryId) {
      throw new Error("Kategori produk wajib diisi!");
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Kategori produk tidak ditemukan!");
    }
    product.categoryId = categoryId;
  }

  if (name !== undefined) {
    if (!name.trim()) {
      throw new Error("Nama produk tidak boleh kosong!");
    }

    const existingName = await Product.findOne({ where: { name } });
    if (existingName && existingName.id !== product.id) {
      throw new Error("Nama produk sudah digunakan!");
    }
    product.name = name;
  }

  if (description !== undefined) {
    product.description = description;
  }

  if (product.productOrigin === "consignment") {
    const finalConsignorId =
      consignorId !== undefined ? consignorId : product.consignorId;

    if (!finalConsignorId) {
      throw new Error("Produk konsinyasi wajib memiliki pemasok!");
    }

    const consignor = await Consignor.findByPk(finalConsignorId);
    if (!consignor) {
      throw new Error("Data pemasok tidak ditemukan!");
    }
    product.consignorId = finalConsignorId;
  } else {
    product.consignorId = null;
  }

  if (productOrigin !== undefined) {
    if (!["own_production", "consignment"].includes(productOrigin)) {
      throw new Error("Asal produk tidak valid!");
    }
    product.productOrigin = productOrigin;
  }

  if (productKind !== undefined) {
    if (!["standard", "bundle"].includes(productKind)) {
      throw new Error("Jenis produk tidak valid!");
    }
    product.productKind = productKind;
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      throw new Error("Status produk harus berupa boolean!");
    }
    product.isActive = isActive;
  }

  await product.save();
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Produk tidak ditemukan!");
  }

  if (!product.isActive) {
    throw new Error("Produk sudah dinonaktifkan!");
  }

  product.isActive = false;
  await product.save();
  return {
    id: product.id,
    name: product.name,
    isActive: product.isActive,
    message: "Produk berhasil dinonaktifkan!",
  };
};
