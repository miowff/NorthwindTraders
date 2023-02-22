import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { orderDetails } from "../schema/orderDetail";
import { orders } from "../schema/orders";
import { shippers } from "../schema/shippers";
import { BaseRepository } from "./baseRepository";

class OrdersRepositoy extends BaseRepository {
  getAll = async (): Promise<any> => {
    const allOrders = await this.db.execute(
      sql`SELECT SUM(${orderDetails.unitPrice} * ${orderDetails.quantity}) AS TotalPrice, 
        SUM(${orderDetails.quantity}) AS Products, COUNT(${orderDetails.orderId}) AS TotalProducts, 
        ${orders.orderId} as Id, ShippedDate as Shipped, ShipName,  ShipCity as City, ShipCountry as Country FROM ${orders},
        ${orderDetails} WHERE ${orderDetails.orderId} = ${orders.orderId} GROUP BY ${orders.orderId} `
    );
    return allOrders;
  };
  override getByColumn = async (
    column: string,
    value: number
  ): Promise<any> => {
    const order = await this.db
      .select(orders)
      .leftJoin(shippers, eq(shippers.shipperId, orders.shipVia))
      .leftJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
      .where(eq(orders[column], value))
      .fields({
        customerId: orders.customerId,
        shipName: orders.shipName,
        totalProducts: sql`COUNT(${orderDetails.orderId})`.as<number>(),
        totalQuantity: sql`SUM(${orderDetails.quantity})`.as<number>(),
        totalPrice:
          sql`SUM(${orderDetails.unitPrice} * ${orderDetails.quantity})`.as<number>(),
        totalDiscount:
          sql`SUM(${orderDetails.unitPrice}*${orderDetails.quantity}*${orderDetails.discount})`.as<number>(),
        shipVia: shippers.companyName,
        freight: orders.freight,
        orderDate: orders.orderDate,
        requiredDate: orders.requiredDate,
        shippedDate: orders.shippedDate,
        shipCity: orders.shipCity,
        shipPostalCode: orders.shipPostalCode,
        shipCountry: orders.shipCountry,
      });
    return order;
  };
}

const ordersRepository = new OrdersRepositoy(orders);
export default ordersRepository;
