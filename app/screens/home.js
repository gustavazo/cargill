import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from '../components/Modal1';


export default function Home(props) {
  const navigation = useNavigation();

    console.log(props);
    function handlePress() {
        navigation.navigate('Details')
    };

  return (
    <View style={{ padding: 10 }}>
      <Button style={{ padding: 15, height: 15 }} title="ESCANEAR" onPress={handlePress} />
      <Modal alertMessage={'messi'} buttonText={'messi10'} callback={function conso() {console.log('ANDA')}}>
          <Text>ASSDASDASDA</Text>
      </Modal>
    </View>
  );
};