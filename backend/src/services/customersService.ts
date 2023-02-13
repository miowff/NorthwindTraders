import { database } from "src/db/dbConnection";
import { customers } from "src/db/schema/customers";
import { CustomerModel } from "src/models/cusomer-models/customer";
import { ResponceDto } from "src/models/responce";
import { getByColumnAsync } from "src/db/baseOperations";
import { like } from "drizzle-orm/expressions";

class CustomersService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const allCustomers: CustomerModel[] = await database
      .select(customers)
      .fields({
        company: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        city: customers.city,
        country: customers.country,
        id: customers.customerId,
      });
    return new ResponceDto(allCustomers, {
      time: new Date(),
      operation: "SELECT",
      resultsCount: allCustomers.length,
      operationDescription: "SELECT * FROM Customers",
    });
  };
  getByIdAsync = async (id: string): Promise<ResponceDto> => {
    const customer = await getByColumnAsync("customerId", customers, id);
    return new ResponceDto(customer, {
      time: new Date(),
      operation: "SELECT WHERE",
      resultsCount: 1,
      operationDescription: `SELECT * FROM Customers WHERE CustomerID = ${id}`,
    });
  };
  searchCustomerAsync = async (searchString: string): Promise<ResponceDto> => {
    const suitableCustomers = await database
      .select(customers)
      .where(like(customers.companyName, `%${searchString}%`))
      .fields({
        companyName: customers.companyName,
        contact: customers.contactName,
        title: customers.contactTitle,
        phone: customers.phone,
      });

    return new ResponceDto(suitableCustomers, {
      time: new Date(),
      operation: "SELECT WHERE",
      resultsCount: 1,
      operationDescription: `SELECT * FROM Customers WHERE Customers.CompanyName  LIKE %${searchString}%`,
    });
  };
}

const customersService = new CustomersService();
export default customersService;
