import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { ProductModel } from "src/models/product-models/product";
import { ProductDetails } from "src/models/product-models/productDetails";
import { SearchResultProduct } from "src/models/product-models/searchResultProduct";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class ProductsService {
  getAll = async (): Promise<GetAllDto<ProductModel>> => {
    const query = await productsRepository.getAll();
    const { details, data: allProducts } = query;
    return new GetAllDto(allProducts, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<ProductDetails>> => {
    const response = await productsRepository.getById(id);
    const { details, data: product } = response;
    if (!product) {
      throw ServicesError.ProductNotFound(id);
    }
    return new GetOneDto(product, [details]);
  };
  search = async (
    searchString: string
  ): Promise<GetAllDto<SearchResultProduct>> => {
    const response = await productsRepository.find(searchString);
    const { details, data: suitableProducts } = response;
    return new GetAllDto(suitableProducts, [details]);
  };
}

const productsService = new ProductsService();
export default productsService;
