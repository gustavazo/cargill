import CRUDService from "./CRUDService";

class UserService extends CRUDService {
  constructor() {
    super("UserCustom");
  }
}

export default new UserService();