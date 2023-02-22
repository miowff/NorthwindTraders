import ordersRepository from "src/db/repositories/ordersRepository";
import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { OrderDetails } from "src/models/order-models/orderDetails";
import { ResponseDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

class OrdersService {
  getAll = async (): Promise<ResponseDto> => {
    const [result] = await ordersRepository.getAll();
    return new ResponseDto(result, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: Object.keys(result).length,
      operationDescription: "SELECT * FROM Orders",
    });
  };
  getById = async (id: number): Promise<ResponseDto> => {
    const order = await ordersRepository.getByColumn("orderId", id);
    if (!order[0].customerId) {
      throw ServicesError.OrderNotFound(id);
    }
    const details = await productsRepository.productsInOrder(id);
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
      shipPostalCode: order[0].shipPostalCode,
      shipCountry: order[0].shipCountry,
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
