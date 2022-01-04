import { List, Datagrid, TextField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const QuizCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

export const QuizEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="title" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const QuizList = (props) => (
    <List {...props}>
      <Datagrid>
        <ShowButton />
        <EditButton />
        <TextField source="title" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );