import { getByColumnAsync } from "src/db/baseOperations";
import { database } from "src/db/dbConnection";
import { suppliers } from "src/db/schema/suppliers";
import { ServicesError } from "src/errors/servicesError";
import { ResponceDto } from "src/models/responce";
import { SupplierModel } from "src/models/supplier-models/supplier";
import { OperationsTypes } from "src/operationTypes";

class SuppliersService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const allSuppliers: SupplierModel[] = await database
      .select(suppliers)
      .fields({
        company: suppliers.companyName,
        contact: suppliers.contactName,
        title: suppliers.contactTitle,
        city: suppliers.city,
        country: suppliers.country,
        id: suppliers.supplierId,
      });
    return new ResponceDto(allSuppliers, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allSuppliers.length,
      operationDescription: "SELECT * FROM Suppliers",
    });
  };
  getByIdAsync = async (id: number): Promise<ResponceDto> => {
    const supplier = await getByColumnAsync("supplierId", suppliers, id);
    if (!supplier[0]) {
      throw ServicesError.SupplierNotFound(id);
    }
    return new ResponceDto(supplier, {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: 1,
      operationDescription: `SELECT * FROM Suppliers WHERE SupplierID = ${id}`,
    });
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
