import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const regions = mysqlTable("Regions", {
  regionId: int("RegionID").primaryKey().notNull(),
  regionDescription: varchar("RegionDescription", { length: 256 }).notNull(),
});
