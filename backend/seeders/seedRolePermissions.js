import db from "../config/Database.js";
import {
  Role,
  Permission,
  RolePermission,
  User,
} from "../models/Associations.js";

const rolesData = [
  {
    name: "Owner",
    description:
      "Mengelola seluruh aspek sistem, mengawasi operasional, mengelola keuangan, dan melihat seluruh laporan",
  },
  {
    name: "Admin",
    description:
      "Mengelola katalog produk, resep, pesanan pelanggan, pembayaran, dan pengiriman",
  },
  {
    name: "Manager",
    description:
      "Mengelola pegawai, presensi, pembelian bahan baku, persediaan bahan baku, penitip, dan laporan operasional",
  },
  {
    name: "Cashier",
    description:
      "Mengelola transaksi pembayaran pelanggan sesuai tanggung jawab kasir yang nantinya dikonfirmasi",
  },
  {
    name: "Customer",
    description:
      "Melihat produk, membuat pesanan, melakukan pembayaran, melihat riwayat pesanan, dan mengelola profil serta poin reward",
  },
  //   {
  //     name: "Consignor",
  //     description:
  //       "Pihak yang menitipkan produk untuk dijual",
  //   },
];

const permissionsData = [
  // User
  {
    name: "user.view",
    description: "Melihat data pengguna",
  },
  {
    name: "user.create",
    description: "Menambahkan data pengguna",
  },
  {
    name: "user.update",
    description: "Mengubah data pengguna",
  },
  {
    name: "user.delete",
    description: "Menghapus data pengguna",
  },
  {
    name: "user.assign_role",
    description: "Menetapkan role kepada pengguna",
  },

  // Role
  {
    name: "role.view",
    description: "Melihat data role",
  },
  {
    name: "role.create",
    description: "Menambahkan data role",
  },
  {
    name: "role.update",
    description: "Mengubah data role",
  },
  {
    name: "role.delete",
    description: "Menghapus data role",
  },

  // Permission
  {
    name: "permission.view",
    description: "Melihat data permission",
  },
  {
    name: "permission.create",
    description: "Menambahkan data permission",
  },
  {
    name: "permission.update",
    description: "Mengubah data permission",
  },
  {
    name: "permission.delete",
    description: "Menghapus data permission",
  },

  //Product
  {
    name: "product.view",
    description: "Melihat katalog produk",
  },
  {
    name: "product.create",
    description: "Menambah data produk",
  },
  {
    name: "product.update",
    description: "Mengubah data produk",
  },
  {
    name: "product.delete",
    description: "Menghapus data produk",
  },

  // Recipe
  {
    name: "recipe.view",
    description: "Melihat resep produk",
  },
  {
    name: "recipe.create",
    description: "Menambah resep",
  },
  {
    name: "recipe.update",
    description: "Mengubah resep",
  },
  {
    name: "recipe.delete",
    description: "Menghapus resep",
  },

  // Order
  {
    name: "order.view",
    description: "Melihat data pesanan",
  },
  {
    name: "order.create",
    description: "Menambah pesanan",
  },
  {
    name: "order.update",
    description: "Mengubah pesanan",
  },
  {
    name: "order.cancel",
    description: "Membatalkan pesanan",
  },
  {
    name: "order.delete",
    description: "Menghapus data pesanan",
  },

  // Payment
  {
    name: "payment.view",
    description: "Melihat data pembayaran",
  },
  {
    name: "payment.create",
    description: "Menambah data pembayaran",
  },
  {
    name: "payment.update",
    description: "Mengubah data pembayaran",
  },
  {
    name: "payment.delete",
    description: "Menghapus data pembayaran",
  },

  // Delivery
  {
    name: "delivery.view",
    description: "Melihat data pengiriman",
  },
  {
    name: "delivery.create",
    description: "Menambah data pengiriman",
  },
  {
    name: "delivery.update",
    description: "Memperbarui status pengiriman",
  },
  {
    name: "delivery.delete",
    description: "Menghapus data pengiriman",
  },

  // Employee
  { name: "employee.view", description: "Melihat data pegawai" },
  { name: "employee.create", description: "Menambahkan data pegawai" },
  { name: "employee.update", description: "Mengubah data pegawai" },
  { name: "employee.delete", description: "Menghapus data pegawai" },

  // Attendance
  {
    name: "attendance.view",
    description: "Melihat data kehadiran",
  },
  {
    name: "attendance.create",
    description: "Menambah data kehadiran",
  },
  {
    name: "attendance.update",
    description: "Mengubah data kehadiran",
  },
  {
    name: "attendance.delete",
    description: "Menghapus data kehadiran",
  },

  // Inventory
  {
    name: "inventory.view",
    description: "Melihat persediaan bahan baku",
  },
  {
    name: "inventory.create",
    description: "Mencatat penambahan stok",
  },
  {
    name: "inventory.update",
    description: "Memperbarui persediaan stok",
  },
  {
    name: "inventory.delete",
    description: "Menghapus perseduaan bahan baku",
  },

  // Purchase
  {
    name: "purchase.view",
    description: "Melihat data pembelian bahan baku",
  },
  {
    name: "purchase.create",
    description: "Mencatat pembelian bahan baku",
  },
  {
    name: "purchase.update",
    description: "Memperbarui pembelian bahan baku",
  },
  {
    name: "purchase.delete",
    description: "Mengahpus data pembelian bahan baku",
  },

  // Consignor
  {
    name: "consignor.view",
    description: " Melihat data penitip",
  },
  {
    name: "consignor.create",
    description: "Menambah data penitip",
  },
  {
    name: "consignor.update",
    description: "Mengubah data penitip",
  },
  {
    name: "consignor.delete",
    description: "Menghapusa data penitip",
  },

  // payroll
  {
    name: "payroll.view",
    description: "Melihat data penggajian",
  },
  {
    name: "payroll.create",
    description: "Mencatat data penggajian",
  },
  {
    name: "payroll.update",
    description: "Mengubah data penggajian",
  },
  {
    name: "payroll.delete",
    description: "Menghapus data penggajian",
  },

  // Loyalty
  {
    name: "loyalty.view",
    description: "Melihat poin reward",
  },
  {
    name: "loyalty.create",
    description: "Menambah poin reward",
  },
  {
    name: "loyalty.reedem",
    description: "Menukarkan poin reward",
  },
  {
    name: "loyalty.update",
    description: "Mengelola poin reward",
  },
  {
    name: "loyalty.delete",
    description: "Menghapus poin reward",
  },

  // Promotion
  {
    name: "promotion.view",
    description: "Melihat informasi promosi",
  },
  {
    name: "promotion.create",
    description: "Menambahkan promosi",
  },
  {
    name: "promotion.update",
    description: "Mengubah promosi",
  },
  {
    name: "promotion.delete",
    description: "Menghapus promosi",
  },

  // Report
  {
    name: "report.view",
    description: "Melihat laporan",
  },
  {
    name: "report.export",
    description: "Mengekspor laporan",
  },

  // Profile
  {
    name: "profile.view",
    description: "Melihat profil sendiri",
  },
  {
    name: "profile.update",
    description: "Mengubah profil sendiri",
  },
];

