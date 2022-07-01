import CRUDService from "./CRUDService";

class UserService extends CRUDService {
  constructor() {
    super("CustomUsers");
  }
  async login(credentials) {
    return await this.api.post("/login", credentials);
}
}

export default new UserService();