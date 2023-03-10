import suppliersRepository from "src/db/repositories/suppliersRepository";
import { ServicesError } from "src/errors/servicesError";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";
import { SupplierModel } from "src/models/supplier-models/supplier";
import { SupplierDetails } from "src/models/supplier-models/supplierDetails";

class SuppliersService {
  getAll = async (): Promise<GetAllDto<SupplierModel>> => {
    const response = await suppliersRepository.getAll();
    const { details, data: suppliers } = response;
    return new GetAllDto(suppliers, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<SupplierDetails>> => {
    const response = await suppliersRepository.getById(id);
    const { details, data: supplier } = response;
    if (!supplier) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new GetOneDto(supplier, [details]);
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
