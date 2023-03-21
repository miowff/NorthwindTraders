import employeesRepository from "src/db/repositories/employeesRepository";
import { ServicesError } from "src/errors/servicesError";
import { EmployeeDetails, EmployeeHead, EmployeeModel } from "src/models/employees";
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
      employee.reportsTo
    );

    const { details: getEmployeeHead, data: reportsTo } = reportsToResponse;
    if (reportsTo) {
      const { id: headId, name: headName } = reportsTo;
      const employeeHead: EmployeeHead = { id: headId, name: headName };
      const employeeModel: EmployeeDetails = Object.assign(employee, {
        reportsTo: employeeHead,
      });
      return new GetOneDto(employeeModel, [getEmployee, getEmployeeHead]);
    }
    const employeeModel: EmployeeDetails = Object.assign(employee, {
      reportsTo: null,
    });
    return new GetOneDto(employeeModel, [getEmployee, getEmployeeHead]);
  };
}

const employeesService = new EmployeesService();
export default employeesService;
