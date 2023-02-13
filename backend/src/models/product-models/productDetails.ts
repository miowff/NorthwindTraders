import { ProductModel } from "./product";

export class ProductDetails extends ProductModel
{
    supplier:string;
    supplierId:number;
    reorderLevel:number;
    discontinued:number;
}