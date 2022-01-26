import React, { useState, useEffect } from 'react';
import {View, ScrollView, Text} from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from '../components/Modal1';
import { Switch } from 'react-native-paper';

const quizz = {
    "title": "Control de Autoelevadores",
    "description": "Control general",
    "id": 4,
    "questions": [
      {
        "statement": "Chasis",
        "id": 9,
        "quizId": 4,
        "answers": [
          {
            "value": true,
            "label": "Estados de los neumáticos",
            "id": 10,
            "questionId": 9
          },
          {
            "value": true,
            "label": "Articulaciones de la dirección (pivotes y rótulas)",
            "id": 12,
            "questionId": 9
          },
          {
            "value": true,
            "label": "Traslación frenado ( verificar \"frenado brusco\")",
            "id": 13,
            "questionId": 9
          },
          {
            "value": true,
            "label": "Luces",
            "id": 14,
            "questionId": 9
          },
          {
            "value": true,
            "label": "Limpieza general",
            "id": 15,
            "questionId": 9
          }
        ]
      },
      {
        "statement": "Motor",
        "id": 10,
        "quizId": 4,
        "answers": [
          {
            "value": true,
            "label": "Inspección visual general",
            "id": 11,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Verificar que no existen fugas de fluidos",
            "id": 16,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Verificar el estado de correas",
            "id": 17,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Control de nivel liquido de enfriamiento",
            "id": 18,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Control de nivel de aceite motor",
            "id": 19,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Control de nivel aceite hidraulico",
            "id": 20,
            "questionId": 10
          },
          {
            "value": true,
            "label": "Control nivel de bateria",
            "id": 21,
            "questionId": 10
          }
        ]
      },
      {
        "statement": "Brazo de carga",
        "id": 11,
        "quizId": 4,
        "answers": [
          {
            "value": true,
            "label": "Inspeccionar visualmente el estado de los diferentes elementos y articulaciones",
            "id": 22,
            "questionId": 11
          },
          {
            "value": true,
            "label": "Controlar el estado superficial de los flexibles hidráulicos (desgastes, roce y etc)",
            "id": 23,
            "questionId": 11
          },
          {
            "value": true,
            "label": "Controlar el estado superficial de cadenas de columna",
            "id": 24,
            "questionId": 11
          },
          {
            "value": true,
            "label": "Verificar fugas (aceites, aire, etc)",
            "id": 25,
            "questionId": 11
          }
        ]
      },
      {
        "statement": "Dispositivos de Seguridad",
        "id": 12,
        "quizId": 4,
        "answers": [
          {
            "value": true,
            "label": "Cinturon de seguridad",
            "id": 26,
            "questionId": 12
          },
          {
            "value": true,
            "label": "Bocina",
            "id": 27,
            "questionId": 12
          },
          {
            "value": true,
            "label": "Alarma sonora de retroceso",
            "id": 28,
            "questionId": 12
          },
          {
            "value": true,
            "label": "Extintor (equipos que poseen motores de combustión interna)",
            "id": 29,
            "questionId": 12
          },
          {
            "value": true,
            "label": "Test",
            "id": 30,
            "questionId": 12
          }
        ]
      }
    ]
  }

function Home(props) {
  const navigation = useNavigation();
  const [quizzState, setQuizzState] = useState(null);

  const onToggleSwitch = (q) => () => {
    const prevValue = quizzState[q.id];
    setQuizzState({
        ...quizzState,
        [q.id]: !prevValue
    });
  }

  useEffect(() => {
    const _quizzState = {};

    quizz.questions.forEach(q => {
        q.answers.forEach(a => {
            _quizzState[a.id] = false;
        })
    });

    setQuizzState(_quizzState);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      {/* <Button style={{ padding: 15, height: 15 }} title="ESCANEAR" onPress={handlePress} /> */}
      {/* <Modal alertMessage={'messi'} buttonText={'messi10'} callback={function conso() {console.log('ANDA')}}>
          <Text>ASSDASDASDA</Text>
      </Modal> */}
      {
        quizzState && quizz.questions.map(q => {
            return (
                <>
                    <View>
                        <View><Text style={{fontSize: 20}}>{q.statement}</Text></View>
                        {q.answers.map(a => {
                            return (
                                <View style={{ flexDirection: 'row'}}>
                                    <View style={{width: "80%",}}><Text>{a.label}</Text></View>
                                    <View style={{width: "20%"}}>
                                        <Switch value={quizzState[a.id]} onValueChange={onToggleSwitch(a)} />
                                    </View>
                                </View>
                            )
                        })}    
                    </View>
                
                </>
            )
        })
      }
    </View>
  );
};

export default Home;