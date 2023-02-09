import { orders } from "../schema/orders";
import { BaseRepository } from "./baseRepository";

class OrdersRepository extends BaseRepository {}

const ordersRepository = new OrdersRepository(orders);
export default ordersRepository;
