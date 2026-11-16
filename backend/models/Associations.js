import Role from "../models/Role.js";
import Category from "./Category.js";
import Consignor from "./Consignor.js";
import PackagingItem from "./PackagingItem.js";
import Permission from "./Permission.js";
import Product from "./Product.js";
import ProductBundleItem from "./ProductBundleItem.js";
import ProductCapacity from "./ProductCapacity.js";
import ProductPackaging from "./ProductPackaging.js";
import ProductVariant from "./ProductVariant.js";
import RawMaterial from "./RawMaterial.js";
import Recipe from "./Recipe.js";
import RecipeItem from "./RecipeItem.js";
import RolePermission from "./RolePermission.js";
import User from "./User.js";

// Role ↔ User (One to Many)
Role.hasMany(User, { foreignKey: "roleId", as: "users" }); // 1 Role : N Users
User.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // 1 User: 1 Role

// Role ↔ RolePermission (One to Many)
Role.hasMany(RolePermission, { foreignKey: "roleId", as: "role_permissions" }); // 1 Role : N RolePermissions
RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // 1 RolePermission : 1 Role

// Role ↔ Permission (Many to Many)
Permission.belongsToMany(Role, {
  through: RolePermission, // tabel penghubung
  foreignKey: "permissionId", // FK ke model asal
  otherKey: "roleId", //FK ke model tujuan
  as: "roles", // alias model tujuan
}); // 1 Permission : N Roles
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
}); // 1 Role : N Permissions

// Permission ↔ RolePermission (One to Many)
Permission.hasMany(RolePermission, {
  foreignKey: "permissionId",
  as: "role_permissions",
}); // 1 Permission : N RolePermissions
RolePermission.belongsTo(Permission, {
  foreignKey: "permissionId",
  as: "permission",
}); // 1 Permission : 1 RolePermission

// Category ↔ Product (One to Many)
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" }); // 1 Category : N Products
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" }); // 1 Product : 1 Category

// Consignor ↔ Product (One to Many)
Consignor.hasMany(Product, { foreignKey: "consignorId", as: "products" }); // 1 Consignor : N Products
Product.belongsTo(Consignor, { foreignKey: "consignorId", as: "consignor" }); // 1 Product : 1 Consignor

// Product ↔ ProductVariant (One to Many)
Product.hasMany(ProductVariant, {
  foreignKey: "productId",
  as: "product_variants",
}); // 1 Product : N ProductVariants
ProductVariant.belongsTo(Product, { foreignKey: "productId", as: "product" }); // 1 ProductVariant : 1 product

// ProductVariant ↔ ProductCapacity
ProductVariant.hasMany(ProductCapacity, {
  foreignKey: "productVariantId",
  as: "product_capacities",
}); // 1 ProductVariant : N ProductCapacities
ProductCapacity.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_variant",
}); // 1 ProductCapacity : 1 ProductVariant

// ProductVariant ↔ ProductBundleItem (sebagai bundle)
ProductVariant.hasMany(ProductBundleItem, {
  foreignKey: "bundleVariantId",
  as: "bundle_items",
}); // 1 ProductVariant : N ProductBundleItems
ProductBundleItem.belongsTo(ProductVariant, {
  foreignKey: "bundleVariantId",
  as: "bundle",
}); // 1 ProductBundleItem : 1 ProductVariant

// ProductVariant ↔ ProductBundleItem (sebagai komponen)
ProductVariant.hasMany(ProductBundleItem, {
  foreignKey: "componentVariantId",
  as: "used_in_bundles",
});
ProductBundleItem.belongsTo(ProductVariant, {
  foreignKey: "componentVariantId",
  as: "component",
});

// Product ↔ Recipe
Product.hasMany(Recipe, {
  foreignKey: "productId",
  as: "recipes",
}); // 1 Product : N Recipes
Recipe.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
}); // 1 Recipe : 1 Product

// Recipe ↔ RecipeItem
Recipe.hasMany(RecipeItem, {
  foreignKey: "recipeId",
  as: "recipe_items",
}); // 1 Recipe : N RecipeItems
RecipeItem.belongsTo(Recipe, {
  foreignKey: "recipeId",
  as: "recipe",
}); // 1 RecipeItem : 1 Recipe

// RecipeItem ↔ RawMaterial
RawMaterial.hasMany(RecipeItem, {
  foreignKey: "rawMaterialId",
  as: "recipe_items",
}); // 1 RawMaterial : N RecipeItems
RecipeItem.belongsTo(RawMaterial, {
  foreignKey: "rawMaterialId",
  as: "raw_material",
}); // 1 RecipeItem : 1 rawMaterial

// PackagingItem ↔ ProductPackaging
PackagingItem.hasMany(ProductPackaging, {
  foreignKey: "packagingItemId",
  as: "product_packagings",
}); // 1 PackagingItem : N ProductPackagings
ProductPackaging.belongsTo(PackagingItem, {
  foreignKey: "packagingItemId",
  as: "packaging_item",
}); // 1 ProductPackaging : 1 PackagingItem

// ProductVariant ↔ ProductPackaging
ProductVariant.hasMany(ProductPackaging, {
  foreignKey: "productVariantId",
  as: "product_packagings",
}); // 1 ProductVariant : N ProductPackagings
ProductPackaging.belongsTo(ProductVariant, {
  foreignKey: "productVariantId",
  as: "product_variant",
}); // 1 ProductPackaging : 1 ProductVariant

export {
  Role,
  Permission,
  RolePermission,
  User,
  Category,
  Consignor,
  Product,
  ProductBundleItem,
  ProductCapacity,
  ProductVariant,
  Recipe,
  RecipeItem,
  RawMaterial,
  PackagingItem,
  ProductPackaging,
};
