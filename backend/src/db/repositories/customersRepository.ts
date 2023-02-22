import { like } from "drizzle-orm/expressions";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<CustomerModel[]> => {
    const allCustomers: CustomerModel[] = await this.db
      .select(customers)
      .fields({
        company: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        id: customers.customerId,
      });
    return allCustomers;
  };
  find = async (searchString: string): Promise<any> => {
    const result = await this.db
      .select(customers)
      .where(like(customers.companyName, `%${searchString}%`))
      .fields({
        companyName: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        phone: customers.phone,
      });
    return result;
  };
}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
