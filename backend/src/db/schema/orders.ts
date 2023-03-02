import {
  mysqlTable,
  datetime,
  int,
  float,
  varchar,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { employees } from "./employees";
import { shippers } from "./shippers";

export const orders = mysqlTable("Orders", {
  orderId: int("OrderID").primaryKey().notNull(),
  customerId: varchar("CustomerID", { length: 256 })
    .references(() => customers.customerId)
    .notNull(),
  employeeId: int("EmployeeID")
    .references(() => employees.employeeId)
    .notNull(),
  orderDate: datetime("OrderDate").notNull(),
  requiredDate: datetime("RequiredDate").notNull(),
  shippedDate: datetime("ShippedDate").notNull(),
  shipVia: int("ShipVia")
    .references(() => shippers.shipperId)
    .notNull(),
  freight: float("Freight").notNull(),
  shipName: varchar("ShipName", { length: 60 }).notNull(),
  shipAddress: varchar("ShipAddress", { length: 60 }).notNull(),
  shipCity: varchar("ShipCity", { length: 60 }).notNull(),
  shipPostalCode: varchar("ShipPostalCode", { length: 60 }).notNull(),
  shipCountry: varchar("ShipCountry", { length: 60 }).notNull(),
});
