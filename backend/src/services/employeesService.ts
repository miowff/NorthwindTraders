import emplyeesRepository from "src/db/repositories/employeesRepository";
import { ServicesError } from "src/errors/servicesError";
import { EmployeeModel } from "src/models/employees-models/employee";
import { ResponseDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

class EmployeesService {
  getAll = async (): Promise<ResponseDto> => {
    const allEmployees = await emplyeesRepository.getAll();
    return new ResponseDto(allEmployees, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allEmployees.length,
      operationDescription: "SELECT * FROM Employees",
    });
  };
  getById = async (id: number): Promise<ResponseDto> => {
    const employee:EmployeeModel = await emplyeesRepository.getByColumn("employeeId", id);
    if (!employee[0]) {
      throw ServicesError.EmployeeNotFound(id);
    }
    const reportsTo = await emplyeesRepository.getByColumn(
      "employeeId",
      employee[0].reportsToId
    );
    if (reportsTo[0]) {
      employee[0].reportsTo = reportsTo[0].name;
    }
    return new ResponseDto(employee, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: 1,
      operationDescription: `SELECT * FROM Employees WHERE Employees.EmployeeID = ${id}`,
    });
  };
}

const employeesService = new EmployeesService();
export default employeesService;
