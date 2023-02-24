import { ResponseDto } from "src/models/response/responce";
import { ServicesError } from "src/errors/servicesError";
import customersRepository from "src/db/repositories/customersRepository";
import { CustomerModel } from "src/models/cusomer-models/customer";

class CustomersService {
  getAll = async (): Promise<ResponseDto<CustomerModel[]>> => {
    const response = await customersRepository.getAll();
    const { details, data:allCustomers } = response;
    return new ResponseDto(allCustomers, [details]);
  };
  getById = async (id: string): Promise<ResponseDto<CustomerModel>> => {
    const response = await customersRepository.getById(id);
    const { details, data:customer } = response;
    if (!customer) {
      throw ServicesError.CustomerNotFound(id);
    }
    return new ResponseDto(customer, [details]);
  };
  find = async (
    searchString: string
  ): Promise<ResponseDto<CustomerModel[]>> => {
    const response = await customersRepository.find(searchString);
    const { details, data:suitableCustomers } = response;
    return new ResponseDto(suitableCustomers, [details]);
  };
}

const customersService = new CustomersService();
export default customersService;
