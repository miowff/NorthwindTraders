import { ResponseDetails } from "./responseDetails";

export class ResponseDto<T extends Object> {
  data: T;
  responceDetails: ResponseDetails[];
  constructor(data: any, details: ResponseDetails[]) {
    this.data = data;
    this.responceDetails = details;
  }
}
