import { CustomerModel } from "./cusomer-models/customer";

export interface DatabaseRespose {
  sql: string;
  data:CustomerModel[];
}
