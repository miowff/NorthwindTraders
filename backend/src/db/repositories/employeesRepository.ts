import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { DatabaseResponse } from "src/models/dbResponse";
import { EmployeeModel } from "src/models/employees";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { Employee } from "../entities/employee";
import { employees } from "../schema/employees";
import { BaseRepository } from "./baseRepository";

export class EmployeesRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<EmployeeModel[]>> => {
    const { title, city, homePhone, country, employeeId } = employees;
    const query = this.db
      .select({
        name: sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
        title,
        city,
        phone: homePhone,
        country,
        id: employeeId,
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
  getById = async (id: number): Promise<DatabaseResponse<Employee>> => {
    const {
      title,
      titleOfCourtesy,
      birthDate,
      hireDate,
      address,
      city,
      postalCode,
      country,
      homePhone,
      extension,
      notes,
      reportsTo,
      employeeId,
    } = employees;
    const query = this.db
      .select({
        name: sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
        title,
        titleOfCourtesy,
        birthDate,
        hireDate,
        address,
        city,
        postalCode,
        country,
        homePhone,
        extension,
        notes,
        reportsTo,
        id: employeeId,
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

const employeesRepository = new EmployeesRepository(employees);

export default employeesRepository;
