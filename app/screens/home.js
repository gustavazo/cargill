import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from '../components/Modal1';
import { Avatar, Card, IconButton } from 'react-native-paper';
import axios from 'axios';
import confg from '../config';
import moment from "moment";
import { AppContext } from '../App';
import { useContext } from 'react';
import { AsyncStorage } from 'react-native';



export default function Home(props) {
  const navigation = useNavigation();
  const [asd, setAsd] = useState([]);
  const context = useContext(AppContext)

  console.log(props);

  function handlePress() {
    navigation.navigate('Details');
  };

  const handleLogOut = () => {
    // el current user pasa a ser null
    context.setCurrentUser(null);

    // borro el id del asyncStorage
    AsyncStorage.removeItem('id');

    props.navigation.navigate('Login')
  };


  useEffect(() => {
    async function getSabe() {
      console.log('HOLA');
      const quizzes = await axios.get(
        confg.backendUrl + 'userQuizzes', {
        params: {
          filter: {
            limit: 3,
            order: "date DESC",
            where: {
              // date: {
              //   between: [
              //     "2022-02-01T00:00:09.643Z",
              //     "2022-02-01T23:59:09.643Z"
              //   ]
              // }
            }
          }
        }
      });
      console.log()
      setAsd(quizzes.data);
    }

    getSabe();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, color: "black", opacity: 0.8 }}>Hola, {context.currentUser.firstName + " " + context.currentUser.lastName}</Text>
      </View>
      <View>
        <Button onPress={handleLogOut} title='SALIR'>
          SALIR
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
        }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              height: 150,
              width: 200,
              marginBottom: -150,
              marginTop: -25,
              backgroundColor: '#42a5f5',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={handlePress}>
            <Text
              style={{
                color: 'white',
                fontWeight: '450',
                textAlign: 'center',
                fontSize: 25,
              }}>
              ESCANEAR QR
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: "black", opacity: 0.8}}>Ultimos escaneos:</Text>
          {asd
            .map(a => {
              return (
                <Card.Title title={a.quiz?.title} subtitle={moment(a.date).format('MMMM Do YYYY, h:mm:ss a')} />
              );
            })}
        </View>
      </View>
      {/* <Modal alertMessage={'messi'} buttonText={'messi10'} callback={function conso() {console.log('ANDA')}}>
          <Text>ASSDASDASDA</Text>
      </Modal> */}
    </View>
  );
}
