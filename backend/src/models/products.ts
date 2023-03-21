export interface ProductModel {
  name: string;
  quantityPerUnit: string;
  price: number;
  stock: number;
  orders: number;
  id: number;
}

export interface ProductDetails extends Omit<ProductModel, "orders"> {
  unitsInOrder: number;
  supplier: string | null;
  supplierId: number | null;
  reorderLevel: number;
  discontinued: number;
}

export interface ProductInOrder {
  productId: number | null;
  productName: string | null;
  quantity: number;
  orderPrice: number;
  discount: number;
  totalPrice: number;
}

export type SearchResultProduct = Omit<ProductModel, "orders">;
