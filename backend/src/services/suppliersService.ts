import suppliersRepository from "src/db/repositories/suppliersRepository";
import { ServicesError } from "src/errors/servicesError";
import { GetAllDto } from "src/models/response/getAllResponse";
import { ResponseDto } from "src/models/response/responce";
import { SupplierModel } from "src/models/supplier-models/supplier";

class SuppliersService {
  getAll = async (): Promise<GetAllDto<SupplierModel>> => {
    const response = await suppliersRepository.getAll();
    const { details, data:suppliers } = response;
    return new GetAllDto(suppliers, [details]);
  };
  getById = async (id: number): Promise<ResponseDto<SupplierModel>> => {
    const response = await suppliersRepository.getById(id);
    const { details, data:supplier } = response;
    if (!supplier) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new ResponseDto(supplier, [details]);
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
