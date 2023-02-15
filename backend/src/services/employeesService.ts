import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { database } from "src/db/dbConnection";
import { employees } from "src/db/schema/employees";
import { ServicesError } from "src/errors/servicesError";
import { EmployeeModel } from "src/models/employees-models/employee";
import { ResponceDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

class EmployeesService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const allEmployees: EmployeeModel[] = await database
      .select(employees)
      .fields({
        name: sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
        title: employees.title,
        city: employees.city,
        phone: employees.homePhone,
        country: employees.country,
        id: employees.employeeId,
      });
    return new ResponceDto(allEmployees, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allEmployees.length,
      operationDescription: "SELECT * FROM Employees",
    });
  };
  getByIdAsync = async (id: number): Promise<ResponceDto> => {
    const employee = await database
      .select(employees)
      .where(eq(employees.employeeId, id))
      .fields({
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
      });
    if (!employee[0]) {
      throw ServicesError.EmployeeNotFound(id);
    }

    const reportsTo = await database
      .select(employees)
      .where(eq(employees.employeeId, employee[0].reportsToId))
      .fields({
        reportsToName:
          sql`CONCAT(${employees.firstName},' ',${employees.lastName} )`.as<string>(),
      });
    employee[0]["reportsTo"] = reportsTo[0];
    return new ResponceDto(employee, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: 1,
      operationDescription: `SELECT * FROM Employees WHERE Employees.EmployeeID = ${id}`,
    });
  };
}

const employeesService = new EmployeesService();
export default employeesService;
