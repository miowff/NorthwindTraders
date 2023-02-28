export interface ProductDetails {
  name: string;
  quantityPerUnit: string;
  price: number;
  stock: number;
  orders?: number;
  id: number;
  supplie?: string;
  supplierId?: number;
  reorderLevel?: number;
  discontinued?: number;
}
