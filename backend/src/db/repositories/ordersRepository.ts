import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { DatabaseResponse } from "src/models/dbResponse";
import { OrderModel } from "src/models/order-models/order";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { Order } from "../entities/order";
import { orderDetails } from "../schema/orderDetail";
import { orders } from "../schema/orders";
import { shippers } from "../schema/shippers";
import { BaseRepository } from "./baseRepository";

class OrdersRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<OrderModel[]>> => {
    const query = this.db
      .select({
        totalPrice:
          sql`ROUND(SUM(${orderDetails.unitPrice} * ${orderDetails.quantity}),3)`.as<number>(),
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
    const sqlQuery = query.toSQL();
    const allOrders = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_LEFT_JOIN,
        1,
        sqlQuery.sql
      ),
      data: allOrders,
    };
  };
  getById = async (value: number): Promise<DatabaseResponse<Order>> => {
    const query = this.db
      .select({
        customerId: orders.customerId,
        shipName: orders.shipName,
        totalProducts: sql`COUNT(${orderDetails.orderId})`.as<number>(),
        totalQuantity: sql`SUM(${orderDetails.quantity})`.as<number>(),
        totalPrice:
          sql`ROUND(SUM(${orderDetails.unitPrice} * ${orderDetails.quantity}),3)`.as<number>(),
        totalDiscount:
          sql`ROUND(SUM(${orderDetails.unitPrice}*${orderDetails.quantity}*${orderDetails.discount}),3)`.as<number>(),
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
      .where(eq(orders.orderId, value));
    const sqlQuery = query.toSQL();
    const order = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_LEFT_JOIN,
        1,
        sqlQuery.sql
      ),
      data: order[0],
    };
  };
}

const ordersRepository = new OrdersRepository(orders);
export default ordersRepository;
