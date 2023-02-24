import productsRepository from "src/db/repositories/productsRepository";
import { ServicesError } from "src/errors/servicesError";
import { ProductModel } from "src/models/product-models/product";
import { ResponseDto } from "src/models/response/responce";

class ProductsService {
  getAll = async (): Promise<ResponseDto<ProductModel[]>> => {
    const query = await productsRepository.getAll();
    const { details, data: allProducs } = query;
    return new ResponseDto(allProducs, [details]);
  };
  getById = async (id: number): Promise<ResponseDto<ProductModel>> => {
    const response = await productsRepository.getById(id);
    const { details, data: product } = response;
    if (!product) {
      throw ServicesError.ProductNotFound(id);
    }
    return new ResponseDto(product, [details]);
  };
  search = async (
    searchString: string
  ): Promise<ResponseDto<ProductModel[]>> => {
    const response = await productsRepository.find(searchString);
    const { details, data: suitableProducts } = response;
    return new ResponseDto(suitableProducts, [details]);
  };
}

const productsService = new ProductsService();
export default productsService;
