import { GetOneDto } from "src/models/response/response";
import { ServicesError } from "src/errors/servicesError";
import customersRepository from "src/db/repositories/customersRepository";
import {
  CustomerDetails,
  CustomerModel,
  SearchResultCustomer,
} from "src/models/customers";
import { GetAllDto } from "src/models/response/getAllResponse";

class CustomersService {
  getAll = async (): Promise<GetAllDto<CustomerModel>> => {
    const { details, data: allCustomers } = await customersRepository.getAll();
    return new GetAllDto(allCustomers, [details]);
  };
  getById = async (id: string): Promise<GetOneDto<CustomerDetails>> => {
    const { details, data: customer } = await customersRepository.getById(id);
    if (!customer) {
      throw ServicesError.CustomerNotFound(id);
    }
    return new GetOneDto(customer, [details]);
  };
  find = async (
    searchString: string
  ): Promise<GetAllDto<SearchResultCustomer>> => {
    const { details, data: suitableCustomers } = await customersRepository.find(
      searchString
    );
    return new GetAllDto(suitableCustomers, [details]);
  };
}

const customersService = new CustomersService();
export default customersService;
