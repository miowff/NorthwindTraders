import { like } from "drizzle-orm/expressions";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<CustomerModel[]> => {
    const allCustomers = this.db
      .select({
        company: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        id: customers.customerId,
      })
      .from(customers);
    type Result = Awaited<typeof allCustomers>;
    const sql = allCustomers.toSQL();
    return allCustomers as Result;
  };
  find = async (searchString: string): Promise<CustomerModel[]> => {
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
