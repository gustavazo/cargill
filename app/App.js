import React, { Component, useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BleManager } from 'react-native-ble-plx';
import RNBluetoothClassic, {
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import Home from '../app/screens/home';
import QuizzScreen from '../app/screens/quizz';
import ComponentLoading from './components/ComponentLoading';
import AreaService from './service/Area';
import axios from 'axios';
import confg from './config';
import moment from "moment"
import Login from './screens/Login';
import { AsyncStorage } from 'react-native';
import RNBeep from 'react-native-a-beep';
import { ActivityIndicator } from 'react-native-paper';

export const AppContext = React.createContext({});

export const manager = new BleManager();

class Scan extends Component {
  state = {
    isLoading: false
  }
  onSuccess = e => {
    RNBeep.beep();
    this.isAvailalble(e.data);

  };

  isAvailalble = async mac => {
    let msg = ""
    try {
      errorMsg = "BT no disponible"
      const available = await RNBluetoothClassic.isBluetoothAvailable();
      this.requestAccessFineLocationPermission();
      this.startDiscovery(mac);
    } catch (err) {
      // Handle accordingly
      console.log('ERR', err);
      Toast.show('Ha surgido un error:' + errorMsg);
    }
  };

  async requestAccessFineLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access.',
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  showAlert = (device, alertOptions = [], quizz, area) => {
    const options = {
      run: {
        text: 'Arrancar Vehículo',
        onPress: () => {
          //arrancar
          device.write("b")
          AsyncStorage.removeItem("currentUser")
          this.props.navigation.navigate('Login');

          Toast.show("Vehículo habilitado");

        },
        style: 'cancel',
      },
      reMakeQuizz: {
        text: 'Rehacer Encuesta',
        onPress: () => {
          //
          device.write("a");
          this.props.navigation.navigate('Quizz', { quizz: quizz, areaId: area.id });
        },
        style: 'cancel',
      },
    }

    return Alert.alert(
      'Validación del día',
      'La validación de hoy ya ha sido realizada. ¿Que desea hacer?',
      alertOptions.map((option) => options[option]),
      {
        cancelable: true
      },
    )
  }

  startDiscovery = async mac => {
    let errorMsg = "";
    console.log('mac', mac)
    try {
      this.setState({ isLoading: true })
      //Busca el area escaneada a partir del QR
      errorMsg = "Area no encontrada"
      const area = await axios.get(confg.backendUrl + 'areas', {
        params: {
          filter: {
            where: {
              tagCode: mac,
            },
            include: ['quiz'],
          },
        },
      });
      console.log("area", area);
      //Busca el BT en base al area escaneada
      errorMsg = "Modulo BT no encontrado"
      const btmodule = await axios.get(confg.backendUrl + 'btmodules', {
        params: {
          filter: {
            where: {
              areaId: area.data[0].id,
            },
          },
        },
      });
      errorMsg = "Modulo BT no encontrado en los dispositivos vinculados"
      //Obtiene todos los BTs vinculados al celular o tablet
      const paired = await RNBluetoothClassic.getBondedDevices();
      //Busca el BT del área escaneada dentro de los BT vinculados
      const device = paired.find(
        p => p.address === btmodule.data[0].macAddress,
      );
      if (!device) throw new Error('No device found')//Me permite capturar cuando no encuentra el dispositivo en los vinculados

      console.log('device', device)
      //Conecta el dispositivo
      errorMsg = "Error en la conexión con el disposivo"
      const connection = await device.connect();
      //Setea el estado device
      this.context.setDevice(device);
      //Acciones pertinentes al redireccionamiento a encuestas
      errorMsg = "Error en el redireccionamiento a encuestas"
      this.sabela(device, area.data[0]);
      this.setState({ isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
      Toast.show('Ha surgido un error: ' + errorMsg);
      console.log('ERROR', err);
      console.log('ERROR', 'Ha surgido un error: ' + errorMsg);
      this.props.navigation.navigate('Home')

    }
  };



  sabela = async (device, area) => {
    const quizz = area.quiz;
    const id = await AsyncStorage.getItem("id");
    const todayUserQuizzes = await axios.get(
      confg.backendUrl + 'userQuizzes', {
      params: {
        filter: {
          where: {
            customUserId: JSON.parse(id).userId,
            date: {
              between: [
                moment().startOf("day"),
                moment().endOf("day")
              ]
            }
          }
        }
      }
    }
    );
    console.log("Area", area);
    console.log("todayUserQuizzes", todayUserQuizzes);

    //Verificar si en el dia ya se hizo la encuesta del area escaneada
    //Si es asi => Verificar si es validad  => si es valida: preguntar si se quiere volver a hacer o arrancar vehiculo 
    //                                      => No es valida : Preguntar si se quiere volver a hacer aclarando que la ultima hecha no fue valida.
    //Caso contrario => Permitir hacer la encuesta directaemente.

    //Busca las encuestas del área dentro de las encuestas realizadas en el día del usuario
    const currentAreaLastQuiz = todayUserQuizzes.data.filter((q) => q.areaId === area.id).pop();
    console.log('currentAreaLastQuiz', currentAreaLastQuiz);
    if (currentAreaLastQuiz) {
      //Hay una encuesta hecha del area en el dia 
      if (currentAreaLastQuiz.valid) {
        //preguntar si se quiere volver a hacer o arrancar vehiculo 
        this.showAlert(device, ['run', 'reMakeQuizz'], quizz, area);
      }
      else {
        //Preguntar si se quiere volver a hacer
        this.showAlert(device, ['reMakeQuizz'], quizz, area);
      }
    } else {
      //Si no hay encuesta del área en el corriente día
      //redirigir a encuesta
      device.write("a");
      this.props.navigation.navigate('Quizz', { quizz: quizz, areaId: area.id });
    }



    // const last = quizzes.data[quizzes.data.length - 1];
    //   if (last) {
    //     if (last.valid) {
    //       this.showAlert(device); 
    //     } else {
    //       device.write("a");
    //       this.props.navigation.navigate('Quizz', { quizz: quizz.data[0] });
    //     }
    //   } else {
    //     this.props.navigation.navigate('Quizz', { quizz: quizz.data[0] });
    //     device.write("a");
    //   }
  }

  async componentDidMount() {
    // this.isAvailalble();

  }

  render() {

    return (
      <>
          <QRCodeScanner
            onRead={this.onSuccess}
            showMarker
            markerStyle={{ borderColor: 'grey', borderRadius: 10 }}
            topContent={
              <Text style={styles.centerText}>
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}></TouchableOpacity>
            }

          />
          {this.state.isLoading?<View><Text style={{color:"black",fontSize:20}}>Conectando...</Text><ActivityIndicator size={'large'} color="orange" style={{ marginTop: 10 }} /></View>:null}
        
      </>
    );
  }
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Scan />
    </View>
  );
}

function DetailsScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Scan {...props} />
    </View>
  );
}

Scan.contextType = AppContext;

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Proceed with connection.
      }
    });
  };

  React.useEffect(() => {
    manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        // scanAndConnect()
      }
    }, true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        device,
        setDevice,
        currentUser,
        setCurrentUser
      }}>
      {!loading ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" label="Inicio" options={{ title: "Inicio" }} component={Home} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Escaneo QR" }} />
            <Stack.Screen name="Quizz" component={QuizzScreen} options={{ title: "Evaluación" }} />
            <Stack.Screen name="Login" component={Login} options={{ title: "Ingreso de usuario" }} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <ComponentLoading />
      )}
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
