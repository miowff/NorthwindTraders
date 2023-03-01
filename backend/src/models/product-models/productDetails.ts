export interface ProductDetails {
  name: string;
  quantityPerUnit: string;
  price: number;
  stock: number;
  unitsInOrder: number;
  id: number;
  supplier: string;
  supplierId: number;
  reorderLevel: number;
  discontinued: number;
}
