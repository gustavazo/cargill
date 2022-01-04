import CRUDService from "./CRUDService";

class QuestionService extends CRUDService {
  constructor() {
    super("Questions");
  }

  async getAnswers(id) {
    return this.api.get(`/${id}/answers`)
  }
}

export default new QuestionService();