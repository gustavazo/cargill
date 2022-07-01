import { List, Datagrid, TextField, ReferenceField, ReferenceInput, SelectInput } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';
import QuizEdition from '../components/quiz/edition'

export const QuizCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            {/* <ReferenceInput label="Area" source='areaId' reference='Areas'  >
                <SelectInput source="area" label="Area" />
            </ReferenceInput> */}
            <TextInput source="title" label="Título" />
            <TextInput source="description" label="Descripción" />
        </SimpleForm>
    </Create>
);

export const QuizEdit = (props) => (
    <Edit {...props}>
        <QuizEdition {...props} />
    </Edit>
);

export const QuizList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />
            <EditButton />
        </Datagrid>
    </List>
);