import { eq, like } from "drizzle-orm/expressions";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { DatabaseResponse } from "src/models/dbResponse";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<CustomerModel[]>> => {
    const query = this.db
      .select({
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        customerId: customers.customerId,
      })
      .from(customers);
    const sql = query.toSQL();
    const allCustomers = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allCustomers.length,
        sql.sql
      ),
      data: allCustomers,
    };
  };
  getById = async (id: string): Promise<DatabaseResponse<CustomerModel>> => {
    const query = this.db
      .select()
      .from(customers)
      .where(eq(customers.customerId, id));
    const sql = query.toSQL();
    const customer = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_WHERE,
        1,
        sql.sql
      ),
      data: customer[0],
    };
  };
  find = async (
    searchString: string
  ): Promise<DatabaseResponse<CustomerModel[]>> => {
    const query = this.db
      .select({
        companyName: customers.companyName,
        contactName: customers.contactName,
        contactTitle: customers.contactTitle,
        phone: customers.phone,
        customerId: customers.customerId,
      })
      .from(customers)
      .where(like(customers.companyName, `%${searchString}%`));
    const sql = query.toSQL();
    const suitableCustomers = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_WHERE,
        suitableCustomers.length,
        sql.sql
      ),
      data: suitableCustomers,
    };
  };
}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
