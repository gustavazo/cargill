import CRUDService from "./CRUDService";

class QuestionService extends CRUDService {
  constructor() {
    super("Questions");
  }
}

export default new QuestionService();