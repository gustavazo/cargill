import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Home(props) {
  const navigation = useNavigation();

    console.log(props);
    function handlePress() {
        navigation.navigate('Details')
    };

  return (
    <View style={{ padding: 10 }}>
      <Button style={{ padding: 15, height: 15 }} title="ESCANEAR" onPress={handlePress} />
    </View>
  );
}

// navegar a details
//
