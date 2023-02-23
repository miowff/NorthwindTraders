import { eq } from "drizzle-orm/expressions";
import { AnyMySqlTable } from "drizzle-orm/mysql-core";
import { MySqlSelect } from "drizzle-orm/mysql-core/query-builders";
import { MySql2Database } from "drizzle-orm/mysql2";
import { database } from "../dbConnection";

export abstract class BaseRepository {
  protected table: AnyMySqlTable;
  protected db: MySql2Database;
  constructor(table: AnyMySqlTable) {
    this.table = table;
    this.db = database;
  }
  getByColumn = async (
    column: string,
    value: any
  ): Promise<MySqlSelect<AnyMySqlTable>> => {
    const result = await database
      .select()
      .from(this.table)
      .where(eq(this.table[column], value));
    return result;
  };
}
