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
