export class ResponseDetails {
  time: Date;
  operation: string;
  resultsCount: number;
  operationDescription: string;
  constructor(
    time: Date,
    operation: string,
    count: number,
    description: string
  ) {
    (this.time = time),
      (this.operation = operation),
      (this.resultsCount = count),
      (this.operationDescription = description);
  }
}
