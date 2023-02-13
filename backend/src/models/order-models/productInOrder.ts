export class ProductInOrder {
  productId: number;
  productName: string;
  productQuantity: number;
  orderPrice: number;
  discount: number;
  totalPrice: number;
  constructor(
    id: number,
    name: string,
    quantity: number,
    unitPrice: number,
    discount: number
  ) {
    this.productId = id;
    this.productName = name;
    this.productQuantity = quantity;
    this.discount = discount;
    this.orderPrice = unitPrice;
    this.totalPrice = this.orderPrice * this.productQuantity;
  }
}
