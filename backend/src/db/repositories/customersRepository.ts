import { like } from "drizzle-orm/expressions";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<CustomerModel[]> => {
    const query = this.db
      .select({
        company: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        id: customers.customerId,
      })
      .from(customers)
      .prepare();
    const allCustomers: CustomerModel[] = await query.execute();
    const sql = query.toSQL();
    return allCustomers;
  };
  find = async (searchString: string): Promise<any> => {
    const result = await this.db
      .select({
        companyName: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        phone: customers.phone,
      })
      .from(customers)
      .where(like(customers.companyName, `%${searchString}%`));
    return result;
  };
}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
