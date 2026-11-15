import db from "../config/Database.js";
import {
  Category,
  Consignor,
  Product,
  ProductBundleItem,
  ProductVariant,
} from "../models/Associations.js";

const categoriesData = [
  {
    name: "Cake",
    description: "Berbagai jenis kue produksi Atma Kitchen",
    isActive: true,
  },
  {
    name: "Roti",
    description: "Berbagai jenis roti produksi Atma Kitchen",
    isActive: true,
  },
  {
    name: "Minuman",
    description: "Berbagai jenis minuman produksi Atma Kitchen",
    isActive: true,
  },
  {
    name: "Titipan",
    description: "Produk dari mitra atau consignor",
    isActive: true,
  },
  {
    name: "Hampers",
    description: "Paket produk Atma Kitchen",
    isActive: true,
  },
];

const consignorsData = [
  {
    name: "CV Aneka Snack Nusantara",
    phone: "081234567801",
    email: "aneka.snack@example.com",
    address: null,
    profitShare: 20,
    isActive: true,
  },
  {
    name: "PT Kopi Nusantara Sejahtera",
    phone: "081234567802",
    email: "kopi.nusantara@example.com",
    address: null,
    profitShare: 20,
    isActive: true,
  },
  {
    name: "UD Matcha Organik Jogja",
    phone: "081234567803",
    email: "matcha.organik@example.com",
    address: null,
    profitShare: 20,
    isActive: true,
  },
  {
    name: "CV Cokelat Premium Indonesia",
    phone: "081234567804",
    email: "cokelat.premium@example.com",
    address: null,
    profitShare: 20,
    isActive: true,
  },
  {
    name: "Toko Keripik Berkah",
    phone: "081234567805",
    email: "keripik.berkah@example.com",
    address: null,
    profitShare: 20,
    isActive: true,
  },
];

const productsData = [
  // Cake
  {
    categoryName: "Cake",
    name: "Lapis Legit 1 Loyang",
    description: "Lapis legit per loyang dengan ukuran 20x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Lapis Legit 1/2 Loyang",
    description: "Lapis legit per 1/2 dengan ukuran 10x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Lapis Surabaya 1 Loyang",
    description: "Lapis surabaya per loyang dengan ukuran 20x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Lapis Surabaya 1/2 Loyang",
    description: "Lapis surabaya per 1/2 loyangdengan ukuran 10x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Brownies 1 Loyang",
    description: "Brownies per loyang dengan ukuran 20x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Brownies 1/2 Loyang",
    description: "Brownies per 1/2 loyang dengan ukuran 10x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Mandarin 1 Loyang",
    description: "Mandarin per loyang dengan ukuran 20x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Mandarin 1/2 Loyang",
    description: "Mandarin per 1/2 loyang dengan ukuran 10x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Spikoe Per Loyang",
    description: "Spikoe per loyang dengan ukuran 20x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Cake",
    name: "Spikoe 1/2 Loyang",
    description: "Spikoe per 1/2 loyang dengan ukuran 10x20",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },

  // Roti
  {
    categoryName: "Roti",
    name: "Roti Sosis",
    description: "Roti sosis per box isi 10",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Roti",
    name: "Milk Bun",
    description: "Milk bun per box isi 10",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Roti",
    name: "Roti Keju",
    description: "Roti keju per box isi 10",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },

  // Minuman
  {
    categoryName: "Minuman",
    name: "Choco Creamy Latte 1L",
    description: "Choco creamy latte berisi 1L",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Minuman",
    name: "Matcha Creamy Latte 1L",
    description: "Matcha creamy latte dengan ukuran 1L",
    productOrigin: "own_production",
    productKind: "standard",
    isActive: true,
  },

  // Titipan
  {
    categoryName: "Titipan",
    consignorEmail: "keripik.berkah@example.com",
    name: "Kripik Kentang",
    description: "Kripik kentang dengan berat 250gr",
    productOrigin: "consignment",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Titipan",
    consignorEmail: "kopi.nusantara@example.com",
    name: "Kopi Luwak Bubuk",
    description: "Kopi luwak bubuk dengan berat 250gr",
    productOrigin: "consignment",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Titipan",
    consignorEmail: "matcha.organik@example.com",
    name: "Mactha Organik Bubuk",
    description: "Matcha organik bubuk dengan berat 100gr",
    productOrigin: "consignment",
    productKind: "standard",
    isActive: true,
  },
  {
    categoryName: "Titipan",
    consignorEmail: "cokelat.premium@example.com",
    name: "Chocolate Bar",
    description: "Chocolate bar dengan berat 100gr",
    productOrigin: "consignment",
    productKind: "standard",
    isActive: true,
  },

  // Hampers
  {
    categoryName: "Hampers",
    name: "Paket A",
    description:
      "Hampers berisi Lapis Legit 1/2 loyang, Brownies 1/2 loyang, exlusive box dan card",
    productOrigin: "own_production",
    productKind: "bundle",
    isActive: true,
  },
  {
    categoryName: "Hampers",
    name: "Paket B",
    description:
      "Hampers berisi Lapis Surabaya 1/2 loyang, Roti Sosis isi 10, exlusive box dan card",
    productOrigin: "own_production",
    productKind: "bundle",
    isActive: true,
  },
  {
    categoryName: "Hampers",
    name: "Paket C",
    description:
      "Hampers berisi Spokie 1/2 loyang, Matcha Creamy Latte 1L, exlusive box dan card",
    productOrigin: "own_production",
    productKind: "bundle",
    isActive: true,
  },
];

