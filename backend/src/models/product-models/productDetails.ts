export interface ProductDetails {
  name: string;
  quantityPerUnit: string;
  price: number;
  stock: number;
  unitsInOrder: number;
  id: number;
  supplier: string | null;
  supplierId: number | null;
  reorderLevel: number;
  discontinued: number;
}
