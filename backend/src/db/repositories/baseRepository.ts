import { AnyMySqlTable} from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";
import { database } from "../dbConnection";

export abstract class BaseRepository {
  protected table: AnyMySqlTable;
  protected db: MySql2Database;
  constructor(table: AnyMySqlTable) {
    this.table = table;
    this.db = database;
  }
}
