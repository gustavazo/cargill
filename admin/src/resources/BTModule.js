import { List, Datagrid, TextField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const BTModuleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="macAddress" />
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const BTModuleEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="macAddress" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const BTModuleList = (props) => (
    <List {...props}>
      <Datagrid>
        <ShowButton />
        <EditButton />
        <TextField source="macAddress" />
        <TextField source="name" />
      </Datagrid>
    </List>
  );