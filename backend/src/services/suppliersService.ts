import suppliersRepository from "src/db/repositories/suppliersRepository";
import { ServicesError } from "src/errors/servicesError";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";
import { SupplierDetails, SupplierModel } from "src/models/suppliers";

class SuppliersService {
  getAll = async (): Promise<GetAllDto<SupplierModel>> => {
    const { details, data: suppliers } = await suppliersRepository.getAll();
    return new GetAllDto(suppliers, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<SupplierDetails>> => {
    const { details, data: supplier } = await suppliersRepository.getById(id);
    if (!supplier) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new GetOneDto(supplier, [details]);
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
