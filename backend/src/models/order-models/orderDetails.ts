import { ProductInOrder } from "../product-models/productInOrder";

export interface OrderDetails {
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
  shipVia: string | null;
  freight: number;
  orderDate: Date;
  requiredDate: Date;
  shipPostalCode: string;
  productsInOrder: ProductInOrder[];
}
