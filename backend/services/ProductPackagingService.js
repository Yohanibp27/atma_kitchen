import {
  Category,
  Consignor,
  PackagingItem,
  Product,
  ProductPackaging,
  ProductVariant,
} from "../models/Associations.js";

export const getProductPackagings = async () => {
  const productPackagings = await ProductPackaging.findAll({
    include: [
      {
        model: ProductVariant,
        as: "product_variant",
        attributes: [
          "id",
          "productId",
          "variantName",
          "sizeDescription",
          "unit",
          "price",
          "salesType",
          "isActive",
        ],
        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "categoryId",
              "consignorId",
              "name",
              "description",
              "productOrigin",
              "productKind",
              "isActive",
            ],
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
                  "phone",
                  "email",
                  "address",
                  "profitShare",
                  "isActive",
                ],
              },
            ],
          },
        ],
      },
      {
        model: PackagingItem,
        as: "packaging_item",
        attributes: [
          "id",
          "name",
          "unit",
          "currentStock",
          "minimumStock",
          "isActive",
        ],
      },
    ],
    order: [["id", "ASC"]],
  });
  return productPackagings;
};

export const getProductPackagingById = async (id) => {
  const productPackaging = await ProductPackaging.findByPk(id, {
    include: [
      {
        model: ProductVariant,
        as: "product_variant",
        attributes: [
          "id",
          "productId",
          "variantName",
          "sizeDescription",
          "unit",
          "price",
          "salesType",
          "isActive",
        ],
        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "categoryId",
              "consignorId",
              "name",
              "description",
              "productOrigin",
              "productKind",
              "isActive",
            ],
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
                  "phone",
                  "email",
                  "address",
                  "profitShare",
                  "isActive",
                ],
              },
            ],
          },
        ],
      },
      {
        model: PackagingItem,
        as: "packaging_item",
        attributes: [
          "id",
          "name",
          "unit",
          "currentStock",
          "minimumStock",
          "isActive",
        ],
      },
    ],
    order: [["id", "ASC"]],
  });
  return productPackaging;
};

export const createProductPackaging = async ({
  productVariantId,
  packagingItemId,
  usageScope,
  quantity,
}) => {
  if (!packagingItemId) {
    throw new Error("Barang kemasan wajib diisi!");
  } else if (
    quantity === undefined ||
    quantity === null ||
    Number(quantity) <= 0
  ) {
    throw new Error("Kuantitas produk harus lebih dari 0!");
  }

  if (!["per_product", "per_order"].includes(usageScope)) {
    throw new Error("Cakupan penggunaan tidak valid!");
  }

  if (usageScope === "per_product") {
    if (!productVariantId) {
      throw new Error("Varian Produk wajib diisi untuk kemasan per produk!");
    }

    const productVariant = await ProductVariant.findByPk(productVariantId);
    if (!productVariant) {
      throw new Error("Varian produk tidak ditemukan!");
    }
  } else if (usageScope === "per_order") {
    if (productVariantId !== null && productVariantId !== undefined) {
      throw new Error(
        "Varian produk harus kosong untuk kemasan per transaksi!",
      );
    }
    productVariantId = null;
  }

  const packagingItem = await PackagingItem.findByPk(packagingItemId);
  if (!packagingItem) {
    throw new Error("Barang kemasan tidak ditemukan!");
  }

  const newProductPackaging = await Product.create({
    productVariantId,
    packagingItemId,
    usageScope,
    quantity,
  });
  return newProductPackaging;
};

export const updateProductPackaging = async (
  id,
  { productVariantId, packagingItemId, usageScope, quantity },
) => {
  const productPackaging = await ProductPackaging.findByPk(id);
  if (!productPackaging) {
    throw new Error("Kemasan produk tidak ditemukan!");
  }

  const updateProductVariantId =
    productVariantId !== undefined
      ? productVariantId
      : productPackaging.productVariantId;

  const updatePackagingItemId =
    packagingItemId !== undefined
      ? packagingItemId
      : productPackaging.packagingItemId;

  const updateUsageScope =
    usageScope !== undefined ? usageScope : productPackaging.usageScope;

  const updateQuantity =
    quantity !== undefined ? quantity : productPackaging.quantity;

  if (!updatePackagingItemId) {
    throw new Error("Barang kemasan wajib diisi!");
  }

  const packagingItem = await PackagingItem.findByPk(updatePackagingItemId);
  if (!packagingItem) {
    throw new Error("Barang kemasan tidak ditemukan!");
  }

  if (!["per_product", "per_order"].includes(usageScope)) {
    throw new Error("Cakupan penggunaan tidak valid!");
  }

  if (
    (updateQuantity === null) | (updateQuantity === "") ||
    !Number.isFinite(Number(updateQuantity)) ||
    Number(updateQuantity) <= 0
  ) {
    throw new Error("Kuantitas harus lebih dari 0!");
  }

  let finalProductVariantId = updatePackagingItemId;
  if (updateUsageScope === "per_order") {
    if (!finalProductVariantId) {
      throw new Error("Varian produk wajib diisi untuk kemasan per produk!");
    }

    const productVariant = await ProductVariant.findByPk(finalProductVariantId);
    if (!productVariant) {
      throw new Error("Varian produk tidak ditemukan!");
    }
  } else if (updateUsageScope === "per_order") {
    if (productVariantId !== undefined && productVariantId !== null) {
      throw new Error(
        "Varian produk harus kosong untuk kemasan per transaksi!",
      );
    }
    finalProductVariantId = null;
  }

  await productPackaging.update({
    productVariantId: finalProductVariantId,
    packagingItemId: updateProductVariantId,
    usageScope: updateUsageScope,
    quantity: updateQuantity,
  });
  return productPackaging;
};

export const deleteProductPackaging = async (id) => {
  const productPackaging = await ProductPackaging.findByPk(id);
  if (!productPackaging) {
    throw new Error("Kemasan produk tidak ditemukan!");
  }

  await productPackaging.destroy();
  return {
    id: productPackaging.id,
    productVariantId: productPackaging.productVariant.variantName,
    packagingItemId: productPackaging.packagingItem.id,
    quantity: productPackaging.quantity,
  };
};
