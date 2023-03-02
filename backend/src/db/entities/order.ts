export interface Order {
  id: number;
  totalPrice: number;
  totalProducts: number;
  totalQuantity: number;
  shippedDate: Date;
  shipName: string;
  shipCity: string;
  shipCountry: string;
  customerId: string;
  totalDiscount: number;
  shipVia: string;
  freight: number;
  orderDate: Date;
  requiredDate: Date;
  shipPostalCode: string;
}
