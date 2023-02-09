import { AnyMySqlTable, InferModel } from "drizzle-orm/mysql-core";
import { MySqlSelect } from "drizzle-orm/mysql-core/query-builders/select";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm/expressions";
import { db } from "../dbConnection";

export abstract class BaseRepository {
  protected database: MySql2Database = db;
  protected table: AnyMySqlTable;

  constructor(tableName: AnyMySqlTable) {
    this.table = tableName;
  }

  getAllAsync = async (): Promise<MySqlSelect<AnyMySqlTable>> => {
    const result = await this.database.select(this.table);
    return result;
  };

  findByColumnAsync = async (
    column: string,
    value: any
  ): Promise<MySqlSelect<AnyMySqlTable>> => {
    const result = await this.database
      .select(this.table)
      .where(eq(this.table[column], value));
    return result;
  };
  addNewAsync = async (entity: InferModel<AnyMySqlTable>): Promise<boolean> => {
    try {
      await this.database.insert(this.table).values(entity);
      return true;
    } catch (err) {
      return false;
    }
  };
  addManyAsync = async (
    entities: InferModel<AnyMySqlTable>[]
  ): Promise<boolean> => {
    try {
      await this.database.insert(this.table).values(...entities);
      return true;
    } catch (err) {
      return false;
    }
  };
  updateByColumnAsync = async (
    entity: InferModel<AnyMySqlTable>,
    column: string,
    oldColumnValue: any
  ): Promise<boolean> => {
    try {
      await this.database
        .update(this.table)
        .set(entity)
        .where(eq(this.table[column], oldColumnValue));
      return true;
    } catch (err) {
      return false;
    }
  };
  deleteByColumnAsync = async (
    column: string,
    value: any
  ): Promise<boolean> => {
    await this.database.delete(this.table).where(eq(this.table[column], value));
    return true;
  };
}