const productVariantsData = [
  // Cake
  {
    productName: "Lapis Legit 1 Loyang",
    variantName: "20x20",
    sizeDescription: "Per loyang ukuran 20x20",
    unit: "Loyang",
    price: 850000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Lapis Legit 1/2 Loyang",
    variantName: "10x20",
    sizeDescription: "Per 1/2 loyang ukuran 10x20",
    unit: "loyang",
    price: 450000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Lapis Surabaya 1 Loyang",
    variantName: "20x20",
    sizeDescription: "Per loyang ukuran 20x20",
    unit: "loyang",
    price: 550000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Lapis Surabaya 1/2 Loyang",
    variantName: "10x20",
    sizeDescription: "Per 1/2 loyang ukuran 10x20",
    unit: "loyang",
    price: 300000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Brownies 1 Loyang",
    variantName: "20x20",
    sizeDescription: "Per loyang ukuran 20x20",
    unit: "loyang",
    price: 250000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Brownies 1/2 Loyang",
    variantName: "10x20",
    sizeDescription: "Per 1/2 loyang ukuran 10x20",
    unit: "loyang",
    price: 150000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Mandarin 1 Loyang",
    variantName: "20x20",
    sizeDescription: "Per loyang ukuran 20x20",
    unit: "loyang",
    price: 450000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Mandarin 1/2 Loyang",
    variantName: "10x20",
    sizeDescription: "Per 1/2 loyang ukuran 10x20",
    unit: "loyang",
    price: 250000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Spikoe Per Loyang",
    variantName: "20x20",
    sizeDescription: "Per loyang ukuran 20x20",
    unit: "loyang",
    price: 350000,
    salesType: "pre_order",
    isActive: true,
  },
  {
    productName: "Spikoe 1/2 Loyang",
    variantName: "10x20",
    sizeDescription: "Per 1/2 loyang ukuran 10x20",
    unit: "loyang",
    price: 200000,
    salesType: "pre_order",
    isActive: true,
  },

  // Roti
  {
    productName: "Roti Sosis",
    variantName: "Box isi 10",
    sizeDescription: "10 roti per box",
    unit: "box",
    price: 180000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Milk Bun",
    variantName: "Box isi 10",
    sizeDescription: "10 roti per box",
    unit: "box",
    price: 120000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Roti Keju",
    variantName: "Box isi 10",
    sizeDescription: "10 roti per box",
    unit: "box",
    price: 150000,
    salesType: "ready_stock",
    isActive: true,
  },

  // Minuman
  {
    productName: "Choco Creamy Latte 1L",
    variantName: "1 Liter",
    sizeDescription: "1 liter",
    unit: "liter",
    price: 75000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Matcha Creamy Latte 1L",
    variantName: "1 Liter",
    sizeDescription: "1 liter",
    unit: "liter",
    price: 100000,
    salesType: "ready_stock",
    isActive: true,
  },

  // Titipan
  {
    productName: "Kripik Kentang",
    variantName: "250 gram",
    sizeDescription: "250gr per bungkus",
    unit: "bungkus",
    price: 75000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Kopi Luwak Bubuk",
    variantName: "250 gram",
    sizeDescription: "250gr per bungkus",
    unit: "bungkus",
    price: 250000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Mactha Organik Bubuk",
    variantName: "100 gram",
    sizeDescription: "100gr per bungkus",
    unit: "bungkus",
    price: 300000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Chocolate Bar",
    variantName: "100 gram",
    sizeDescription: "100gr per batang",
    unit: "batang",
    price: 120000,
    salesType: "ready_stock",
    isActive: true,
  },

  // Hampers
  {
    productName: "Paket A",
    variantName: "Hampers",
    sizeDescription:
      "Lapis Legit ½ Loyang + Brownies ½ Loyang + exclusive box and card",
    unit: "paket",
    price: 650000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Paket B",
    variantName: "Hampers",
    sizeDescription:
      "Lapis Surabaya ½ Loyang + Roti Sosis + exclusive box and card",
    unit: "paket",
    price: 500000,
    salesType: "ready_stock",
    isActive: true,
  },
  {
    productName: "Paket C",
    variantName: "Hampers",
    sizeDescription:
      "Spikoe ½ Loyang + Matcha Creamy Latte + exclusive box and card",
    unit: "paket",
    price: 350000,
    salesType: "ready_stock",
    isActive: true,
  },
];

