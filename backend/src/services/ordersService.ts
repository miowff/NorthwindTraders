import ordersRepository from "src/db/repositories/ordersRepository";
import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { OrderModel } from "src/models/order-models/order";
import { OrderDetails } from "src/models/order-models/orderDetails";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class OrdersService {
  getAll = async (): Promise<GetAllDto<OrderModel>> => {
    const response = await ordersRepository.getAll();
    const { details, data: allOrders } = response;
    return new GetAllDto(allOrders, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<OrderDetails>> => {
    const orderByIdResponse = await ordersRepository.getById(id);
    const { details: orderByIdDetails, data: order } = orderByIdResponse;
    if (!order.customerId) {
      throw ServicesError.OrderNotFound(id);
    }
    const productsInOrderResponse = await productsRepository.productsInOrder(
      id
    );
    const { details: productsInOrderDetails, data: productsInOrder } =
      productsInOrderResponse;
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
      productsInOrder: productsInOrder,
    };
    return new GetOneDto(orderInfo, [
      orderByIdDetails,
      productsInOrderDetails,
    ]);
  };
}

const ordersService = new OrdersService();
export default ordersService;
