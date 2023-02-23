import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { OrderModel } from "src/models/order-models/order";
import { OrderDetails } from "src/models/order-models/orderDetails";
import { orderDetails } from "../schema/orderDetail";
import { orders } from "../schema/orders";
import { shippers } from "../schema/shippers";
import { BaseRepository } from "./baseRepository";

class OrdersRepositoy extends BaseRepository {
  getAll = async (): Promise<OrderModel[]> => {
    const all = await this.db
      .select({
        totalPrice:
          sql`SUM(${orderDetails.unitPrice} * ${orderDetails.quantity})`.as<number>(),
        totalProducts: sql`SUM(${orderDetails.quantity})`.as<number>(),
        totalQuantity: sql`COUNT(${orderDetails.orderId})`.as<number>(),
        id: orders.orderId,
        shippedDate: orders.shippedDate,
        shipName: orders.shipName,
        shipCity: orders.shipCity,
        shipCountry: orders.shipCountry,
      })
      .from(orders)
      .leftJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
      .groupBy(orderDetails.orderId);
    return all;
  };
  override getByColumn = async (
    column: string,
    value: number
  ): Promise<OrderDetails> => {
    const order = await this.db
      .select({
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
        id: orders.orderId,
      })
      .from(orders)
      .leftJoin(shippers, eq(shippers.shipperId, orders.shipVia))
      .leftJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
      .where(eq(orders[column], value));
    return order[0];
  };
}

const ordersRepository = new OrdersRepositoy(orders);
export default ordersRepository;
