import { sql } from "drizzle-orm";
import { database } from "src/db/dbConnection";
import { orderDetails } from "src/db/schema/orderDetail";
import { orders } from "src/db/schema/orders";
import { ResponceDto } from "src/models/responce";

class OrdersService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const [result] = await database.execute(
      sql`SELECT SUM(${orderDetails.unitPrice} * ${orderDetails.quantity}) AS TotalPrice, 
      SUM(${orderDetails.quantity}) AS Products, COUNT(${orderDetails.orderId}) AS TotalProducts, 
      ${orders.orderId} as Id, ShippedDate as Shipped, ShipName,  ShipCity as City, ShipCountry as Country FROM ${orders},
      ${orderDetails} WHERE ${orderDetails.orderId} = ${orders.orderId} GROUP BY ${orders.orderId} `
    );
    return new ResponceDto(result, {
      time: new Date(),
      operation: "SELECT",
      resultsCount: Object.keys(result).length,
      operationDescription: "SELECT * FROM Orders",
    });
  };
}

const ordersService = new OrdersService();
export default ordersService;
