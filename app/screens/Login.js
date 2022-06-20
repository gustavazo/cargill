import * as React from 'react';
import { TextInput } from 'react-native-paper';
import UserService from '../service/UserService';
import config from '../config';
import {View} from 'react-native';
import {Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from '../App';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

// despues de guardar en el asyncStorage el id
// creo el stado d currentUser
// cuando se monte la app, cheaquear si hay usuario loguiado


const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const context = useContext(AppContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setEmail("")
            setPassword("")
        }
    }, [isFocused])

    const handleLogin = async () => {
        const user = await UserService.login({
            username: email.toLocaleLowerCase(),
            password: password.toLocaleLowerCase()
        });
        context.setCurrentUser(user)
        props.navigation.navigate('Home')
    }

    return (
        <View style={{display: 'flex', padding: 30, justifyContent: 'center', alignContent: 'center', marginTop: 150}}>
            <View>
                <TextInput
                    mode="outlined"
                    label="Legajo"
                    placeholder="Ingresar legajo"
                    right={<TextInput.Affix text="/100" />}
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={{marginTop: 20}}>
                <TextInput
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <View style={{marginTop: 20}}>
                <Button title='Ingresar' mode="contained" onPress={handleLogin}>
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



// {
//     "type": "string",
//     "firstName": "string",
//     "lastName": "string",
//     "gender": "string",
//     "legajo": "string",
//     "realm": "string",
//     "username": "messi",
//     "email": "messi@gmail.com",
//     "password": "messi123"
//     "emailVerified": true