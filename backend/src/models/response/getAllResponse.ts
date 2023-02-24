import { ResponseDetails } from "./responseDetails";

export class GetAllResponseDto<T> {
    allValues: T[];
    responseDetails: ResponseDetails[];
    constructor(allValues: T[], details: ResponseDetails[]) {
      this.allValues = allValues;
      this.responseDetails = details;
    }
}
