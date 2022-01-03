import CRUDService from "./CRUDService";

class UserAnswerService extends CRUDService {
  constructor() {
    super("UserAnswers");
  }
}

export default new UserAnswerService();