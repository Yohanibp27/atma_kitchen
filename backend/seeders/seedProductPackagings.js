import db from "../config/Database.js";
import {
  PackagingItem,
  Product,
  ProductPackaging,
  ProductVariant,
} from "../models/Associations.js";

// sudah ada data seed pada seedPackagingItems.js
// const packagingItemsData = [
//   {
//     name: "Box Cake 20x20 cm",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
//   {
//     name: "Box Cake 20x10 cm",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
//   {
//     name: "Botol 1 Liter",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
//   {
//     name: "Box Premium",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
//   {
//     name: "Kartu Ucapan",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
//   {
//     name: "Tas Spunbond",
//     unit: "pcs",
//     currentStock: 0,
//     minimumStock: 0,
//     isActive: true,
//   },
// ];

// sudah ada data seed pada seedProducts.js
// const productVariantsData = [
//   // Cake
//   {
//     productName: "Lapis Legit 1 Loyang",
//     variantName: "20x20",
//     sizeDescription: "Per loyang ukuran 20x20",
//     unit: "Loyang",
//     price: 850000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Lapis Legit 1/2 Loyang",
//     variantName: "10x20",
//     sizeDescription: "Per 1/2 loyang ukuran 10x20",
//     unit: "loyang",
//     price: 450000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Lapis Surabaya 1 Loyang",
//     variantName: "20x20",
//     sizeDescription: "Per loyang ukuran 20x20",
//     unit: "loyang",
//     price: 550000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Lapis Surabaya 1/2 Loyang",
//     variantName: "10x20",
//     sizeDescription: "Per 1/2 loyang ukuran 10x20",
//     unit: "loyang",
//     price: 300000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Brownies 1 Loyang",
//     variantName: "20x20",
//     sizeDescription: "Per loyang ukuran 20x20",
//     unit: "loyang",
//     price: 250000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Brownies 1/2 Loyang",
//     variantName: "10x20",
//     sizeDescription: "Per 1/2 loyang ukuran 10x20",
//     unit: "loyang",
//     price: 150000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Mandarin 1 Loyang",
//     variantName: "20x20",
//     sizeDescription: "Per loyang ukuran 20x20",
//     unit: "loyang",
//     price: 450000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Mandarin 1/2 Loyang",
//     variantName: "10x20",
//     sizeDescription: "Per 1/2 loyang ukuran 10x20",
//     unit: "loyang",
//     price: 250000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Spikoe Per Loyang",
//     variantName: "20x20",
//     sizeDescription: "Per loyang ukuran 20x20",
//     unit: "loyang",
//     price: 350000,
//     salesType: "pre_order",
//     isActive: true,
//   },
//   {
//     productName: "Spikoe 1/2 Loyang",
//     variantName: "10x20",
//     sizeDescription: "Per 1/2 loyang ukuran 10x20",
//     unit: "loyang",
//     price: 200000,
//     salesType: "pre_order",
//     isActive: true,
//   },

//   // Roti
//   {
//     productName: "Roti Sosis",
//     variantName: "Box isi 10",
//     sizeDescription: "10 roti per box",
//     unit: "box",
//     price: 180000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Milk Bun",
//     variantName: "Box isi 10",
//     sizeDescription: "10 roti per box",
//     unit: "box",
//     price: 120000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Roti Keju",
//     variantName: "Box isi 10",
//     sizeDescription: "10 roti per box",
//     unit: "box",
//     price: 150000,
//     salesType: "ready_stock",
//     isActive: true,
//   },

//   // Minuman
//   {
//     productName: "Choco Creamy Latte 1L",
//     variantName: "1 Liter",
//     sizeDescription: "1 liter",
//     unit: "liter",
//     price: 75000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Matcha Creamy Latte 1L",
//     variantName: "1 Liter",
//     sizeDescription: "1 liter",
//     unit: "liter",
//     price: 100000,
//     salesType: "ready_stock",
//     isActive: true,
//   },

//   // Titipan
//   {
//     productName: "Kripik Kentang",
//     variantName: "250 gram",
//     sizeDescription: "250gr per bungkus",
//     unit: "bungkus",
//     price: 75000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Kopi Luwak Bubuk",
//     variantName: "250 gram",
//     sizeDescription: "250gr per bungkus",
//     unit: "bungkus",
//     price: 250000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Mactha Organik Bubuk",
//     variantName: "100 gram",
//     sizeDescription: "100gr per bungkus",
//     unit: "bungkus",
//     price: 300000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Chocolate Bar",
//     variantName: "100 gram",
//     sizeDescription: "100gr per batang",
//     unit: "batang",
//     price: 120000,
//     salesType: "ready_stock",
//     isActive: true,
//   },

//   // Hampers
//   {
//     productName: "Paket A",
//     variantName: "Hampers",
//     sizeDescription:
//       "Lapis Legit ½ Loyang + Brownies ½ Loyang + exclusive box and card",
//     unit: "paket",
//     price: 650000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Paket B",
//     variantName: "Hampers",
//     sizeDescription:
//       "Lapis Surabaya ½ Loyang + Roti Sosis + exclusive box and card",
//     unit: "paket",
//     price: 500000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
//   {
//     productName: "Paket C",
//     variantName: "Hampers",
//     sizeDescription:
//       "Spikoe ½ Loyang + Matcha Creamy Latte + exclusive box and card",
//     unit: "paket",
//     price: 350000,
//     salesType: "ready_stock",
//     isActive: true,
//   },
// ];

