export class ServicesError extends Error {
  constructor(message: string) {
    super(message);
  }
  static OrderNotFound(id: any) {
    return new ServicesError(`There is no order with id:${id}`);
  }
  static CustomerNotFound(id: any) {
    return new ServicesError(`There is no customer with id:${id}`);
  }
  static EmployeeNotFound(id: any) {
    return new ServicesError(`There is no employee with id:${id}`);
  }
  static ProductNotFound(id: any) {
    return new ServicesError(`There is no product with id:${id}`);
  }
  static SupplierNotFound(id: any) {
    return new ServicesError(`There is no supplier with id:${id}`);
  }
}
