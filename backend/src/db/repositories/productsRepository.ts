import { sql } from "drizzle-orm";
import { eq, like } from "drizzle-orm/expressions";
import { orderDetails } from "../schema/orderDetail";
import { products } from "../schema/products";
import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";
import { ResponseDetails } from "src/models/response/responseDetails";
import { OperationsTypes } from "src/operationTypes";
import { DatabaseResponse } from "src/models/dbResponse";
import {
  ProductDetails,
  ProductInOrder,
  ProductModel,
  SearchResultProduct,
} from "src/models/products";
import timer from "src/services/utils/timer";

class ProductsRepository extends BaseRepository {
  getAll = async (): Promise<DatabaseResponse<ProductModel[]>> => {
    const {
      productName,
      quantityPerUnit,
      unitPrice,
      unitsInStock,
      unitsOnOrder,
      productId,
    } = products;
    timer.start();
    const query = this.db
      .select({
        name: productName,
        quantityPerUnit,
        price: unitPrice,
        stock: unitsInStock,
        orders: unitsOnOrder,
        id: productId,
      })
      .from(products);
    const sql = query.toSQL();
    const allProducts = await query;
    return {
      details: new ResponseDetails(
        new Date(),
        OperationsTypes.SELECT,
        allProducts.length,
        sql.sql,
        timer.getDifference()
      ),
      data: allProducts,
    };
  };
  getById = async (id: number): Promise<DatabaseResponse<ProductDetails>> => {
    const {
      productName,
      quantityPerUnit,
      unitPrice,
      unitsInStock,
      unitsOnOrder,
      productId,
      reorderLevel,
      discontinued,
    } = products;
    timer.start();
    const query = this.db
      .select({
        name: productName,
        quantityPerUnit,
        price: unitPrice,
        stock: unitsInStock,
        unitsInOrder: unitsOnOrder,
        id: productId,
        supplier: suppliers.companyName,
        supplierId: suppliers.supplierId,
        reorderLevel,
        discontinued,
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
        sqlQuery.sql,
        timer.getDifference()
      ),
      data: product[0],
    };
  };
  find = async (
    searchString: string
  ): Promise<DatabaseResponse<SearchResultProduct[]>> => {
    const { productName, quantityPerUnit, unitPrice, unitsInStock, productId } =
      products;
    timer.start();
    const query = this.db
      .select({
        name: productName,
        quantityPerUnit,
        price: unitPrice,
        stock: unitsInStock,
        id: productId,
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
        sqlQuery.sql,
        timer.getDifference()
      ),
      data: suitableProducts,
    };
  };
  productsInOrder = async (
    orderId: number
  ): Promise<DatabaseResponse<ProductInOrder[]>> => {
    const { productId, productName } = products;
    const { unitPrice, quantity, discount } = orderDetails;
    timer.start();
    const query = this.db
      .select({
        productId,
        productName,
        orderPrice: unitPrice,
        quantity: quantity,
        discount: sql`ROUND(${discount} * 100,2)`.as<number>(),
        totalPrice: sql`ROUND(${unitPrice} * ${quantity},2)`.as<number>(),
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
        sqlQuery.sql,
        timer.getDifference()
      ),
      data: productsInOrder,
    };
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
