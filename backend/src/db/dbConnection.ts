import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.NORTHWIND_TRADERS_DB_ENDPOINT,
  user: process.env.NORTHWIND_TRADERS_DB_USERNAME,
  database: process.env.NORTHWIND_TRADERS_DB_NAME,
  password: process.env.NORTHWIND_TRADERS_DB_PASSWORD,
  port: parseInt(process.env.NORTHWIND_TRADERS_DB_PORT as string),
});

export const database = drizzle(poolConnection);
