import { List, Datagrid, TextField, ReferenceField } from "react-admin";
import { SelectInput, ReferenceInput, required, regex } from 'react-admin';

import {
  ShowButton,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Create } from "react-admin";

const redirect = () => `/Areas/`;

const validations = {
  name: [required()],
  tagCode: [regex(/^[\w-]+$/, 'Solo se admiten caracteres alfanuméricos y guión medio. Sin espacios')]
}

export const AreaCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect={redirect}>
      <TextInput source="name" label="Nombre" validate={validations.name} />
      <TextInput source="description" label="Descripción" />
      <ReferenceInput label="Encuesta" source='quizId' reference='Quizzes'  >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <SelectInput
        source="type"
        label="Tipo"
        choices={[{ id: "Vehículo", name: "Vehículo" }]}
      />
      <TextInput source="tagCode" label="Código QR" validate={validations.tagCode} />
    </SimpleForm>
  </Create>
);

export const AreaEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Nombre" validate={validations.name} />
      <TextInput source="description" label="Descripción" />
      <ReferenceInput label="Encuesta" source='quizId' reference='Quizzes'  >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <SelectInput
        source="type"
        label="Tipo"
        choices={[{ id: "Vehículo", name: "Vehículo" }]}
      />
      <TextInput source="tagCode" label="Código QR" validate={validations.tagCode} />
    </SimpleForm>
  </Edit>
);

export const AreaList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" label="Nombre" />
      <TextField source="description" label="Descripción" />
      <ReferenceField label="Encuesta" source='quizId' reference='Quizzes'>
        <TextField source="title" />
      </ReferenceField>
      <TextField source="type" label="Tipo" />
      <TextField source="tagCode" label="Código QR" />
      <EditButton />
    </Datagrid>
  </List>
);
