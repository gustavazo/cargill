import React, { createContext, useEffect, useState } from "react";
import { Admin, Resource, List, TextField, Datagrid } from "react-admin";
import loopbackClient, { authProvider } from "react-admin-loopback";

import {
  BTModuleCreate,
  BTModuleEdit,
  BTModuleList
} from '../src/resources/BTModule'

const dataProvider = loopbackClient("http://localhost:3000/api");

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="BTModules" create={BTModuleCreate} edit={BTModuleEdit} list={BTModuleList} />
      </Admin>
    </div>
  );
}

export default App;
