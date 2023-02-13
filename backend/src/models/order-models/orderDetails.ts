import { OrderModel } from "./order";
import { ProductInOrder } from "./productInOrder";

export class OrderDetails extends OrderModel
{
    customerId:string;
    totalDiscount:number;
    shipVia:string;
    freight:string;
    orderDate:Date;
    requiredDate:Date;
    shipRegion:string;
    shipPostalCode:string;
    productsInOrder:ProductInOrder[]
}