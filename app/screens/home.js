import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from '../components/Modal1';
import { Avatar, Card, IconButton } from 'react-native-paper';


export default function Home(props) {
  const navigation = useNavigation();

    console.log(props);
    function handlePress() {
        navigation.navigate('Details')
    };

  return (
    <View style={{ padding: 10 }}>
      <View style={{alignItems:'center'}}><Text style={{fontSize: 25}}>Hola, [USUARIO]</Text></View>
      <View style={{flexDirection: 'column', justifyContent:'space-around', height: '100%'}}>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={{ height: 150, width: 200, marginBottom: -150, marginTop: -25, backgroundColor: '#42a5f5', justifyContent: 'center', alignItems: 'center', borderRadius: 10}} onPress={handlePress}>
              <Text style={{color: 'white', fontWeight: '450', textAlign: 'center', fontSize: 25}}>ESCANEAR QR</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 30}}>Ultimos escaneos:</Text>
          <Card.Title
            title="NOMBRE QUIZ"
            subtitle="FECHA REALIZACION"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          <Card.Title
            title="NOMBRE QUIZ"
            subtitle="FECHA REALIZACION"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          <Card.Title
            title="NOMBRE QUIZ"
            subtitle="FECHA REALIZACION"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          <Card.Title
            title="NOMBRE QUIZ"
            subtitle="FECHA REALIZACION"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          <Card.Title
            title="NOMBRE QUIZ"
            subtitle="FECHA REALIZACION"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          </View>
      </View>
      {/* <Modal alertMessage={'messi'} buttonText={'messi10'} callback={function conso() {console.log('ANDA')}}>
          <Text>ASSDASDASDA</Text>
      </Modal> */}
    </View>
  );
};