const productPackagingsData = [
  // Cake 1 loyang
  {
    productName: "Lapis Legit 1 loyang",
    variantName: "20x20",
    packagingItemName: "Box cake 20x20 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Lapis Surabaya 1 loyang",
    variantName: "20x20",
    packagingItemName: "Box cake 20x20 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Brownies 1 loyang",
    variantName: "20x20",
    packagingItemName: "Box cake 20x20 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Mandarin 1 loyang",
    variantName: "20x20",
    packagingItemName: "Box cake 20x20 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Spikoe 1 loyang",
    variantName: "20x20",
    packagingItemName: "Box cake 20x20 cm",
    usageScope: "per_product",
    quantity: 1,
  },

  // Cake 1/2 loyang
  {
    productName: "Lapis Legit 1/2 loyang",
    variantName: "10x20",
    packagingItemName: "Box cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Lapis Surabaya 1/2 loyang",
    variantName: "10x20",
    packagingItemName: "Box Cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Brownies 1/2 loyang",
    variantName: "10x20",
    packagingItemName: "Box cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Mandarin 1/2 loyang",
    variantName: "10x20",
    packagingItemName: "Box cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Spikoe 1/2 loyang",
    variantName: "10x20",
    packagingItemName: "Box cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },

  // Roti
  {
    productName: "Roti Sosis",
    variantName: "Box isi 10",
    packagingItemName: "Box Cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Milk Bun",
    variantName: "Box isi 10",
    packagingItemName: "Box Cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Roti Keju",
    variantName: "Box isi 10",
    packagingItemName: "Box Cake 20x10 cm",
    usageScope: "per_product",
    quantity: 1,
  },

  // Minuman
  {
    productName: "Choco Creamy Latte 1L",
    variantName: "1 Liter",
    packagingItemName: "Botol 1 Liter",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Matcha Creamy Latte 1L",
    variantName: "1 Liter",
    packagingItemName: "Botol 1 Liter",
    usageScope: "per_product",
    quantity: 1,
  },

  // Hampers
  {
    productName: "Paket A",
    variantName: "Hampers",
    packagingItemName: "Box Premium",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Paket A",
    variantName: "Hampers",
    packagingItemName: "Kartu Ucapan",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Paket B",
    variantName: "Hampers",
    packagingItemName: "Box Premium",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Paket B",
    variantName: "Hampers",
    packagingItemName: "Kartu Ucapan",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Paket C",
    variantName: "Hampers",
    packagingItemName: "Box Premium",
    usageScope: "per_product",
    quantity: 1,
  },
  {
    productName: "Paket C",
    variantName: "Hampers",
    packagingItemName: "Kartu Ucapan",
    usageScope: "per_product",
    quantity: 1,
  },

  // Kemasan per transaksi
  {
    productName: null,
    variantName: null,
    packagingItemName: "Tas Spunbond",
    usageScope: "per_order",
    quantity: 1,
  },
];

const seedDatabase = async () => {
  let transaction;
  try {
    transaction = await db.transaction();

    // for (const packagingItemData of packagingItemsData) {
    //   await PackagingItem.findOrCreate({
    //     where: { name: packagingItemData.name },
    //     defaults: packagingItemData,
    //     transaction,
    //   });
    // }

    // const variantsByProductAndName = new Map();
    // for (const productVariantData of productVariantsData) {
    //   const product = productsByName.get(productVariantData.productName);
    //   if (!product) {
    //     throw new Error(
    //       `Product "${productVariantData.productName}" tidak ditemukan.`,
    //     );
    //   }

    //   const { productName, ...variantAttributes } = productVariantData;
    //   const [variant] = await ProductVariant.findOrCreate({
    //     where: {
    //       productId: product.id,
    //       variantName: variantAttributes.variantName,
    //     },
    //     defaults: { ...variantAttributes, productId: product.id },
    //     transaction,
    //   });
    //   variantsByProductAndName.set(
    //     `${productVariantData.productName}::${variantAttributes.variantName}`,
    //     variant,
    //   );
    // }

    for (const productPackagingData of productPackagingsData) {
      let productVariantId = null;

      if (productPackagingData.usageScope === "per_product") {
        if (
          !productPackagingData.productName ||
          !productPackagingData.variantName
        ) {
          throw new Error(
            "Nama produk dan varian wajib diisi untuk usageScope per_product!",
          );
        }

        const product = await Product.findOne({
          where: { name: productPackagingData.productName },
          transaction,
        });
        if (!product) {
          throw new Error(
            `Product "${productPackagingData.productName}" tidak ditemukan!`,
          );
        }

        const productVariant = await ProductVariant.findOne({
          where: {
            productId: product.id,
            variantName: productPackagingData.variantName,
          },
          transaction,
        });
        if (!productVariant) {
          throw new Error(
            `Variant "${productPackagingData.variantName}" untuk product "${productPackagingData.productName}" tidak ditemukan!`,
          );
        }
        productVariantId = productVariant.id;
      }

      if (productPackagingData.usageScope === "per_order") {
        if (
          productPackagingData.productName ||
          productPackagingData.variantName
        ) {
          throw new Error(
            "ProductName dan variantName harus null untuk useageScope per_order!",
          );
        }
      }

      const packagingItem = await PackagingItem.findOne({
        where: { name: productPackagingData.packagingItemName },
        transaction,
      });
      if (!packagingItem) {
        throw new Error(
          `Packaging item "${productPackagingData.packagingItemName}" tidak ditemukan!`,
        );
      }

      await ProductPackaging.findOrCreate({
        where: {
          productVariantId,
          packagingItemId: packagingItem.id,
          usageScope: productPackagingData.usageScope,
        },
        defaults: {
          productVariantId,
          packagingItemId: packagingItem.id,
          usageScope: productPackagingData.usageScope,
          quantity: productPackagingData.quantity,
        },
        transaction,
      });
    }

    await transaction.commit();
    console.log("Product packaging seeded successfully!");
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error("Product Packaging seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
};

seedDatabase();

// node seeders/seedProductPackagings.js
