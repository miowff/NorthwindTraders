import employeesRepository from "src/db/repositories/employeesRepository";
import { ServicesError } from "src/errors/servicesError";
import { EmployeeModel } from "src/models/employees-models/employee";
import { EmployeeDetails } from "src/models/employees-models/employeeDetails";
import { EmployeeHead } from "src/models/employees-models/employeeHead";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class EmployeesService {
  getAll = async (): Promise<GetAllDto<EmployeeModel>> => {
    const response = await employeesRepository.getAll();
    const { details, data: allEmployees } = response;
    return new GetAllDto(allEmployees, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<EmployeeDetails>> => {
    const response = await employeesRepository.getById(id);
    const { details: getEmployee, data: employee } = response;
    if (!employee) {
      throw ServicesError.EmployeeNotFound(id);
    }
    const reportsToResponse = await employeesRepository.getById(
      employee.reportsToId
    );
    const { details: getEmployeeHead, data: reportsTo } = reportsToResponse;
    if (reportsTo) {
      const { id, name } = reportsTo;
      const employeeHead: EmployeeHead = { id: id, name: name };
      employee.reportsTo = employeeHead;
    }
    return new GetOneDto(employee, [getEmployee, getEmployeeHead]);
  };
}

const employeesService = new EmployeesService();
export default employeesService;
