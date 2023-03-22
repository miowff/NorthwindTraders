import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import getEnv from "src/services/utils/getEnv";

const poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: getEnv("NORTHWIND_TRADERS_DB_ENDPOINT"),
  user: getEnv("NORTHWIND_TRADERS_DB_USERNAME"),
  database: getEnv("NORTHWIND_TRADERS_DB_NAME"),
  password: getEnv("NORTHWIND_TRADERS_DB_PASSWORD"),
  port: parseInt(getEnv("NORTHWIND_TRADERS_DB_PORT") as string),
});

export const database = drizzle(poolConnection);
