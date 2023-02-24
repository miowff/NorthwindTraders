import emplyeesRepository from "src/db/repositories/employeesRepository";
import { ServicesError } from "src/errors/servicesError";
import { EmployeeModel } from "src/models/employees-models/employee";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/responce";

class EmployeesService {
  getAll = async (): Promise<GetAllDto<EmployeeModel>> => {
    const response = await emplyeesRepository.getAll();
    const { details, data: allEmployees } = response;
    return new GetAllDto(allEmployees, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<EmployeeModel>> => {
    const response = await emplyeesRepository.getById(id);
    const { details: getEmplyee, data: employee } = response;
    if (!employee) {
      throw ServicesError.EmployeeNotFound(id);
    }
    const reportsToResponse = await emplyeesRepository.getById(
      employee.reportsTo
    );
    const { details: getEmployeeHead, data: reportsTo } = reportsToResponse;
    if (reportsTo) {
      employee.reportsToName = reportsTo.name;
    }
    return new GetOneDto(employee, [getEmplyee, getEmployeeHead]);
  };
}

const employeesService = new EmployeesService();
export default employeesService;
