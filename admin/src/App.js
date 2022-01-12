import React, { createContext, useEffect, useState } from "react";
import { Admin, Resource, List, TextField, Datagrid } from "react-admin";
import loopbackClient, { authProvider } from "react-admin-loopback";
import MyLayout from "./MyLayout";
import { Route } from 'react-router-dom';


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

import UserQuiz from "./resources/UserQuiz";


const customRoutes = [
  <Route exact path="/userQuiz" component={UserQuiz}/>
];

const dataProvider = loopbackClient("http://localhost:3000/api");

function App() {
  return (
    <div className="App">
      <Admin layout={MyLayout} dataProvider={dataProvider} customRoutes={customRoutes}>
        <Resource name="BTModules" create={BTModuleCreate} edit={BTModuleEdit} list={BTModuleList} />
        <Resource name="Areas" create={AreaCreate} edit={AreaEdit} list={AreaList} />
        <Resource name="Quizzes" create={QuizCreate} edit={QuizEdit} list={QuizList} />
      </Admin>
    </div>
  );
}

export default App;
