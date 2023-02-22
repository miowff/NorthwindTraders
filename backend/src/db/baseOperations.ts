import { AnyMySqlTable } from "drizzle-orm/mysql-core";
import { MySqlSelect } from "drizzle-orm/mysql-core/query-builders/select";
import { database } from "./dbConnection";
import { eq, like } from "drizzle-orm/expressions";
export const getByColumnAsync = async (
  column: string,
  table: AnyMySqlTable,
  value: any
): Promise<MySqlSelect<AnyMySqlTable>> => {
  const result = await database.select(table).where(eq(table[column], value));
  return result;
};

export const searchByColumnValueAsync = async (
  column: string,
  table: AnyMySqlTable,
  searchString: any
): Promise<MySqlSelect<AnyMySqlTable>> => {
  const result = await database
    .select(table)
    .where(like(table[column], `%${searchString}%`));
  return result;
};
