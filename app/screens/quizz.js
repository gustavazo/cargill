import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from '../components/Modal1';
import { Switch } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import UserQuizz from '../service/UserQuizService';
import UserQuizService from '../service/UserQuizService';
import AnswerService from '../service/UserAnswerService';
import confg from '../config';
import Toast from 'react-native-simple-toast';
import axios from "axios";
import { AppContext } from '../App';
import moment from "moment";
import {
  Alert,
} from 'react-native';

import { AsyncStorage } from 'react-native';


function Home(props) {
  const navigation = useNavigation();
  const [quizzState, setQuizzState] = useState(null);
  const [observation, setObservation] = useState('');
  const [quizz, setQuizz] = useState(props.route.params.quizz);
  const context = useContext(AppContext);
  const areaId = props.route.params.areaId;

  const onToggleSwitch = q => () => {
    const prevValue = quizzState[q.id];
    setQuizzState({
      ...quizzState,
      [q.id]: !prevValue
    });
  };

  const getAnswer = (answerId) => {
    for (const q of quizz.questions) {
      for (const a of q.answers) {
        console.log(q, answerId)
        if (a.id == answerId) return a;
      }
    }
  }

  const createQuizz = async () => {
    console.log(quizzState);
    context.setLoading(true);
    let valid = true;

    for (const answerId in quizzState) {
      if (!quizzState[answerId] && getAnswer(answerId).excluding) {
        valid = false;
        break;
      }
    }

    const id = await AsyncStorage.getItem("id");

    const q = {
      observations: observation,
      customUserId: JSON.parse(id).userId,
      valid,
      quizId: quizz.id,
      areaId: areaId,
      date: moment(new Date()).subtract(3, "hours")
    };

    const created = await axios.post(confg.backendUrl + 'userQuizzes', q);

    for (const answerId in quizzState) {
      console.log("ans", quizzState[answerId]);
      const userAnswer = {
        userQuizId: created.data.id,
        answerId: answerId,
        value: quizzState[answerId]
      };

      const ansCreated = await axios.post(
        confg.backendUrl + 'userAnswers',
        userAnswer,
      );
    }

    context.setLoading(false);

    if (valid) {
      Alert.alert(
        'Validación realizada',
        'Desea arrancar el vehículo?',
        [
          {
            text: 'Sí',
            onPress: () => {
              context.device.write("b")
              Toast.show("Vehículo habilitado");
              navigation.navigate('Login');
            },
            style: 'cancel',
          },
          {
            text: 'No',
            onPress: () => {
              navigation.navigate('Login');
            },
            style: 'cancel',
          },
        ],
        {
          cancelable: true
        },
      );
    } else {
      Alert.alert(
        'La validación no fue satisfactoria',
        'No se puede habilitar el vehículo'
      );
      navigation.navigate('Home');
    }

  };

  useEffect(() => {
    const _quizzState = {};

    quizz.questions.forEach(q => {
      q.answers.forEach(a => {
        _quizzState[a.id] = false;
      });
    });

    setQuizzState(_quizzState);
  }, []);

  return (
    <View style={{ padding: 30, flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, padding: 5, margin: 5 }}>{quizz?.title}</Text>
      </View>
      <ScrollView>
        {/* <Button style={{ padding: 15, height: 15 }} title="ESCANEAR" onPress={handlePress} /> */}
        {/* <Modal alertMessage={'messi'} buttonText={'messi10'} callback={function conso() {console.log('ANDA')}}>
          <Text>ASSDASDASDA</Text>
      </Modal> */}
        {quizzState &&
          quizz.questions.map(q => {
            return (
              <>
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        backgroundColor: 'black',
                        color: 'white',
                        padding: 5,
                      }}>
                      {q.statement}
                    </Text>
                  </View>
                  {q.answers.map(a => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 5,
                          borderBottomWidth: 1,
                          padding: 5,
                        }}>
                        <View style={{ width: '95%' }}>
                          <Text style={{ color: 'black', fontSize: 20 }}>
                            {a.label}
                          </Text>
                        </View>
                        <View style={{ width: '5%', background: "red" }}>
                          <Switch
                            value={quizzState[a.id]}
                            onValueChange={onToggleSwitch(a)}
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            );
          })}
        <View>
          <TextInput
            label="Observaciones"
            multiline
            style={{ height: 200 }}
            value={observation}
            onChangeText={text => setObservation(text)}
          />
          <Button onPress={createQuizz} title="Enviar"></Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
