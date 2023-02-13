import { ResponceDetails } from "./responceDetails";

export class ResponceDto {
  data: any;
  responceDetails: ResponceDetails;
  constructor(data: any, details: ResponceDetails) {
    this.data = data;
    this.responceDetails = details;
  }
}
