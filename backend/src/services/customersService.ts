import { ResponseDto } from "src/models/response/responce";
import { ServicesError } from "src/errors/servicesError";
import { OperationsTypes } from "src/operationTypes";
import customersRepository from "src/db/repositories/customersRepository";

class CustomersService {
  getAll = async (): Promise<ResponseDto> => {
    const allCustomers = await customersRepository.getAll();
    return new ResponseDto(allCustomers, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allCustomers.length,
      operationDescription: "select * from Customers",
    });
  };
  getById = async (id: string): Promise<ResponseDto> => {
    const customer = await customersRepository.getByColumn("customerId", id);
    if (!customer[0]) {
      throw ServicesError.CustomerNotFound(id);
    }
    return new ResponseDto(customer[0], {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: 1,
      operationDescription: `SELECT * FROM Customers WHERE CustomerID = ${id}`,
    });
  };
  find = async (searchString: string): Promise<ResponseDto> => {
    const suitableCustomers = await customersRepository.find(searchString);

    return new ResponseDto(suitableCustomers, {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: suitableCustomers.length,
      operationDescription: `SELECT * FROM Customers WHERE Customers.CompanyName  LIKE %${searchString}%`,
    });
  };
}

const customersService = new CustomersService();
export default customersService;
