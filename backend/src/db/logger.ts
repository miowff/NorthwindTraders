import { Logger } from "drizzle-orm";

export class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): Object {
    return { query, params };
  }
}

