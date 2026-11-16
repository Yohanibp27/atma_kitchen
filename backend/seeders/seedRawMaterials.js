import db from "../config/Database.js";
import {
  RawMaterial,
  RecipeItem,
  Recipe,
  Product,
} from "../models/Associations.js";

const rawMaterialsData = [
  {
    name: "Butter",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Creamer",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Telur",
    unit: "butir",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Kuning Telur",
    unit: "buah",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Gula Pasir",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Susu Bubuk",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Tepung Terigu",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Garam",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Coklat Bubuk",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Selai Strawberry",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Coklat Batang",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Minyak Goreng",
    unit: "ml",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Tepung Maizena",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Baking Powder",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Kacang Kenari",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Ragi",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Susu Cair",
    unit: "ml",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Sosis Blackpepper",
    unit: "buah",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Whipped Cream",
    unit: "ml",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Susu Full Cream",
    unit: "ml",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Keju Mozarella",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Matcha Bubuk",
    unit: "gram",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
];

const recipesData = [
  // Lapis Legit
  {
    productName: "Lapis Legit 1 Loyang",
    name: "Lapis Legit",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },
  {
    productName: "Lapis Legit 1/2 Loyang",
    name: "Lapis Legit",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Lapis Surabaya
  {
    productName: "Lapis Surabaya 1 Loyang",
    name: "Lapis Surabaya",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },
  {
    productName: "Lapis Surabaya 1/2 Loyang",
    name: "Lapis Surabaya",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Brownies
  {
    productName: "Brownies 1 Loyang",
    name: "Brownies",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },
  {
    productName: "Brownies 1/2 Loyang",
    name: "Brownies",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Mandarin
  {
    productName: "Mandarin 1 Loyang",
    name: "Mandarin",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },
  {
    productName: "Mandarin 1/2 Loyang",
    name: "Mandarin",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Spikoe
  {
    productName: "Spikoe 1 Loyang",
    name: "Spikoe 1/2 Loyang",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Roti Sosis
  {
    productName: "Roti Sosis",
    name: "Roti Sosis",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Milk Bun
  {
    productName: "Milk Bun",
    name: "Milk Bun",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Roti Keju
  {
    productName: "Roti Keju",
    name: "Roti Keju",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Choco Creamy Latte
  {
    productName: "Choco Creamy Latte 1L",
    name: "Choco Creamy Latte",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Matcha Creamy Latte
  {
    productName: "Matcha Creamy Latte 1L",
    name: "Matcha Creamy Latte",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Paket A
  {
    productName: "Paket A",
    name: "Paket A",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Paket B
  {
    productName: "Paket B",
    name: "Paket B",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },

  // Paket C
  {
    productName: "Paket C",
    name: "Paket C",
    batchOutputQuantity: null,
    batchOutputUnit: null,
    instructions: true,
    isActive: true,
  },
];

const recipeItemsData = [
  // Lapis Legits
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Butter",
    quantity: 500,
    unit: "gram",
  },
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Creamer",
    quantity: 50,
    unit: "gram",
  },
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Telur",
    quantity: 50,
    unit: "butir",
  },
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Gula Pasir",
    quantity: 300,
    unit: "gram",
  },
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Susu Bubuk",
    quantity: 100,
    unit: "gram",
  },
  {
    recipeName: "Lapis Legit 1 Loyang",
    rawMaterialName: "Tepung Terigu",
    quantity: 20,
    unit: "gram",
  },

  // Lapis Surabaya
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Butter",
    quantity: 500,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Creamer",
    quantity: 50,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Telur",
    quantity: 40,
    unit: "butir",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Gula Pasir",
    quantity: 300,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Tepung Terigu",
    quantity: 100,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Susu Bubuk",
    quantity: 100,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Garam",
    quantity: 10,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Coklat Bubuk",
    quantity: 25,
    unit: "gram",
  },
  {
    recipeName: "Lapis Surabaya 1 Loyang",
    rawMaterialName: "Selai Strawberry",
    quantity: 100,
    unit: "gram",
  },

  // Brownies
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Coklat Batang",
    quantity: 250,
    unit: "gram",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Butter",
    quantity: 100,
    unit: "gram",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Minyak Goreng",
    quantity: 50,
    unit: "ml",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Telur",
    quantity: 6,
    unit: "butir",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Gula Pasir",
    quantity: 200,
    unit: "gram",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Tepung Terigu",
    quantity: 150,
    unit: "gram",
  },
  {
    recipeName: "Brownies 1 Loyang",
    rawMaterialName: "Coklat Bubuk",
    quantity: 60,
    unit: "gram",
  },

  // Mandarin
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Butter",
    quantity: 300,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Creamer",
    quantity: 30,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Telur",
    quantity: 30,
    unit: "butir",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Gula Pasir",
    quantity: 200,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Tepung Terigu",
    quantity: 80,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Susu Bubuk",
    quantity: 80,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Garam",
    quantity: 5,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Coklat Bubuk",
    quantity: 25,
    unit: "gram",
  },
  {
    recipeName: "Mandarin 1 Loyang",
    rawMaterialName: "Selai Strawberry",
    quantity: 50,
    unit: "gram",
  },

  // Spikoe
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Telur",
    quantity: 20,
    unit: "butir",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Gula Pasir",
    quantity: 200,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Tepung Terigu",
    quantity: 90,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Tepung Maizena",
    quantity: 20,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Susu Bubuk",
    quantity: 10,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Baking Powder",
    quantity: 5,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Butter",
    quantity: 200,
    unit: "gram",
  },
  {
    recipeName: "Spikoe 1 Loyang",
    rawMaterialName: "Kacang Kenari",
    quantity: 100,
    unit: "gram",
  },

  // Roti Sosis
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Tepung Terigu",
    quantity: 250,
    unit: "gram",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Gula Pasir",
    quantity: 30,
    unit: "gram",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Ragi",
    quantity: 3,
    unit: "gram",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Kuning Telur",
    quantity: 3,
    unit: "buah",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Susu Cair",
    quantity: 150,
    unit: "ml",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Butter",
    quantity: 50,
    unit: "gr",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Garam",
    quantity: 2,
    unit: "gram",
  },
  {
    recipeName: "Roti Sosis",
    rawMaterialName: "Sosis Blackpepper",
    quantity: 10,
    unit: "buah",
  },

  // Milk Bun
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Tepung Terigu",
    quantity: 250,
    unit: "gram",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Gula Pasir",
    quantity: 30,
    unit: "gram",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Ragi",
    quantity: 3,
    unit: "gram",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Kuning Telur",
    quantity: 4,
    unit: "buah",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Susu Cair",
    quantity: 300,
    unit: "ml",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Butter",
    quantity: 60,
    unit: "gram",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Garam",
    quantity: 3,
    unit: "gram",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Whipped Cream",
    quantity: 200,
    unit: "ml",
  },
  {
    recipeName: "Milk Bun",
    rawMaterialName: "Susu Bubuk",
    quantity: 50,
    unit: "gram",
  },

  // Roti Keju
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Tepung Terigu",
    quantity: 250,
    unit: "gram",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Gula Pasir",
    quantity: 30,
    unit: "gram",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Ragi",
    quantity: 3,
    unit: "gram",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Kuning Telur",
    quantity: 3,
    unit: "buah",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Susu Full Cream",
    quantity: 150,
    unit: "ml",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Butter",
    quantity: 50,
    unit: "gram",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Garam",
    quantity: 2,
    unit: "gram",
  },
  {
    recipeName: "Roti Keju",
    rawMaterialName: "Keju Mozarella",
    quantity: 350,
    unit: "gram",
  },

  // Chcoco Creamy Latte
  {
    recipeName: "Choco Creamy Latte 1L",
    rawMaterialName: "Coklat Bubuk",
    quantity: 120,
    unit: "gram",
  },
  {
    recipeName: "Choco Creamy Latte 1L",
    rawMaterialName: "Creamer",
    quantity: 80,
    unit: "gram",
  },
  {
    recipeName: "Choco Creamy Latte 1L",
    rawMaterialName: "Susu Cair",
    quantity: 800,
    unit: "ml",
  },

  // Matcha Creamy Latte
  {
    recipeName: "Matcha Creamy Latte 1L",
    rawMaterialName: "Matcha Bubuk",
    quantity: 120,
    unit: "gram",
  },
  {
    recipeName: "Matcha Creamy Latte 1L",
    rawMaterialName: "Creamer",
    quantity: 80,
    unit: "gram",
  },
  {
    recipeName: "Matcha Creamy Latte 1L",
    rawMaterialName: "Susu Cair",
    quantity: 800,
    unit: "ml",
  },
];

