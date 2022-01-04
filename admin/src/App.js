import React, { createContext, useEffect, useState } from "react";
import { Admin, Resource, List, TextField, Datagrid } from "react-admin";
import loopbackClient, { authProvider } from "react-admin-loopback";

import {
  BTModuleCreate,
  BTModuleEdit,
  BTModuleList
} from '../src/resources/BTModule';

import {
  AnswersCreate,
  AnswersEdit,
  AnswersList
} from './resources/Answers';

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

const dataProvider = loopbackClient("http://localhost:3000/api");

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="BTModules" create={BTModuleCreate} edit={BTModuleEdit} list={BTModuleList} />
        <Resource name="Answers" create={AnswersCreate} edit={AnswersEdit} list={AnswersList} />
        <Resource name="Areas" create={AreaCreate} edit={AreaEdit} list={AreaList} />
        <Resource name="Quizzes" create={QuizCreate} edit={QuizEdit} list={QuizList} />
      </Admin>
    </div>
  );
}

export default App;
