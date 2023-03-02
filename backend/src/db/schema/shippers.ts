import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const shippers = mysqlTable("Shippers", {
  shipperId: int("ShipperID").primaryKey().notNull(),
  companyName: varchar("CompanyName", { length: 60 }).notNull(),
  phone: varchar("Phone", { length: 60 }).notNull(),
});
