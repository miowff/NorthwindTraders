export interface CustomerModel {
  companyName: string;
  contactName: string;
  contactTitle: string;
  city: string;
  country: string;
  customerId: string;
}

export interface CustomerDetails extends CustomerModel {
  address: string;
  postalCode: string;
  region: string | null;
  phone: string;
  fax: string;
}

export type SearchResultCustomer = Omit<
  CustomerDetails,
  "city" | "address" | "region" | "postalCode" | "fax" | "city" | "country"
>;
