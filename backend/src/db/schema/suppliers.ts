import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const suppliers = mysqlTable("Suppliers", {
  supplierId: int("SupplierID").primaryKey().notNull(),
  companyName: varchar("CompanyName", { length: 60 }).notNull(),
  contactName: varchar("ContactName", { length: 60 }),
  contactTitle: varchar("ContactTitle", { length: 60 }),
  address: varchar("Address", { length: 60 }),
  city: varchar("City", { length: 60 }),
  region: varchar("Region", { length: 60 }),
  postalCode: varchar("PostalCode", { length: 60 }),
  country: varchar("Country", { length: 60 }),
  phone: varchar("Phone", { length: 60 }),
  fax: varchar("Fax", { length: 60 }),
  homePage: varchar("HomePage", { length: 60 }),
});
