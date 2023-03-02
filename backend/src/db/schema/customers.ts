import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const customers = mysqlTable("Customers", {
  customerId: varchar("CustomerID",{length:256}).primaryKey().notNull(),
  companyName: varchar("CompanyName", { length: 60 }).notNull(),
  contactName: varchar("ContactName", { length: 60 }).notNull(),
  contactTitle: varchar("ContactTitle", { length: 60 }).notNull(),
  address: varchar("Address", { length: 60 }).notNull(),
  city: varchar("City", { length: 60 }).notNull(),
  region: varchar("Region", { length: 25 }),
  postalCode: varchar("PostalCode", { length: 60 }).notNull(),
  country: varchar("Country", { length: 60 }).notNull(),
  phone: varchar("Phone", { length: 60 }).notNull(),
  fax: varchar("Fax", { length: 60 }).notNull(),
});
