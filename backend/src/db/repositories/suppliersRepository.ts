import { SupplierModel } from "src/models/supplier-models/supplier";
import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";

class SuppliersRepository extends BaseRepository {
  getAll = async (): Promise<SupplierModel[]> => {
    const allSuppliers: SupplierModel[] = await this.db
      .select({
        company: suppliers.companyName,
        contact: suppliers.contactName,
        title: suppliers.contactTitle,
        city: suppliers.city,
        country: suppliers.country,
        id: suppliers.supplierId,
      })
      .from(suppliers);
    return allSuppliers;
  };
}

const suppliersRepository = new SuppliersRepository(suppliers);
export default suppliersRepository;
