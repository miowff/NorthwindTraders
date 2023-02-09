import { suppliers } from "../schema/suppliers";
import { BaseRepository } from "./baseRepository";

class SuppliersRepository extends BaseRepository {}

const suppliersRepository = new SuppliersRepository(suppliers);
export default suppliersRepository;
