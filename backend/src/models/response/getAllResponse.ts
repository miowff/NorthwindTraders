import { ResponseDetails } from "./responseDetails";

export class GetAllDto<T extends object> {
    allValues: T[];
    responseDetails: ResponseDetails[];
    constructor(allValues: T[], details: ResponseDetails[]) {
      this.allValues = allValues;
      this.responseDetails = details;
    }
}
