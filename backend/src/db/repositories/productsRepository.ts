import { products } from "../schema/products";
import { BaseRepository } from "./baseRepository";

class ProductsRepository extends BaseRepository{}

const productsRepository = new ProductsRepository(products);
export default productsRepository;