import db from "../config/Database.js";
import { PackagingItem } from "../models/Associations.js";

const packagingItemsData = [
  {
    name: "Box Cake 20x20 cm",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Box Cake 20x10 cm",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Botol 1 Liter",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Box Premium",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Kartu Ucapan",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
  {
    name: "Tas Spunbond",
    unit: "pcs",
    currentStock: 0,
    minimumStock: 0,
    isActive: true,
  },
];

const seedDatabase = async () => {
  let transaction;
  try {
    transaction = await db.transaction();

    for (const packagingItemData of packagingItemsData) {
      await PackagingItem.findOrCreate({
        where: { name: packagingItemData.name },
        defaults: packagingItemData,
        transaction,
      });
    }
    await transaction.commit();
    console.log("Packaging Item seeded successfully!");
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error("Packaging Item seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
};

seedDatabase();

// node seeders/seedPackagingItems.js
