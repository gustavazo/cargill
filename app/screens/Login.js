import * as React from 'react';
import { TextInput } from 'react-native-paper';
import UserService from '../service/UserService';
import config from '../config';


const Login = () => {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUser = (evt) => {
        setUser(evt.target.value)
    };

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    };

    const handleLogin = async () => {
        const token = UserService.create()
    };

    return (
        <View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Outlined input"
                    placeholder="Type something"
                    right={<TextInput.Affix text="/100" />}
                    onChange={handleUser}
                />
            </View>
            <View>
                <TextInput
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                    onChange={handlePassword}
                />
            </View>
            <View>
                <Button icon="camera" mode="contained" onPress={handleLogin}>
                    Ingresar
                </Button>
            </View>
        </View>
    )
};

export default Login;



// const login = () => {
//     handleRequest(AuthService.login(user.email.toLowerCase(), user.password.toLowerCase()), (res) => {
//        if (!res.data || res.status !== 200) {
//           Toast.show("Credenciales incorrectas, intente nuevamente");
//        }
//        console.log(res.data)
//        setCurrentUser(res.data);
//     });
//  };