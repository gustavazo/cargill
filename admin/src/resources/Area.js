import { List, Datagrid, TextField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const AreaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="type" />
            <TextField source="description" />
            <TextField source="tagCode" />
        </SimpleForm>
    </Create>
);

export const AreaEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="type" />
            <TextField source="description" />
            <TextField source="tagCode" />
        </SimpleForm>
    </Edit>
);

export const AreaList = (props) => (
    <List {...props}>
        <Datagrid>
            <ShowButton />
            <EditButton />
            <TextField source="type" />
            <TextField source="description" />
            <TextField source="tagCode" />
        </Datagrid>
    </List>
);