import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { EmployeeModel } from "src/models/employees-models/employee";
import { employees } from "../schema/employees";
import { BaseRepository } from "./baseRepository";

export class EmployeesRepository extends BaseRepository {
  getAll = async (): Promise<EmployeeModel[]> => {
    const allEmployees = await this.db
      .select({
        name: sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
        title: employees.title,
        city: employees.city,
        phone: employees.homePhone,
        country: employees.country,
        id: employees.employeeId,
        reportsTo: employees.reportsTo,
      })
      .from(this.table);
    return allEmployees;
  };
  override getByColumn = async (column: string, value: any): Promise<EmployeeModel> => {
    const employee = await this.db
      .select({
        name: sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
        title: employees.title,
        titleOfCourtesy: employees.titleOfCourtesy,
        birthDate: employees.birthDate,
        hireDate: employees.hireDate,
        address: employees.address,
        city: employees.city,
        postalCode: employees.postalCode,
        country: employees.country,
        homePhone: employees.homePhone,
        extension: employees.extension,
        notes: employees.notes,
        reportsToId: employees.reportsTo,
        id:employees.employeeId
      })
      .from(this.table)
      .where(eq(this.table[column], value));
    return employee[0];
  };
}

const emplyeesRepository = new EmployeesRepository(employees);

export default emplyeesRepository;
