import { GetOneDto } from "src/models/response/responce";
import { ServicesError } from "src/errors/servicesError";
import customersRepository from "src/db/repositories/customersRepository";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { GetAllDto } from "src/models/response/getAllResponse";

class CustomersService {
  getAll = async (): Promise<GetAllDto<CustomerModel>> => {
    const response = await customersRepository.getAll();
    const { details, data:allCustomers } = response;
    return new GetAllDto(allCustomers, [details]);
  };
  getById = async (id: string): Promise<GetOneDto<CustomerModel>> => {
    const response = await customersRepository.getById(id);
    const { details, data:customer } = response;
    if (!customer) {
      throw ServicesError.CustomerNotFound(id);
    }
    return new GetOneDto(customer, [details]);
  };
  find = async (
    searchString: string
  ): Promise<GetAllDto<CustomerModel>> => {
    const response = await customersRepository.find(searchString);
    const { details, data:suitableCustomers } = response;
    return new GetAllDto(suitableCustomers, [details]);
  };
}

const customersService = new CustomersService();
export default customersService;
