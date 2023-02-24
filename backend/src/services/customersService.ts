import { ResponseDto } from "src/models/response/responce";
import { ServicesError } from "src/errors/servicesError";
import { OperationsTypes } from "src/operationTypes";
import customersRepository from "src/db/repositories/customersRepository";
import { CustomerModel } from "src/models/cusomer-models/customer";

class CustomersService {
  getAll = async (): Promise<ResponseDto<CustomerModel[]>> => {
    const response = await customersRepository.getAll();
    const { details, data } = response;
    return new ResponseDto(data, [details]);
  };
  getById = async (id: string): Promise<ResponseDto<CustomerModel>> => {
    const response = await customersRepository.getById(id);
    const { details, data } = response;
    if (!data) {
      throw ServicesError.CustomerNotFound(id);
    }
    return new ResponseDto(data, [details]);
  };
  find = async (
    searchString: string
  ): Promise<ResponseDto<CustomerModel[]>> => {
    const response = await customersRepository.find(searchString);
    const { details, data } = response;
    return new ResponseDto(data, [details]);
  };
}

const customersService = new CustomersService();
export default customersService;
