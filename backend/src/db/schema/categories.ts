import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const categories = mysqlTable("Categories", {
  categoryId: int("CategoryID").primaryKey().notNull(),
  categoryName: varchar("CategoryName", { length: 50 }).notNull(),
  description: varchar("Description", { length: 256 }),
});
