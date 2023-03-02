import { mysqlTable, date, int, varchar } from "drizzle-orm/mysql-core";

export const employees = mysqlTable("Employees", {
  employeeId: int("EmployeeID").primaryKey().notNull(),
  lastName: varchar("LastName", { length: 60 }).notNull(),
  firstName: varchar("FirstName", { length: 60 }).notNull(),
  title: varchar("Title", { length: 60 }).notNull(),
  titleOfCourtesy: varchar("TitleOfCourtesy", { length: 10 }).notNull(),
  birthDate: date("BirthDate").notNull(),
  hireDate: date("HireDate").notNull(),
  address: varchar("Address", { length: 60 }).notNull(),
  city: varchar("City", { length: 60 }).notNull(),
  region: varchar("Region", { length: 60 }),
  postalCode: varchar("PostalCode", { length: 60 }).notNull(),
  country: varchar("Country", { length: 60 }).notNull(),
  homePhone: varchar("HomePhone", { length: 60 }).notNull(),
  extension: varchar("Extension", { length: 60 }).notNull(),
  notes: varchar("Notes", { length: 500 }).notNull(),
  reportsTo: int("ReportsTo").notNull(),
});
