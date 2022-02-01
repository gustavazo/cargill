import React, {useState, useEffect} from 'react';
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

const _quizz = {
  title: 'Control de Autoelevadores',
  description: 'Control general',
  id: 4,
  questions: [
    {
      statement: 'Chasis',
      id: 9,
      quizId: 4,
      answers: [
        {
          value: true,
          label: 'Estados de los neumáticos',
          id: 10,
          questionId: 9,
        },
        {
          value: true,
          label: 'Articulaciones de la dirección (pivotes y rótulas)',
          id: 12,
          questionId: 9,
        },
        {
          value: true,
          label: 'Traslación frenado ( verificar "frenado brusco")',
          id: 13,
          questionId: 9,
        },
        {
          value: true,
          label: 'Luces',
          id: 14,
          questionId: 9,
        },
        {
          value: true,
          label: 'Limpieza general',
          id: 15,
          questionId: 9,
        },
      ],
    },
    {
      statement: 'Motor',
      id: 10,
      quizId: 4,
      answers: [
        {
          value: true,
          label: 'Inspección visual general',
          id: 11,
          questionId: 10,
        },
        {
          value: true,
          label: 'Verificar que no existen fugas de fluidos',
          id: 16,
          questionId: 10,
        },
        {
          value: true,
          label: 'Verificar el estado de correas',
          id: 17,
          questionId: 10,
        },
        {
          value: true,
          label: 'Control de nivel liquido de enfriamiento',
          id: 18,
          questionId: 10,
        },
        {
          value: true,
          label: 'Control de nivel de aceite motor',
          id: 19,
          questionId: 10,
        },
        {
          value: true,
          label: 'Control de nivel aceite hidraulico',
          id: 20,
          questionId: 10,
        },
        {
          value: true,
          label: 'Control nivel de bateria',
          id: 21,
          questionId: 10,
        },
      ],
    },
    {
      statement: 'Brazo de carga',
      id: 11,
      quizId: 4,
      answers: [
        {
          value: true,
          label:
            'Inspeccionar visualmente el estado de los diferentes elementos y articulaciones',
          id: 22,
          questionId: 11,
        },
        {
          value: true,
          label:
            'Controlar el estado superficial de los flexibles hidráulicos (desgastes, roce y etc)',
          id: 23,
          questionId: 11,
        },
        {
          value: true,
          label: 'Controlar el estado superficial de cadenas de columna',
          id: 24,
          questionId: 11,
        },
        {
          value: true,
          label: 'Verificar fugas (aceites, aire, etc)',
          id: 25,
          questionId: 11,
        },
      ],
    },
    {
      statement: 'Dispositivos de Seguridad',
      id: 12,
      quizId: 4,
      answers: [
        {
          value: true,
          label: 'Cinturon de seguridad',
          id: 26,
          questionId: 12,
        },
        {
          value: true,
          label: 'Bocina',
          id: 27,
          questionId: 12,
        },
        {
          value: true,
          label: 'Alarma sonora de retroceso',
          id: 28,
          questionId: 12,
        },
        {
          value: true,
          label: 'Extintor (equipos que poseen motores de combustión interna)',
          id: 29,
          questionId: 12,
        },
        {
          value: true,
          label: 'Test',
          id: 30,
          questionId: 12,
        },
      ],
    },
  ],
};

function Home(props) {
  const navigation = useNavigation();
  const [quizzState, setQuizzState] = useState(null);
  const [observation, setObservation] = useState('');
  const [quizz, setQuizz] = useState(_quizz);

  const onToggleSwitch = q => () => {
    console.log("Q", quizzState);
    const prevValue = quizzState[q.id];
    setQuizzState({
      ...quizzState,
      [q.id]: !prevValue
    });
  };

  const createQuizz = async () => {
    const q = {
      observations: observation,
      customerUserId: 1,
      valid: true,
      quizId: quizz.id,
    };

    const created = await axios.post(confg.backendUrl + 'userQuizzes', q);

    for (const answerId of quizzState) {
      const userAnser = {
        userQuizId: created.data.id,
        answerId: answerId,
      };

      const ansCreated = await axios.post(
        confg.backendUrl + 'userAnswers',
        userAnswer,
      );
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
        <Text style={{fontSize: 25, padding: 5, margin: 5}}>{quizz.title}</Text>
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
            label="Email"
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
