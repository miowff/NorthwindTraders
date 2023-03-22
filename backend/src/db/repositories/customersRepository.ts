import { eq, like } from "drizzle-orm/expressions";
import {
  CustomerDetails,
  CustomerModel,
  SearchResultCustomer,
} from "src/models/customers";
import { DatabaseResponse } from "src/models/dbResponse";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import timer from "src/services/utils/timer";
import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<CustomerModel[]>> => {
    const {
      companyName,
      contactName,
      contactTitle,
      city,
      country,
      customerId,
    } = customers;
    timer.start();
    const query = this.db
      .select({
        companyName,
        contactName,
        contactTitle,
        city,
        country,
        customerId,
      })
      .from(customers);
    const sql = query.toSQL();
    const allCustomers = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allCustomers.length,
        sql.sql,
        timer.getDifference()
      ),
      data: allCustomers,
    };
  };
  getById = async (id: string): Promise<DatabaseResponse<CustomerDetails>> => {
    timer.start();
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
        sql.sql,
        timer.getDifference()
      ),
      data: customer[0],
    };
  };
  find = async (
    searchString: string
  ): Promise<DatabaseResponse<SearchResultCustomer[]>> => {
    const { companyName, contactName, contactTitle, phone, customerId } =
      customers;
    timer.start();
    const query = this.db
      .select({
        companyName,
        contactName,
        contactTitle,
        phone,
        customerId,
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
        sql.sql,
        timer.getDifference()
      ),
      data: suitableCustomers,
    };
  };
}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
