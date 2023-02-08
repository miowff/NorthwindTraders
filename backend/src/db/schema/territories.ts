import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { regions } from "./regions";

export const territories = mysqlTable("Territories", {
  territoryId: int("TerritoryID").primaryKey().notNull(),
  territoryDescription: varchar("TerritoryDescription", {
    length: 60,
  }).notNull(),
  regionId: int("RegionID")
    .references(() => regions.regionId)
    .notNull(),
});
