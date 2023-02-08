import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const customers = mysqlTable("Customers", {
  customerId: serial("CustomerID").primaryKey().notNull(),
  companyName: varchar("CompanyName", { length: 60 }).notNull(),
  contactName: varchar("ContactName", { length: 60 }).notNull(),
  contactTitle: varchar("ContactTitle", { length: 60 }).notNull(),
  address: varchar("Address", { length: 60 }),
  city: varchar("City", { length: 60 }),
  region: varchar("Region", { length: 25 }),
  postalCode: varchar("PostalCode", { length: 60 }),
  country: varchar("Country", { length: 60 }),
  phone: varchar("Phone", { length: 60 }),
  fax: varchar("Fax", { length: 60 }),
});
