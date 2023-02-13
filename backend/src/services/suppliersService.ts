import { getByColumnAsync } from "src/db/baseOperations";
import { database } from "src/db/dbConnection";
import { suppliers } from "src/db/schema/suppliers";
import { ResponceDto } from "src/models/responce";
import { SupplierModel } from "src/models/supplier-models/supplier";

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
        id:suppliers.supplierId,
      });
    return new ResponceDto(allSuppliers, {
      time: new Date(),
      operation: "SELECT",
      resultsCount: allSuppliers.length,
      operationDescription: "SELECT * FROM Suppliers",
    });
  };
  getByIdAsync = async (id: number): Promise<ResponceDto> => {
    const supplier = await getByColumnAsync("supplierId", suppliers, id);
    return new ResponceDto(supplier, {
      time: new Date(),
      operation: "SELECT WHERE",
      resultsCount: 1,
      operationDescription: `SELECT * FROM Suppliers WHERE SupplierID = ${id}`,
    });
  };
}

const suppliersService = new SuppliersService();
export default suppliersService;
