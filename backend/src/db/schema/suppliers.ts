import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const suppliers = mysqlTable("Suppliers", {
  supplierId: int("SupplierID").primaryKey().notNull(),
  companyName: varchar("CompanyName", { length: 60 }).notNull(),
  contactName: varchar("ContactName", { length: 60 }).notNull(),
  contactTitle: varchar("ContactTitle", { length: 60 }).notNull(),
  address: varchar("Address", { length: 60 }).notNull(),
  city: varchar("City", { length: 60 }).notNull(),
  postalCode: varchar("PostalCode", { length: 60 }).notNull(),
  country: varchar("Country", { length: 60 }).notNull(),
  phone: varchar("Phone", { length: 60 }).notNull(),
  fax: varchar("Fax", { length: 60 }),
  homePage: varchar("HomePage", { length: 256 }),
});
