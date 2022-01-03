import CRUDService from "./CRUDService";

class BTModuleService extends CRUDService {
  constructor() {
    super("BTModules");
  }
}

export default new BTModuleService();