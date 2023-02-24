import { eq } from "drizzle-orm/expressions";
import { DatabaseResponse } from "src/models/dbResponse";
import { ResponseDetails } from "src/models/response/responseDetails";
import { SupplierModel } from "src/models/supplier-models/supplier";
import { OperationsTypes } from "src/operationTypes";
import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";

class SuppliersRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<SupplierModel[]>> => {
    const query = this.db
      .select({
        companyName: suppliers.companyName,
        contactName: suppliers.contactName,
        contactTitle: suppliers.contactTitle,
        city: suppliers.city,
        country: suppliers.country,
        supplierId: suppliers.supplierId,
      })
      .from(this.table);
    const sql = query.toSQL();
    const allSuppliers = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allSuppliers.length,
        sql.sql
      ),
      data: allSuppliers,
    };
  };
  getById = async (id: number): Promise<DatabaseResponse<SupplierModel>> => {
    const query = this.db
      .select()
      .from(suppliers)
      .where(eq(suppliers.supplierId, id));
    const sql = query.toSQL();
    const supplier = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        1,
        sql.sql
      ),
      data: supplier[0],
    };
  };
}

const suppliersRepository = new SuppliersRepository(suppliers);
export default suppliersRepository;
