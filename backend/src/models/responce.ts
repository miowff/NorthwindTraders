import { ResponseDetails } from "./responseDetails";

export class ResponseDto {
  data: any;
  responceDetails: ResponseDetails;
  constructor(data: any, details: ResponseDetails) {
    this.data = data;
    this.responceDetails = details;
  }
}
