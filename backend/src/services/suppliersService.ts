import suppliersRepository from "src/db/repositories/suppliersRepository";
import { ServicesError } from "src/errors/servicesError";
import { ResponseDto } from "src/models/response/responce";
import { SupplierModel } from "src/models/supplier-models/supplier";

class SuppliersService {
  getAll = async (): Promise<ResponseDto<SupplierModel[]>> => {
    const response = await suppliersRepository.getAll();
    const { details, data } = response;
    return new ResponseDto(data, [details]);
  };
  getById = async (id: number): Promise<ResponseDto<SupplierModel>> => {
    const response = await suppliersRepository.getById(id);
    const { details, data } = response;
    if (!data) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new ResponseDto(data, [details]);
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
