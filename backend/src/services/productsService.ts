import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { ProductModel } from "src/models/product-models/product";
import { ResponseDto } from "src/models/response/responce";
import { OperationsTypes } from "src/operationTypes";

class ProductsService {
  getAll = async (): Promise<ResponseDto> => {
    const allProducs: ProductModel[] = await productsRepository.getAll();
    return new ResponseDto(allProducs, {
      time: new Date(),
      operation: OperationsTypes.SELECT,
      resultsCount: allProducs.length,
      operationDescription: "SELECT * FROM Products",
    });
  };
  getById = async (id: number): Promise<ResponseDto> => {
    const product = await productsRepository.getByColumn(
      "productId",
      id
    );
    if (!product[0]) {
      throw ServicesError.ProductNotFound(id);
    }
    return new ResponseDto(product[0], {
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
  search = async (searchString: string): Promise<ResponseDto> => {
    const suitableProducts = await productsRepository.find(searchString);
    return new ResponseDto(suitableProducts, {
      time: new Date(),
      operation: OperationsTypes.SELECT_WHERE,
      resultsCount: suitableProducts.length,
      operationDescription: `SELECT * FROM PRODUCT WHERE Product.ProductName LIKE %${searchString}%`,
    });
  };
}

const productsService = new ProductsService();
export default productsService;
