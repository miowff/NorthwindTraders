import { sql } from "drizzle-orm";
import { eq, like } from "drizzle-orm/expressions";
import { ProductInOrder } from "src/models/product-models/productInOrder";
import { ProductModel } from "src/models/product-models/product";
import { orderDetails } from "../schema/orderDetail";
import { products } from "../schema/products";
import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { DatabaseResponse } from "src/models/dbResponse";

class ProductsRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<ProductModel[]>> => {
    const query = this.db
      .select({
        name: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        orders: products.unitsOnOrder,
        id: products.productId,
      })
      .from(products);
    const sql = query.toSQL();
    const allProducts = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allProducts.length,
        sql.sql
      ),
      data: allProducts,
    };
  };
  getById = async (id: number): Promise<DatabaseResponse<ProductModel>> => {
    const query = this.db
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
      .where(eq(products.productId, id));
    const sqlQuery = query.toSQL();
    const product = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_LEFT_JOIN,
        1,
        sqlQuery.sql
      ),
      data: product[0],
    };
  };
  find = async (
    searchString: string
  ): Promise<DatabaseResponse<ProductModel[]>> => {
    const query = this.db
      .select({
        name: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
        id: products.productId,
      })
      .from(products)
      .where(like(products.productName, `%${searchString}%`));
    const sqlQuery = query.toSQL();
    const suitableProducts = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_WHERE,
        suitableProducts.length,
        sqlQuery.sql
      ),
      data: suitableProducts,
    };
  };
  productsInOrder = async (
    orderId: number
  ): Promise<DatabaseResponse<ProductInOrder[]>> => {
    const query = this.db
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
    const sqlQuery = query.toSQL();
    const productsInOrder = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT_LEFT_JOIN,
        productsInOrder.length,
        sqlQuery.sql
      ),
      data: productsInOrder,
    };
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
