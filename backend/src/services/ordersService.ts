import ordersRepository from "src/db/repositories/ordersRepository";
import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { OrderDetails } from "src/models/order-models/orderDetails";
import { ResponseDto } from "src/models/response/responce";
import { OperationsTypes } from "src/operationTypes";

class OrdersService {
  getAll = async (): Promise<ResponseDto> => {
    const result = await ordersRepository.getAll();
    return new ResponseDto(result, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: Object.keys(result).length,
      operationDescription: "SELECT * FROM Orders",
    });
  };
  getById = async (id: number): Promise<ResponseDto> => {
    const order = await ordersRepository.getById(id);
    if (!order.customerId) {
      throw ServicesError.OrderNotFound(id);
    }
    const details = await productsRepository.productsInOrder(id);
    const orderInfo: OrderDetails = {
      id: id,
      customerId: order.customerId,
      shipName: order.shipName,
      totalProducts: order.totalProducts,
      totalQuantity: order.totalQuantity,
      totalPrice: order.totalPrice,
      totalDiscount: order.totalDiscount,
      shipVia: order.shipVia,
      freight: order.freight,
      orderDate: order.orderDate,
      requiredDate: order.requiredDate,
      shippedDate: order.shippedDate,
      shipCity: order.shipCity,
      shipPostalCode: order.shipPostalCode,
      shipCountry: order.shipCountry,
      productsInOrder: details,
    };
    return new ResponseDto(orderInfo, {
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
