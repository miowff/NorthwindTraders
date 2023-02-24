import { ResponseDetails } from "./response/responseDetails";

export interface DatabaseResponse<T extends Object> {
  details:ResponseDetails;
  data: T;
}
