import suppliersRepository from "src/db/repositories/suppliersRepository";
import { ServicesError } from "src/errors/servicesError";
import { ResponseDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

class SuppliersService {
  getAll = async (): Promise<ResponseDto> => {
    const allSuppliers = await suppliersRepository.getAll();
    return new ResponseDto(allSuppliers, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allSuppliers.length,
      operationDescription: "SELECT * FROM Suppliers",
    });
  };
  getById = async (id: number): Promise<ResponseDto> => {
    const supplier = await suppliersRepository.getByColumn("supplierId", id);
    if (!supplier[0]) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new ResponseDto(supplier[0], {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: 1,
      operationDescription: `SELECT * FROM Suppliers WHERE SupplierID = ${id}`,
    });
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
