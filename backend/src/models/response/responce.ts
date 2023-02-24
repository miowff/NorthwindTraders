import { ResponseDetails } from "./responseDetails";

export class ResponseDto<T extends Object> {
  data: T;
  responseDetails: ResponseDetails[];
  constructor(data: T, details: ResponseDetails[]) {
    this.data = data;
    this.responseDetails = details;
  }
}
