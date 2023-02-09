import { customers } from "../schema/customers";
import { BaseRepository } from "./baseRepository";

class CustomersRepository extends BaseRepository {}

const customersRepository = new CustomersRepository(customers);
export default customersRepository;