const seedDatabase = async () => {
  let transaction;
  try {
    transaction = await db.transaction();

    for (const rawMaterialData of rawMaterialsData) {
      await RawMaterial.findOrCreate({
        where: { name: rawMaterialData.name },
        defaults: rawMaterialData,
        transaction,
      });
    }

    const recipeByProductName = new Map();
    for (const recipeData of recipesData) {
      const product = await Product.findOne({
        where: { name: recipeData.productName },
        transaction,
      });

      if (!product) {
        throw new Error(`Product "${recipeData.productName}" tidak ditemukan!`);
      }

      const { productName, ...recipeAttributes } = recipeData;
      const [recipe] = await Recipe.findOrCreate({
        where: { productId: product.id },
        defaults: {
          ...recipeAttributes,
          productId: product.id,
        },
        transaction,
      });
      recipeByProductName.set(productName, recipe);
    }

    const recipeItemByRecipeAndMaterial = new Map();
    for (const recipeItemData of recipeItemsData) {
      const recipe = recipeByProductName.get(recipeItemData.recipeName);
      if (!recipe) {
        throw new Error(
          `Recipe untuk produk "${recipeItemData.recipeName}" tidak ditemukan!`,
        );
      }

      const rawMaterial = await RawMaterial.findOne({
        where: { name: recipeItemData.rawMaterialName },
        transaction,
      });
      if (!rawMaterial) {
        throw new Error(
          `Bahan baku "${recipeItemData.rawMaterialName}" tidak ditemukan!`,
        );
      }

      const { recipeName, rawMaterialName, ...itemAttributes } =
        recipeItemData;
      const [item] = await RecipeItem.findOrCreate({
        where: {
          recipeId: recipe.id,
          rawMaterialId: rawMaterial.id,
        },
        defaults: {
          ...itemAttributes,
          recipeId: recipe.id,
          rawMaterialId: rawMaterial.id,
        },
        transaction,
      });

      recipeItemByRecipeAndMaterial.set(`${recipe.id}:${rawMaterial.id}`, item);
    }

    await transaction.commit();
    console.log("Raw material seeded successfully!");
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error("Raw Material seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
};

seedDatabase();

// node seeders/seedRawMaterials.js
