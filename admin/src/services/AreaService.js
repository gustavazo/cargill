import CRUDService from "./CRUDService";

class AreaService extends CRUDService {
  constructor() {
    super("Areas");
  }
}

export default new AreaService();