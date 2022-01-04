import { List, Datagrid, TextField, BooleanInput } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const AnswersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="type" />
            <BooleanInput source='isCorrect' label="isCorrect" />
            <BooleanInput source='excluding' label="excluding" />
            <BooleanInput source='value' label="value" />
        </SimpleForm>
    </Create>
);

export const AnswersEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="type" />
            <BooleanInput source='isCorrect' label="isCorrect" />
            <BooleanInput source='excluding' label="excluding" />
            <BooleanInput source='value' label="value" />
        </SimpleForm>
    </Edit>
);

export const AnswersList = (props) => (
    <List {...props}>
        <Datagrid>
            <ShowButton />
            <EditButton />
            <TextInput source="type" />
        </Datagrid>
    </List>
);