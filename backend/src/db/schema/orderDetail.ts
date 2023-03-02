import { mysqlTable, int, float } from "drizzle-orm/mysql-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderDetails = mysqlTable("OrderDetails", {
  orderId: int("OrderID")
    .references(() => orders.orderId)
    .notNull(),
  productId: int("ProductID")
    .references(() => products.productId)
    .notNull(),
  unitPrice: float("UnitPrice").notNull(),
  quantity: int("Quantity").notNull(),
  discount: float("Discount").notNull(),
});
