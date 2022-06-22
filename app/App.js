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

export const AppContext = React.createContext({});

export const manager = new BleManager();

class Scan extends Component {
  onSuccess = e => {
    this.isAvailalble(e.data);
  };

  isAvailalble = async mac => {
    try {
      const available = await RNBluetoothClassic.isBluetoothAvailable();
      this.requestAccessFineLocationPermission();
      this.startDiscovery(mac);
    } catch (err) {
      // Handle accordingly
      console.log('ERR', err);
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

  showAlert = (device, alertOptions = [], quizz) => {
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
          this.props.navigation.navigate('Quizz', { quizz: quizz.data[0] });
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

    try {
      const area = await axios.get(confg.backendUrl + 'areas', {
        params: {
          filter: {
            where: {
              tagCode: mac,
            },
            include: ['quizzes'],
          },
        },
      });
      const btmodule = await axios.get(confg.backendUrl + 'btmodules', {
        params: {
          filter: {
            where: {
              areaId: area.data[0].id,
            },
          },
        },
      });
      const quizz = await axios.get(confg.backendUrl + 'quizzes', {
        params: {
          filter: {
            where: {
              areaId: area.data[0].id,
            },
          },
        },
      });

      const paired = await RNBluetoothClassic.getBondedDevices();
      const device = paired.find(
        p => p.address === btmodule.data[0].macAddress,
      );
      const connection = await device.connect();
      this.context.setDevice(device);
      this.sabela(device, quizz, area.data[0]);
    } catch (err) {
      console.log('ERROR', err);
    }
  };



  sabela = async (device, quizz, area) => {
    const id = await AsyncStorage.getItem("id");
    const quizzes = await axios.get(
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
    console.log("Quizzes", quizzes);



    //Verificar si en el dia ya se hizo la encuesta del area escaneada
    //Si es asi => Verificar si es validad  => si es valida: preguntar si se quiere volver a hacer o arrancar vehiculo 
    //                                      => No es valida : Preguntar si se quiere volver a hacer aclarando que la ultima hecha no fue valida.
    //Caso contrario => Permitir hacer la encuesta directaemente.

    const currentAreaLastQuiz = quizzes.data.filter((q) => q.quiz.areaId === area.id).pop();
    console.log('currentAreaLastQuiz', currentAreaLastQuiz)
    if (currentAreaLastQuiz) {
      //Hay una encuesta hecha en el dia del area
      if (currentAreaLastQuiz.valid) {
        //preguntar si se quiere volver a hacer o arrancar vehiculo 
        this.showAlert(device, ['run', 'reMakeQuizz'], quizz);
        
      }
      else {
        //Preguntar si se quiere volver a hacer
        this.showAlert(device, ['reMakeQuizz'], quizz);

      }
    } else {
      //redirigir a encuesta
      device.write("a");
      this.props.navigation.navigate('Quizz', { quizz: quizz.data[0] });
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
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}></TouchableOpacity>
        }
      />
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
