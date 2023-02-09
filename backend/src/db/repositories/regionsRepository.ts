import { regions } from "../schema/regions";
import { BaseRepository } from "./baseRepository";

class RegionsRepository extends BaseRepository {}

const regionsRepository = new RegionsRepository(regions);
export default regionsRepository;
