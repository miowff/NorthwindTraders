import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { DatabaseResponse } from "src/models/dbResponse";
import { EmployeeModel } from "src/models/employees-models/employee";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { employees } from "../schema/employees";
import { BaseRepository } from "./baseRepository";

export class EmployeesRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<EmployeeModel[]>> => {
    const query = this.db
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
    const sqlQuery = query.toSQL();
    const allEmployees = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allEmployees.length,
        sqlQuery.sql
      ),
      data: allEmployees,
    };
  };
  getById = async (id: any): Promise<DatabaseResponse<EmployeeModel>> => {
    const query = this.db
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
        reportsTo: employees.reportsTo,
        id: employees.employeeId,
      })
      .from(employees)
      .where(eq(employees.employeeId, id));
    const sqlQuery = query.toSQL();
    const employee = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        1,
        sqlQuery.sql
      ),
      data: employee[0],
    };
  };
}

const emplyeesRepository = new EmployeesRepository(employees);

export default emplyeesRepository;
