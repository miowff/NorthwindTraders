import { mysqlTable, date, int, varchar, foreignKey } from "drizzle-orm/mysql-core";

export const employees = mysqlTable("Employees", {
  employeeId: int("EmployeeID").primaryKey().notNull(),
  lastName: varchar("LastName", { length: 60 }).notNull(),
  firstName: varchar("FirstName", { length: 60 }).notNull(),
  title: varchar("Title", { length: 60 }),
  titleOfCourtesy: varchar("TitleOfCourtesy", { length: 10 }),
  birthDate: date("BirthDate"),
  hireDate: date("HireDate"),
  address: varchar("Address", { length: 60 }),
  city: varchar("City", { length: 60 }),
  region: varchar("Region", { length: 60 }),
  postalCode: varchar("PostalCode", { length: 60 }),
  country: varchar("Country", { length: 60 }),
  homePhone: varchar("HomePhone", { length: 60 }),
  extension: varchar("Extension", { length: 60 }),
  notes: varchar("Notes", { length: 500 }),
  reportsTo: int("ReportsTo"),
});
