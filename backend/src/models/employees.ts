export interface EmployeeModel {
  name: string;
  title: string;
  city: string;
  phone: string;
  country: string;
  id: number;
}
export interface EmployeeDetails extends Omit<EmployeeModel, "phone"> {
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

export interface EmployeeHead {
  id: number;
  name: string;
}
