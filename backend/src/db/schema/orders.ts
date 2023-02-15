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
  customerId: varchar("CustomerID",{length:256}).references(() => customers.customerId),
  employeeId: int("EmployeeID").references(() => employees.employeeId),
  orderDate: datetime("OrderDate"),
  requiredDate: datetime("RequiredDate"),
  shippedDate: datetime("ShippedDate"),
  shipVia: int("ShipVia").references(() => shippers.shipperId),
  freight: float("Freight"),
  shipName: varchar("ShipName", { length: 60 }),
  shipAddress: varchar("ShipAddress", { length: 60 }),
  shipCity: varchar("ShipCity", { length: 60 }),
  shipPostalCode: varchar("ShipPostalCode", { length: 60 }),
  shipCountry: varchar("ShipCountry", { length: 60 }),
});
