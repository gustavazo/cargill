import CRUDService from "./CRUDService";

class QuestionService extends CRUDService {
  constructor() {
    super("Questions");
  }

  async getAnswers(id) {
    return this.api.get(`/${id}/answers`)
  }

  async deleteAnswer(id) {
    return this.api.delete(`/${id}`)
  }
}

export default new QuestionService();