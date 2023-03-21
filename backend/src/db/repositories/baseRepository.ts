import { AnyMySqlTable } from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";
import { database } from "../dbConnection";

export abstract class BaseRepository {
  protected db: MySql2Database;
  constructor(protected table: AnyMySqlTable) {
    this.db = database;
  }
}
