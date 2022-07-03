import React, { createContext, useEffect, useState } from "react";
import { Admin, Resource, List, TextField, Datagrid } from "react-admin";
import loopbackClient, { authProvider } from "react-admin-loopback";
import MyLayout from "./MyLayout";
import { Route } from 'react-router-dom';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import HomeScreen from "./components/HomeScreen";


import {
  BTModuleCreate,
  BTModuleEdit,
  BTModuleList
} from '../src/resources/BTModule';

import {
  AreaCreate,
  AreaEdit,
  AreaList
} from './resources/Area';

import {
  QuizCreate,
  QuizEdit,
  QuizList
} from './resources/Quiz';

import {
  UserCreate,
  UserEdit,
  UserList
} from './resources/User';

import UserQuiz from "./resources/UserQuiz";
import config from "./config";
import UserService from "./services/UserService";
import LoginA from "./screens/LoginA";

const messages = {
  'es': spanishMessages,
};

const i18nProvider = polyglotI18nProvider(locale => messages['es']);

const customRoutes = [
  <Route exact path="/userQuiz" component={UserQuiz} />
];

const interceptor = (lbClient) => {
  const userType = localStorage.getItem("userType");
  return async (type, resource, params) => {
    if (type === "GET_LIST" && resource === "CustomUsers" && userType === "2") {
      params.filter = {
          type: {
            nlike: "2"
          }
        
      }
    }

    return lbClient(type, resource, params);
  }
}
// const dataProvider = loopbackClient("http://159.89.50.20:3005/api");
const dataProvider = interceptor(loopbackClient(config.backendUrl));

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if (localStorage.getItem('token') && !currentUser) {
    setCurrentUser(true)
  }

  return (
    //Error al recargar la pagina manualmente. Las tablas no muestran datos
    <div className="App">
      {/* <Admin layout={MyLayout} dataProv ider={dataProvider} authProvider={authProvider('http://159.89.50.20:3005/api/CustomUsers/login')} customRoutes={customRoutes} locale="es" i18nProvider={i18nProvider}> */}
      {!currentUser ? <LoginA setCurrentUser={setCurrentUser}/> : (
        <Admin layout={MyLayout} dataProvider={dataProvider} customRoutes={customRoutes} locale="es" i18nProvider={i18nProvider}>
        <Resource name="Areas" options={{ label: 'Areas' }} create={AreaCreate} edit={AreaEdit} list={AreaList} />
        <Resource name="Quizzes" options={{ label: 'Encuestas' }} create={QuizCreate} edit={QuizEdit} list={QuizList} />
        <Resource name="BTModules" options={{ label: 'Módulos BT' }} create={BTModuleCreate} edit={BTModuleEdit} list={BTModuleList} />
        <Resource name="CustomUsers" options={{ label: 'Usuarios' }} create={UserCreate} edit={UserEdit} list={UserList} />
      </Admin>
      )}
    </div>
  );
}

export default App;
