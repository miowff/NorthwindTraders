export interface EmployeeModel {
  name: string;
  title: string;
  city: string;
  phone?: string;
  country: string;
  id: number;
  reportsTo?: number;
  titleOfCourtesy?: string;
  birthDate?: Date;
  hireDate?: Date;
  adress?: string;
  postalCode?: string;
  homePhone?: string;
  extension?: string;
  notes?: string;
  reportsToName?:string;
}
