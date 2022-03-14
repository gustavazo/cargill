import axios from "axios";
import CRUDService from "./CRUDService";
import { AsyncStorage } from 'react-native';

class UserService extends CRUDService {
  constructor() {
    super("CustomUsers");
  }

  async login(credentials) {

    // const context = useContext(AppContext);
    const token = await this.api.post("/login", credentials);
    console.log('TOKEN.DATA', token.data)

    await AsyncStorage.setItem(
      'id', token.data.id
    );

    // traer el usuario con el userId
    const user = await this.findById(token.data.userId);

    return user.data;
    
  }
};

export default new UserService();