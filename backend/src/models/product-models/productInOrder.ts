export interface ProductInOrder {
  productId: number | null;
  productName: string | null;
  quantity: number;
  orderPrice: number;
  discount: number;
  totalPrice: number;
}
