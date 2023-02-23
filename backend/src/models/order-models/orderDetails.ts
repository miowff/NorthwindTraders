import { OrderModel } from "./order";
import { ProductInOrder } from "../product-models/productInOrder";

export class OrderDetails extends OrderModel
{
    customerId:string;
    totalDiscount:number;
    shipVia:string;
    freight:number;
    orderDate:Date;
    requiredDate:Date;
    shipPostalCode:string;
    productsInOrder:ProductInOrder[]
}