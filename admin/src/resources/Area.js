import { List, Datagrid, TextField } from "react-admin";
import { SelectInput } from 'react-admin';

import {
  ShowButton,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Create } from "react-admin";

const redirect = () => `/Areas/`;

export const AreaCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect={redirect}>
      <TextInput source="name" label="Nombre" />
      <TextInput source="description" label="Descripción" />
      <SelectInput
        source="type"
        label="Tipo"
        choices={[{ id: "Vehículo", name: "Vehículo" }]}
      />
      <TextInput source="tagCode" label="Código QR" />
    </SimpleForm>
  </Create>
);

export const AreaEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <TextInput source="description" label="Descripción" />
      <SelectInput
        source="type"
        label="Tipo"
        choices={[{ id: "Vehículo", name: "Vehículo" }]}
      />
      <TextInput source="tagCode" label="Código QR" />
    </SimpleForm>
  </Edit>
);

export const AreaList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" label="Nombre" />
      <TextField source="description" label="Descripción" />
      <TextField source="type" label="Tipo" />
      <TextField source="tagCode" label="Código QR" />
      <EditButton />
    </Datagrid>
  </List>
);
