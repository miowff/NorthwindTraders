import { ResponseDetails } from "./responseDetails";

export class GetOneDto<T extends Object> {
  constructor(public data: T, public details: ResponseDetails[]) {}
}
