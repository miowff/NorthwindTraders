export interface SupplierModel {
  companyName: string;
  contactName: string;
  contactTitle: string;
  city: string;
  country: string;
  supplierId: number;
}

export interface SupplierDetails extends SupplierModel {
  address: string;
  postalCode: string;
  phone: string;
  fax: string | null;
  homePage: string | null;
}
