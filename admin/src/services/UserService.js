import CRUDService from "./CRUDService";

class UserService extends CRUDService {
  constructor() {
    super("CustomUsers");
  }
}

export default new UserService();