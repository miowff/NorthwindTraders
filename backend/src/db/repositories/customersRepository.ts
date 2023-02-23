import { like } from "drizzle-orm/expressions";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<CustomerModel[]> => {
    const allCustomers = await this.db
      .select({
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        id: customers.customerId,
      })
      .from(customers);
    return allCustomers ;
  };
  find = async (searchString: string): Promise<CustomerModel[]> => {
    const result = await this.db
      .select({
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        phone: customers.phone,
        id:customers.customerId
      })
      .from(customers)
      .where(like(customers.companyName, `%${searchString}%`));
    return result;
  };
}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
