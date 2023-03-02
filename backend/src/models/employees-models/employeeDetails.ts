import { EmployeeHead } from "./employeeHead";

export interface EmployeeDetails {
  name: string;
  title: string;
  city: string;
  country: string;
  id: number;
  titleOfCourtesy: string;
  birthDate: Date;
  hireDate: Date;
  address: string;
  postalCode: string;
  homePhone: string;
  extension: string;
  notes: string;
  reportsTo: EmployeeHead | null;
}
