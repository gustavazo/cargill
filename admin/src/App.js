import React, { createContext, useEffect, useState } from "react";
import { Admin, Resource, List, TextField, Datagrid } from "react-admin";
import loopbackClient, { authProvider } from "react-admin-loopback";

const dataProvider = loopbackClient("http://localhost:3000/api");

const ListArea = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
    </Datagrid>
  </List>
);

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="Areas" list={ListArea} />
      </Admin>
    </div>
  );
}

export default App;
