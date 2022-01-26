import React, { Component, useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid
} from 'react-native';

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
import AreaService from "./service/Area";
import axios from 'axios';
import confg from "./config";

export const AppContext = React.createContext({});

export const manager = new BleManager();
class Scan extends Component {
  onSuccess = e => {
    console.log('ACA', e);
    this.isAvailalble(e.data)
  };

  isAvailalble = async (mac) => {
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

  startDiscovery = async (mac) => {
    try {
      const area = await axios.get(confg.backendUrl + "areas", {
        params: {
          filter: {
            where: {
              tagCode: mac
            },
            include: ["quizzes"]
          }
        }
      });
      const btmodule = await axios.get(confg.backendUrl + "btmodules", {
        params: {
          filter: {
            where: {
              areaId: area.data[0].id
            }
          }
        }
      });
      const quizz = await axios.get(confg.backendUrl + "quizzes", {
        params: {
          filter: {
            where: {
              areaId: area.data[0].id
            }
          }
        }
      });
      const paired = await RNBluetoothClassic.getBondedDevices();
      const device = paired.find(p => p.address === btmodule.data[0].macAddress);
      console.log("DEVICE", device);
      const connection = await device.connect();
      const a = await device.write("a");
    } catch (err) {
      console.log("ERROR", err)
    }
  };

  componentDidMount() {
    // this.isAvailalble();
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan</Text>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
          </TouchableOpacity>
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

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Scan />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);

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
    manager.onStateChange((state) => {
      console.log("STATE", state);
      if (state === 'PoweredOn') {
        scanAndConnect()
      }
    }, true);

  }, []);

  return (
    <AppContext.Provider value={{
      loading,
      setLoading
    }}>
      {!loading ?
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Quizz">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Quizz" component={QuizzScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        :
        <ComponentLoading />
      }
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
