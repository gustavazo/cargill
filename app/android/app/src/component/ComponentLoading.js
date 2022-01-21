import React from "react";
import { ActivityIndicator, View, Image } from "react-native";
import { Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

const ComponentLoading = () => (
   <View>
      <View style={{
         position: 'absolute',
         zIndex: 100,
         left: 0,
         top: 0,
         backgroundColor: 'rgba(0,0,0,0.6)',
         width: width,
         height: height,
         alignItems: "center",
         justifyContent: "center"
      }}>
         <ActivityIndicator color="orange" style={{ marginTop: 10 }} />
      </View>
   </View>
);

export default ComponentLoading;