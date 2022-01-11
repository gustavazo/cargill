import CRUDService from "./CRUDService";

class AnswerService extends CRUDService {
  constructor() {
    super("Answers");
  }

  async deleteAnswer(id) {
    return this.api.delete(`/${id}`)
  }

  async editAnswer(id,ans) {
    return this.api.patch(`/${id}`, ans)
  }
}

export default new AnswerService();