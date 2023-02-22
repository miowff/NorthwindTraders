export class EmployeeModel {
  name: string;
  title: string;
  city: string;
  phone: string;
  country: string;
  id: number;
  reportsTo:number;
  constructor(
    name: string,
    title: string,
    city: string,
    phone: string,
    country: string,
    id: number
  ) {
    this.name = name;
    this.title = title;
    this.city = city;
    this.phone = phone;
    this.country = country;
    this.id = id;
  }
}
