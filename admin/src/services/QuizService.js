import CRUDService from "./CRUDService";

class QuizService extends CRUDService {
  constructor() {
    super("Quizzes");
  }

  async getQuestions(id) {
    return this.api.get(`/${id}/questions`)
  }
}

export default new QuizService();