import employeesRepository from "src/db/repositories/employeesRepository";
import { ServicesError } from "src/errors/servicesError";
import {
  EmployeeDetails,
  EmployeeHead,
  EmployeeModel,
} from "src/models/employees";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class EmployeesService {
  getAll = async (): Promise<GetAllDto<EmployeeModel>> => {
    const { details, data: allEmployees } = await employeesRepository.getAll();
    return new GetAllDto(allEmployees, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<EmployeeDetails>> => {
    const { details: getEmployee, data: employee } =
      await employeesRepository.getById(id);
    if (!employee) {
      throw ServicesError.EmployeeNotFound(id);
    }
    const { details: getEmployeeHead, data: reportsTo } =
      await employeesRepository.getById(employee.reportsTo);
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
