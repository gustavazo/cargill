import CRUDService from "./CRUDService";

class AnswerService extends CRUDService {
  constructor() {
    super("Answers");
  }
}

export default new AnswerService();