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

const messages = {
  'es': spanishMessages,
};



const i18nProvider = polyglotI18nProvider(locale => messages['es']);

const customRoutes = [
  <Route exact path="/userQuiz" component={UserQuiz} />
];

// const dataProvider = loopbackClient("http://159.89.50.20:3005/api");
const dataProvider = loopbackClient(config.backendUrl);

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [type, setType] = useState()
  const token = localStorage.getItem("lbtoken");
  const user = token ? JSON.parse(token) : undefined;
  const userId = user?.value?.userId


  const bringUserInfo = async () => {
    const res = await UserService.findById(userId);

    setUserInfo(res.data)
    setType(userInfo.type)
    console.log(res.data)
  }

  useEffect(() => {
    bringUserInfo()
  }, [userId])

  const wichType = () => {
    if (type === 'Administrador') {
      return false
    } else if (type === 'Super administrador') {
      return true
    }
  }




  return (
    <div className="App">
      {/* <Admin layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider('http://159.89.50.20:3005/api/CustomUsers/login')} customRoutes={customRoutes} locale="es" i18nProvider={i18nProvider}> */}
      <Admin dashboard={ HomeScreen } layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider(config.backendUrl + '/CustomUsers/login')} customRoutes={customRoutes} locale="es" i18nProvider={i18nProvider}>
        <Resource name="Areas" options={{ label: 'Areas' }} create={AreaCreate} edit={AreaEdit} list={AreaList} />
        <Resource name="Quizzes" options={{ label: 'Encuestas' }} create={QuizCreate} edit={QuizEdit} list={QuizList} />
        <Resource name="BTModules" options={{ label: 'Módulos BT' }} create={BTModuleCreate} edit={BTModuleEdit} list={BTModuleList} />
        <Resource name="CustomUsers" options={{ label: 'Usuarios' }} create={UserCreate} edit={UserEdit} list={UserList} />
      </Admin>
    </div>
  );
}

export default App;
