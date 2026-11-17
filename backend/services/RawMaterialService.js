import { RawMaterial } from "../models/Associations.js";

export const getRawMaterials = async () => {
  const rawMaterials = await RawMaterial.findAll({
    attributes: [
      "id",
      "name",
      "unit",
      "currentStock",
      "minimumStock",
      "isActive",
    ],
    order: [["id", "ASC"]],
  });
  return rawMaterials;
};

export const getRawMaterialById = async (id) => {
  const rawMaterial = await RawMaterial.findByPk(id, {
    attributes: [
      "id",
      "name",
      "unit",
      "currentStock",
      "minimumStock",
      "isActive",
    ],
    order: [["id", "ASC"]],
  });
  if (!rawMaterial) {
    throw new Error("Bahan mentah tidak ditemukan!");
  }
  return rawMaterial;
};

export const createRawMaterial = async ({
  name,
  unit,
  currentStock,
  minimumStock,
  isActive,
}) => {
  if (!name || !name.trim()) {
    throw new Error("Nama bahan mentah tidak boleh kosong!");
  } else if (!unit || !unit.trim()) {
    throw new Error("Unit bahan mentah tidak boleh kosong!");
    //   } else if (!currentStock) {
    //     throw new Error("Stok bahan mentah saat ini tidak boleh kosong!");
    //   } else if (!minimumStock) {
    //     throw new Error("Stock minimum bahan mentah tidak boleh kosong!");
  } else if (typeof isActive !== "boolean") {
    throw new Error("Status bahan mentah harus berupa boolean!");
  }

  const existingName = await RawMaterial.findOne({
    where: { name: name.trim() },
  });
  if (existingName) {
    throw new Error("Nama bahan mentah sudah digunakan!");
  }

  //   const existingUnit = await RawMaterial.findOne({
  //     where: { unit: unit.trim() },
  //   });
  //   if (existingUnit) {
  //     throw new Error("Unit bahan mentah sudah digunakan!");
  //   }

  const newRawMaterial = await RawMaterial.create({
    name,
    unit,
    currentStock,
    minimumStock,
    isActive,
  });

  return {
    id: newRawMaterial.id,
    name: newRawMaterial.name,
    unit: newRawMaterial.unit,
    currentStock: newRawMaterial.currentStock,
    minimumStock: newRawMaterial.minimumStock,
    isActive: newRawMaterial.isActive,
  };
};

export const updateRawMaterial = async (
  id,
  { name, unit, currentStock, minimumStock, isActive },
) => {
  const rawMaterial = await RawMaterial.findByPk(id);
  if (!rawMaterial) {
    throw new Error("Bahan mentah tidak ditemukan!");
  }

  if (name !== undefined) {
    if (!name.trim()) {
      throw new Error("Nama bahan mentah tidak boleh kosong!");
    }

    const existingName = await RawMaterial.findOne({
      where: { name: name.trim() },
    });
    if (existingName && existingName.id !== rawMaterial.id) {
      throw new Error("Nama bahan mentah sudah digunakan!");
    }
    rawMaterial.name = name.trim();
  }

  if (unit !== undefined) {
    if (!unit.trim()) {
      throw new Error("Unit bahan mentah tidak boleh kosong!");
    }

    const existingUnit = await RawMaterial.findOne({
      where: { unit: unit.trim() },
    });
    if (existingUnit && existingUnit.id !== rawMaterial.id) {
      throw new Error("Unit bahan mentah sudah digunakan!");
    }
    rawMaterial.unit = unit.trim();
  }

  if (currentStock !== undefined) {
    if (
      !/^\d+(\.\d{1,3})?$/.test(String(currentStock)) ||
      Number(currentStock) > 999999999.999
    ) {
      throw new Error(
        "Stok bahan mentah harus berupa angka non-negatif dengan maksimal 3 desimal!",
      );
    }
    rawMaterial.currentStock = Number(currentStock);
  }

  if (minimumStock !== undefined) {
    if (
      !/^\d+(\.\d{1,3})?$/.test(String(minimumStock)) ||
      Number(minimumStock) > 999999999.999
    ) {
      throw new Error(
        "Stok minimum bahan mentah harus berupa angka non-negatif dengan maksimal 3 desimal!",
      );
    }
    rawMaterial.minimumStock = Number(minimumStock);
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      throw new Error("Status produk harus berupa boolean!");
    }
    rawMaterial.isActive = isActive;
  }

  await rawMaterial.save();
  return rawMaterial;
};

export const deleteRawMaterial = async (id) => {
  const rawMaterial = await RawMaterial.findByPk(id);
  if (!rawMaterial) {
    throw new Error("Bahan mentah tidak ditemukan!");
  }

  if (!rawMaterial.isActive) {
    throw new Error("Bahan mentah sudah dinonaktifkan!");
  }

  rawMaterial.isActive = false;
  await rawMaterial.save();
  return {
    id: rawMaterial.id,
    name: rawMaterial.name,
    unit: rawMaterial.unit,
    currentStock: rawMaterial.currentStock,
    minimumStock: rawMaterial.minimumStock,
    isActive: rawMaterial.isActive,
    message: "Bahan mentah sudah dinonaktifkan!",
  };
};
