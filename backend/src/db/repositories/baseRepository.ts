import { eq } from "drizzle-orm/expressions";
import { AnyMySqlTable, InferModel } from "drizzle-orm/mysql-core";
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
  ): Promise<InferModel<AnyMySqlTable>> => {
    const result = await database
      .select()
      .from(this.table)
      .where(eq(this.table[column], value));
    return result;
  };
}
