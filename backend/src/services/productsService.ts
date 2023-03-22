import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import {
  ProductDetails,
  ProductModel,
  SearchResultProduct,
} from "src/models/products";
import { GetAllDto } from "src/models/response/getAllResponse";
import { GetOneDto } from "src/models/response/response";

class ProductsService {
  getAll = async (): Promise<GetAllDto<ProductModel>> => {
    const { details, data: allProducts } = await productsRepository.getAll();
    return new GetAllDto(allProducts, [details]);
  };
  getById = async (id: number): Promise<GetOneDto<ProductDetails>> => {
    const { details, data: product } = await productsRepository.getById(id);
    if (!product) {
      throw ServicesError.ProductNotFound(id);
    }
    return new GetOneDto(product, [details]);
  };
  search = async (
    searchString: string
  ): Promise<GetAllDto<SearchResultProduct>> => {
    const { details, data: suitableProducts } = await productsRepository.find(
      searchString
    );
    return new GetAllDto(suitableProducts, [details]);
  };
}

const productsService = new ProductsService();
export default productsService;
