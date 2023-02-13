import { database } from "src/db/dbConnection";
import { employees } from "src/db/schema/employees";
import { EmployeeModel } from "src/models/employees-models/employee";
import { ResponceDto } from "src/models/responce";

class EmployeesService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const allEmployees = await database.select(employees).fields({
      name: { firstName: employees.firstName, lastName: employees.lastName },
      title: employees.title,
      city: employees.city,
      phone: employees.homePhone,
      country: employees.country,
      id: employees.employeeId,
    });
    const result = allEmployees.map((employee) => {
      return new EmployeeModel(
        employee.name.firstName + " " + employee.name.lastName,
        employee.title,
        employee.city,
        employee.phone,
        employee.country,
        employee.id
      );
    });
    return new ResponceDto(result, {
      time: new Date(),
      operation: "SELECT",
      resultsCount: result.length,
      operationDescription: "SELECT * FROM Employees",
    });
  };
  
}

const employeesService = new EmployeesService();
export default employeesService;
