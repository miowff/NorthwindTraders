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
    const allProducs: ProductModel[] = await this.db.select(products).fields({
      name: products.productName,
      quantityPerUnit: products.quantityPerUnit,
      price: products.unitPrice,
      stock: products.unitsInStock,
      orders: products.unitsOnOrder,
      id: products.productId,
    });
    return allProducs;
  };
  override getByColumn = async (
    column: string,
    value: number
  ): Promise<any> => {
    const product: Array<ProductDetails> = await this.db
      .select(products)
      .leftJoin(suppliers, eq(suppliers.supplierId, products.supplierId))
      .where(eq(products[column], value))
      .fields({
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
      });
    return product;
  };
  find = async (searchString: string): Promise<any> => {
    const suitableProducts = await this.db
      .select(products)
      .where(like(products.productName, `%${searchString}%`))
      .fields({
        productName: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
      });
    return suitableProducts;
  };
  productsInOrder = async (orderId: number): Promise<ProductInOrder[]> => {
    const productsInOrder: ProductInOrder[] = await this.db
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
      .where(eq(orderDetails.orderId, orderId));
    return productsInOrder;
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
