import React, {useState, useEffect, useContext } from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from '../components/Modal1';
import {Switch} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import UserQuizz from '../service/UserQuizService';
import UserQuizService from '../service/UserQuizService';
import AnswerService from '../service/UserAnswerService';
import confg from '../config';
import Toast from 'react-native-simple-toast';
import axios from "axios";
import { AppContext } from '../App';
import moment from "moment";



function Home(props) {
  const navigation = useNavigation();
  const [quizzState, setQuizzState] = useState(null);
  const [observation, setObservation] = useState('');
  const [quizz, setQuizz] = useState(props.route.params.quizz);
  const context = useContext(AppContext);

  const onToggleSwitch = q => () => {
    console.log("Q", quizzState);
    const prevValue = quizzState[q.id];
    setQuizzState({
      ...quizzState,
      [q.id]: !prevValue
    });
  };

  const createQuizz = async () => {
    console.log(quizzState);
    context.setLoading(true);
    let valid = true;

    for (const answerId in quizzState) {
      if (!quizzState[answerId]) {
        valid = false;
        break;
      }
    }

    const q = {
      observations: observation,
      customUserId: 1,
      valid,
      quizId: quizz.id,
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
      context.device.write("b")
    }
    Toast.show("Test creado");
    navigation.navigate('Home');
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
    <View style={{padding: 10, flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, padding: 5, margin: 5}}>{quizz?.title}</Text>
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
                        <View style={{width: '80%'}}>
                          <Text style={{color: 'black', fontSize: 20}}>
                            {a.label}
                          </Text>
                        </View>
                        <View style={{width: '20%'}}>
                          <Switch
                            value={quizzState[a.id]}
                            onValueChange={onToggleSwitch(a)}
                            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
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
            style={{height: 200}}
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
