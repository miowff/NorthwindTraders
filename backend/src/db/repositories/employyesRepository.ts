import { employees } from "../schema/employees";
import { BaseRepository } from "./baseRepository";

class EmployeesRepository extends BaseRepository {}

const employessRepository = new EmployeesRepository(employees);
export default employessRepository;
