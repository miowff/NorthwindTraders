import ordersRepository from "src/db/repositories/ordersRepository";
import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { OrderDetails, OrderModel } from "src/models/orders";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class OrdersService {
  getAll = async (): Promise<GetAllDto<OrderModel>> => {
    const { details, data: allOrders } = await ordersRepository.getAll();
    return new GetAllDto(allOrders, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<OrderDetails>> => {
    const { details: orderByIdDetails, data: order } =
      await ordersRepository.getById(id);
    if (!order.customerId) {
      throw ServicesError.OrderNotFound(id);
    }
    const { details: productsInOrderDetails, data: productsInOrder } =
      await productsRepository.productsInOrder(id);
    const orderInfo: OrderDetails = Object.assign(
      { productsInOrder: productsInOrder },
      order
    );
    return new GetOneDto(orderInfo, [orderByIdDetails, productsInOrderDetails]);
  };
}

const ordersService = new OrdersService();
export default ordersService;