const rolePermission = {
  // Owner memiliki seluruh permission
  Owner: [
    // permissionData.map((permission) => permission.name),
    "user.view",
    "user.create",
    "user.update",
    "user.delete",
    "user.assign_role",

    "role.view",
    "role.create",
    "role.update",
    "role.delete",

    "permission.view",
    "permission.create",
    "permission.update",
    "permission.delete",

    "product.view",
    "product.create",
    "product.update",
    "product.delete",

    "recipe.view",
    "recipe.create",
    "recipe.update",
    "recipe.delete",

    "order.view",
    "order.create",
    "order.update",
    "order.cancel", // memungkinkan membatalkan jika sudah info ke customer
    "oder.delete",

    "payment.view",
    "payment.create",
    "payment.update",
    "payment.delete",

    "delivery.view",
    "delivery.create",
    "delivery.update",
    "delivery.delete",

    "employee.view",
    "employee.create",
    "employee.update",
    "employee.delete",

    "attendance.view",
    "attendance.create",
    "attendance.update",
    "attendance.delete",

    "inventory.view",
    "inventory.create",
    "inventory.update",
    "inventory.delete",

    "purchase.view",
    "purchase.create",
    "purchase.update",
    "purchase.delete",

    "consignor.view",
    "consignor.create",
    "consignor.update",
    "cosnignor.delete",

    "payroll.view",
    "payroll.create",
    "payroll.update",
    "payroll.delete",

    "loyalty.view",
    "loyalty.create",
    "loyalty.update",
    "loyalty.delete",

    "promotion.view",
    "promotion.create",
    "promotion.update",
    "promotion.delete",

    "report.view",
    "report.export",

    "profile.view",
    "profile.update",
  ],

  // Admin mengelola produk dan transaksi pelanggan
  Admin: [
    "product.view",
    "product.create",
    "product.update",
    "product.delete",

    "recipe.view",
    "recipe.create",
    "recipe.update",
    "recipe.delete",

    "order.view",
    "order.update",
    "order.cancel", // memungkinkan membatalkan jika sudah info ke customer

    "payment.view",
    "payment.update",

    "delivery.view",
    "delivery.create",
    "delivery.update",

    "loyalty.view",
    "loyalty.update",

    "promotion.view",
    "promotion.create",
    "promotion.update",
    "promotion.delete",

    "profile.view",
    "profile.update",
  ],

  // Manager mengelola sumber daya dan operasional
  Manager: [
    "employee.view",
    "employee.create",
    "employee.update",
    "employee.delete",

    "attendance.view",
    "attendance.create",
    "attendance.update",

    "inventory.view",
    "inventory.create",
    "inventory.update",
    "inventory.delete",

    "purchase.view",
    "purchase.create",

    "consignor.view",
    "consignor.create",
    "consignor.update",
    "consignor.delete",

    "report.view",
    "report.export",

    "profile.view",
    "profile.update",
  ],

  // Cashier sementara dibatasi pada transaksi pembayara
  Cashier: [
    "product.view",
    "order.view",
    "payment.view",
    "payment.create",
    "payment.update",
    "profile.view",
    "profile.update",
  ],

  // Customer hanya mengakses kebutuhan transaksinya sendiri
  Customer: [
    "product.view",

    "oder.view",
    "order.create",
    "order.cancel", // memungkinkan membatalkan jika belum pembayaran

    "payment.view",
    "payment.create",

    "loyalty.view",
    "loyalty.reedem",

    "profile.view",
    "profile.update",
  ],
};

