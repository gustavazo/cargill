import React, {Component, useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BleManager} from 'react-native-ble-plx';
import RNBluetoothClassic, {
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import Home from '../app/screens/home';
import QuizzScreen from '../app/screens/quizz';
import ComponentLoading from './components/ComponentLoading';
import AreaService from './service/Area';
import axios from 'axios';
import confg from './config';

export const AppContext = React.createContext({});

export const manager = new BleManager();

class Scan extends Component {
  onSuccess = e => {
    console.log('ACA', e);
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

  showAlert = () =>
    Alert.alert(
      'Validación del día',
      'La validación de hoy ya ha sido realizada. Desea arrancar el vehículo?',
      [
        {
          text: 'Sí',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'No',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

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
      console.log('HOLA');

      const paired = await RNBluetoothClassic.getBondedDevices();
      const device = paired.find(
        p => p.address === btmodule.data[0].macAddress,
      );
      console.log('DEVICE', device);
      const connection = await device.connect();
      this.context.setDevice(device);
      const a = await device.write('a');
      this.props.navigation.navigate('Quizz', {quizz: quizz.data[0]});
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  async componentDidMount() {
    this.showAlert();
    // this.isAvailalble();
    const quizzes = await axios.get(
      confg.backendUrl + 'userQuizzes',
      // params: {
      //   filter: {
      //     where: {
      //       customUserId: 1,
      //       limit: 3
      //       // date: {
      //       //   between: [
      //       //     "2022-02-01T00:00:09.643Z",
      //       //     "2022-02-01T23:59:09.643Z"
      //       //   ]
      //       // }
      //     }
      //   }
      // }
    );
    console.log('ACA', quizzes.data);

    for (const q in quizzes.data) {
      if (q.valid) {
      }
    }
  }

  render() {
    console.log('props', this.props);

    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan</Text>
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Scan />
    </View>
  );
}

function DetailsScreen(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Scan {...props} />
    </View>
  );
}

Scan.contextType = AppContext;

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState(null);

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
      console.log('STATE', state);
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
      }}>
      {!loading ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Quizz" component={QuizzScreen} />
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
