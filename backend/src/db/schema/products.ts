import {
  int,
  tinyint,
  smallint,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { suppliers } from "./suppliers";
import { categories } from "./categories";

export const products = mysqlTable("Products", {
  productId: int("ProductID").primaryKey().notNull(),
  productName: varchar("ProductName", { length: 60 }).notNull(),
  quantityPerUnit: varchar("QuantityPerUnit", { length: 60 }).notNull(),
  unitPrice: smallint("UnitPrice").notNull(),
  unitsInStock: smallint("UnitsInStock").notNull(),
  unitsOnOrder: smallint("UnitsOnOrder").notNull(),
  reorderLevel: smallint("ReorderLevel").notNull(),
  discontinued: tinyint("Discontinued").notNull(),
  supplierId: int("SupplierID")
    .references(() => suppliers.supplierId)
    .notNull(),
  categoryId: int("CategoryID")
    .references(() => categories.categoryId)
    .notNull(),
});