const seedDatabase = async () => {
  const transaction = await db.transaction();
  try {
    // 1. memasukkan data role
    for (const roleData of rolesData) {
      await Role.findOrCreate({
        where: { name: roleData.name },
        defaults: roleData,
        transaction,
      });
    }

    // 2. memasukkan data permission
    for (const permissionData of permissionsData) {
      await Permission.findOrCreate({
        where: { name: permissionData.name },
        defaults: permissionData,
        transaction,
      });
    }

    // 3. menghubungkan role dengan permission
    for (const [roleName, permissionNames] of Object.entries(rolePermission)) {
      const role = await Role.findOne({
        where: { name: roleName },
        transaction,
      });

      for (const permissionName of permissionNames) {
        const permission = await Permission.findOne({
          where: { name: permissionName },
          transaction,
        });

        await RolePermission.findOrCreate({
          where: { roleId: role.id, permissionId: permission.id },
          defaults: { roleId: role.id, permissionId: permission.id },
          transaction,
        });
      }
    }

    await transaction.commit();

    console.log("Roles seeded successfully");
    console.log("Pemissions seeded successfully");
    console.log("Role Permissions assigned successfully");
  } catch (e) {
    await transaction.rollback();

    console.error("Seeding failed:");
    console.error(e.message);
  } finally {
    await db.close();
  }
};

seedDatabase();
