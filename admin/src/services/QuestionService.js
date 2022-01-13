import CRUDService from "./CRUDService";

class QuestionService extends CRUDService {
  constructor() {
    super("Questions");
  }

  async getAnswers(id) {
    return this.api.get(`/${id}/answers`)
  }

  async deleteQuestion(id) {
    return this.api.delete(`/${id}`)
  }

  async editQuestion(id,que) {
    return this.api.patch(`/${id}`, que)
  }
}

export default new QuestionService();