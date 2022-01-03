import CRUDService from "./CRUDService";

class QuizService extends CRUDService {
  constructor() {
    super("Quizzes");
  }
}

export default new QuizService();