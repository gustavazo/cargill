import CRUDService from "./CRUDService";

class UserQuizService extends CRUDService {
  constructor() {
    super("UserQuizzes");
  }
}

export default new UserQuizService();