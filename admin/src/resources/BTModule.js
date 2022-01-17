import { List, Datagrid, TextField } from 'react-admin';
import { ReferenceInput, SelectInput } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const BTModuleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="macAddress" label="Dirección MAC" />
            <ReferenceInput label="Area" source="areaId" reference="areas">
                <SelectInput optionText="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const BTModuleEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="macAddress" label="Dirección MAC" />
        </SimpleForm>
    </Edit>
);

export const BTModuleList = (props) => (
    <List {...props}>
      <Datagrid>
        <ShowButton />
        <EditButton />
        <TextField source="name" label="Nombre" />
        <TextField source="macAddress" label="Dirección MAC" />
      </Datagrid>
    </List>
  );