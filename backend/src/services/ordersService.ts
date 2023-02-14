import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { database } from "src/db/dbConnection";
import { orderDetails } from "src/db/schema/orderDetail";
import { orders } from "src/db/schema/orders";
import { products } from "src/db/schema/products";
import { shippers } from "src/db/schema/shippers";
import { ServicesError } from "src/errors/servicesError";
import { OrderDetails } from "src/models/order-models/orderDetails";
import { ProductInOrder } from "src/models/order-models/productInOrder";
import { ResponceDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

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
      operation: OperationsTypes.SELECT,
      resultsCount: Object.keys(result).length,
      operationDescription: "SELECT * FROM Orders",
    });
  };
  getByIdAsync = async (id: number): Promise<ResponceDto> => {
    const order = await database
      .select(orders)
      .leftJoin(shippers, eq(shippers.shipperId, orders.shipVia))
      .leftJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
      .where(eq(orders.orderId, id))
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
        shipRegion: orders.shipRegion,
        shipPostalCode: orders.shipPostalCode,
        shipCountry: orders.shipCountry,
      });
    if (!order[0].customerId) {
      throw ServicesError.OrderNotFound(id);
    }
    const details: ProductInOrder[] = await database
      .select(orderDetails)
      .leftJoin(products, eq(products.productId, orderDetails.productId))
      .fields({
        productId: products.productId,
        productName: products.productName,
        orderPrice: orderDetails.unitPrice,
        quantity: orderDetails.quantity,
        discount: orderDetails.discount,
        totalPrice:
          sql`${orderDetails.unitPrice} * ${orderDetails.quantity}`.as<number>(),
      })
      .where(eq(orderDetails.orderId, id));
    const orderInfo: OrderDetails = {
      id: id,
      customerId: order[0].customerId,
      shipName: order[0].shipName,
      totalProducts: order[0].totalProducts,
      totalQuantity: order[0].totalQuantity,
      totalPrice: order[0].totalPrice,
      totalDiscount: order[0].totalDiscount,
      shipVia: order[0].shipVia,
      freight: order[0].freight,
      orderDate: order[0].orderDate,
      requiredDate: order[0].requiredDate,
      shippedDate: order[0].shippedDate,
      shipCity: order[0].shipCity,
      shipRegion: order[0].shipRegion,
      shipPostalCode: order[0].shipPostalCode,
      shipCountry: order[0].shipCountry,
      productsInOrder: details,
    };
    return new ResponceDto(orderInfo, {
      time: new Date(),
      operation: OperationsTypes.SELECT_LEFT_JOIN,
      resultsCount: 1,
      operationDescription: `SELECT * LEFT JOIN Shippers ON Orders.ShipVia 
      LEFT JOIN OrderDetails ON Orders.OrderID LEFT JOIN Products ON OrderDetails.ProductID,
      WHERE Orders.ID = ${id}`,
    });
  };
}

const ordersService = new OrdersService();
export default ordersService;
