import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { territories } from "./territories";

export const employeeTerritories = mysqlTable("EmployeeTerritories", {
  employeeId: int("EmployeeID")
    .references(() => employees.employeeId)
    .notNull(),
  territoryId: int("TerritoryID")
    .references(() => territories.territoryId)
    .notNull(),
});
