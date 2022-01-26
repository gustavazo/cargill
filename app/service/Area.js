import CRUDService from "./CRUDService";

class UserAnswerService extends CRUDService {
  constructor() {
    super("Areas");
  }
}

export default new UserAnswerService();