const productBundleItemsData = [
  {
    bundleProductName: "Paket A",
    bundleVariantName: "Hampers",
    componentProductName: "Lapis Legit 1/2 Loyang",
    componentVariantName: "10x20",
    quantity: 1,
  },
  {
    bundleProductName: "Paket A",
    bundleVariantName: "Hampers",
    componentProductName: "Brownies 1/2 Loyang",
    componentVariantName: "10x20",
    quantity: 1,
  },
  {
    bundleProductName: "Paket B",
    bundleVariantName: "Hampers",
    componentProductName: "Lapis Surabaya 1/2 Loyang",
    componentVariantName: "10x20",
    quantity: 1,
  },
  {
    bundleProductName: "Paket B",
    bundleVariantName: "Hampers",
    componentProductName: "Roti Sosis",
    componentVariantName: "Box isi 10",
    quantity: 1,
  },
  {
    bundleProductName: "Paket C",
    bundleVariantName: "Hampers",
    componentProductName: "Spikoe 1/2 Loyang",
    componentVariantName: "10x20",
    quantity: 1,
  },
  {
    bundleProductName: "Paket C",
    bundleVariantName: "Hampers",
    componentProductName: "Matcha Creamy Latte 1L",
    componentVariantName: "1 Liter",
    quantity: 1,
  },
];

const seedDatabase = async () => {
  let transaction;

  try {
    transaction = await db.transaction();

    for (const categoryData of categoriesData) {
      await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData,
        transaction,
      });
    }

    for (const consignorData of consignorsData) {
      await Consignor.findOrCreate({
        where: { email: consignorData.email },
        defaults: consignorData,
        transaction,
      });
    }

    const productsByName = new Map();
    for (const productData of productsData) {
      const category = await Category.findOne({
        where: { name: productData.categoryName },
        transaction,
      });

      if (!category) {
        throw new Error(
          `Category "${productData.categoryName}" tidak ditemukan.`,
        );
      }

      let consignorId = null;
      if (productData.consignorEmail) {
        const consignor = await Consignor.findOne({
          where: { email: productData.consignorEmail },
          transaction,
        });

        if (!consignor) {
          throw new Error(
            `Consignor dengan email "${productData.consignorEmail}" tidak ditemukan.`,
          );
        }
        consignorId = consignor.id;
      }

      const { categoryName, consignorEmail, ...productAttributes } =
        productData;
      const [product] = await Product.findOrCreate({
        where: { name: productData.name },
        defaults: {
          ...productAttributes,
          categoryId: category.id,
          consignorId,
        },
        transaction,
      });
      productsByName.set(product.name, product);
    }

    const variantsByProductAndName = new Map();
    for (const productVariantData of productVariantsData) {
      const product = productsByName.get(productVariantData.productName);
      if (!product) {
        throw new Error(
          `Product "${productVariantData.productName}" tidak ditemukan.`,
        );
      }

      const { productName, ...variantAttributes } = productVariantData;
      const [variant] = await ProductVariant.findOrCreate({
        where: {
          productId: product.id,
          variantName: variantAttributes.variantName,
        },
        defaults: { ...variantAttributes, productId: product.id },
        transaction,
      });
      variantsByProductAndName.set(
        `${productVariantData.productName}::${variantAttributes.variantName}`,
        variant,
      );
    }

    for (const productBundleItemData of productBundleItemsData) {
      const bundleVariant = variantsByProductAndName.get(
        `${productBundleItemData.bundleProductName}::${productBundleItemData.bundleVariantName}`,
      );
      const componentVariant = variantsByProductAndName.get(
        `${productBundleItemData.componentProductName}::${productBundleItemData.componentVariantName}`,
      );

      if (!bundleVariant || !componentVariant) {
        throw new Error(
          `Variant bundle atau komponen tidak ditemukan: "${productBundleItemData.bundleProductName}" / "${productBundleItemData.componentProductName}".`,
        );
      }

      await ProductBundleItem.findOrCreate({
        where: {
          bundleVariantId: bundleVariant.id,
          componentVariantId: componentVariant.id,
        },
        defaults: { quantity: productBundleItemData.quantity },
        transaction,
      });
    }

    await transaction.commit();

    console.log(
      "Category, consignor, product, variant, dan bundle item seeded successfully.",
    );
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error("Product seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
};

seedDatabase();

// node seeders/seedProducts.js
