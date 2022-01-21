import React from 'react';
import { View, Text } from "react-native";
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Home(props) {
    const navigation = useNavigation();

    console.log(props);
    function handlePress() {
        navigation.navigate('Details')
    };

    return <View>
                <Text>Manu Native</Text>
                
                <Button title="Sabe" onPress={handlePress} />
            </View>
};


// 