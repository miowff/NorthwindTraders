export class ResponseDetails {
  constructor(
    public time: Date,
    public operation: string,
    public count: number,
    public description: string
  ) {}
}
