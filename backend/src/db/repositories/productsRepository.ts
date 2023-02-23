import { sql } from "drizzle-orm";
import { eq, like } from "drizzle-orm/expressions";
import { ProductInOrder } from "src/models/order-models/productInOrder";
import { ProductModel } from "src/models/product-models/product";
import { ProductDetails } from "src/models/product-models/productDetails";
import { orderDetails } from "../schema/orderDetail";
import { products } from "../schema/products";
import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";

class ProductsRepository extends BaseRepository {
  getAll = async (): Promise<ProductModel[]> => {
    const allProducs: ProductModel[] = await this.db
      .select({
        name: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        orders: products.unitsOnOrder,
        id: products.productId,
      })
      .from(products);
    return allProducs;
  };
  override getByColumn = async (
    column: string,
    value: number
  ): Promise<any> => {
    const product: Array<ProductDetails> = await this.db
      .select({
        name: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        orders: products.unitsOnOrder,
        id: products.productId,
        supplier: suppliers.companyName,
        supplierId: suppliers.supplierId,
        reorderLevel: products.reorderLevel,
        discontinued: products.discontinued,
      })
      .from(products)
      .leftJoin(suppliers, eq(suppliers.supplierId, products.supplierId))
      .where(eq(products[column], value));
    return product;
  };
  find = async (searchString: string): Promise<any> => {
    const suitableProducts = await this.db
      .select({
        productName: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
      })
      .from(products)
      .where(like(products.productName, `%${searchString}%`));
    return suitableProducts;
  };
  productsInOrder = async (orderId: number): Promise<ProductInOrder[]> => {
    const productsInOrder: ProductInOrder[] = await this.db
      .select({
        productId: products.productId,
        productName: products.productName,
        orderPrice: orderDetails.unitPrice,
        quantity: orderDetails.quantity,
        discount: orderDetails.discount,
        totalPrice:
          sql`${orderDetails.unitPrice} * ${orderDetails.quantity}`.as<number>(),
      })
      .from(orderDetails)
      .leftJoin(products, eq(products.productId, orderDetails.productId))
      .where(eq(orderDetails.orderId, orderId));
    return productsInOrder;
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
