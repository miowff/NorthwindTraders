import { ResponseDetails } from "./responseDetails";

export class GetAllDto<T extends object> {
  constructor(public allValues: T[], public details: ResponseDetails[]) {}
}
