import { eq, like } from "drizzle-orm/expressions";
import { database } from "src/db/dbConnection";
import { products } from "src/db/schema/products";
import { suppliers } from "src/db/schema/suppliers";
import { ServicesError } from "src/errors/servicesError";
import { ProductModel } from "src/models/product-models/product";
import { ProductDetails } from "src/models/product-models/productDetails";
import { ResponceDto } from "src/models/responce";
import { OperationsTypes } from "src/operationTypes";

class ProductsService {
  getAllAsync = async (): Promise<ResponceDto> => {
    const allProducs: ProductModel[] = await database.select(products).fields({
      name: products.productName,
      quantityPerUnit: products.quantityPerUnit,
      price: products.unitPrice,
      stock: products.unitsInStock,
      orders: products.unitsOnOrder,
      id: products.productId,
    });
    return new ResponceDto(allProducs, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allProducs.length,
      operationDescription: "SELECT * FROM Products",
    });
  };
  getByIdAsync = async (id: number): Promise<ResponceDto> => {
    const product: Array<ProductDetails> = await database
      .select(products)
      .leftJoin(suppliers, eq(suppliers.supplierId, products.supplierId))
      .where(eq(products.productId, id))
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
    if (!product[0]) {
      throw ServicesError.ProductNotFound(id);
    }
    return new ResponceDto(product[0], {
      time: new Date(),
      operation: OperationsTypes.SELECT_LEFT_JOIN,
      resultsCount: 1,
      operationDescription: `
      SELECT Products.ProductName as name, Products.QuantityPerUnit as quantityPerUnit
      Products.UnitPrice as price, Products.UnitsInStock as stock, Products.UnitsInOrder as orders,
      Products.ProductID as id, Suppliers.CompanyName as supplier,Suppliers.SupplierID as supplierId,
      Products.ReorderLevel as reorderLevel,Products.Discounted as discounted 
      FROM Products LEFT JOIN Suppliers ON Products.SupplierID WHERE Products.ProductID = ${id}`,
    });
  };
  searchProductAsync = async (searchString: string): Promise<ResponceDto> => {
    const suitableProducts = await database
      .select(products)
      .where(like(products.productName, `%${searchString}%`))
      .fields({
        productName: products.productName,
        quantityPerUnit: products.quantityPerUnit,
        price: products.unitPrice,
        stock: products.unitsInStock,
      });
    return new ResponceDto(suitableProducts, {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: 1,
      operationDescription: `SELECT * FROM PRODUCT WHERE Product.ProductName LIKE %${searchString}%`,
    });
  };
}

const productsService = new ProductsService();
export default productsService;
