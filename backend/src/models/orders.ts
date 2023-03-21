import { ProductInOrder } from "./products";


export interface OrderModel {
  id: number;
  totalPrice: number;
  totalProducts: number;
  totalQuantity: number;
  shippedDate: Date;
  shipName: string;
  shipCity: string;
  shipCountry: string;
}

export interface OrderDetails extends OrderModel {
  customerId: string;
  totalDiscount: number;
  shipVia: string | null;
  freight: number;
  orderDate: Date;
  requiredDate: Date;
  shipPostalCode: string;
  productsInOrder: ProductInOrder[];
}
