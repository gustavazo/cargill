import { List, Datagrid, TextField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="type" label="Tipo" />
            <TextField source="firstName" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <TextField source="gender" label="Género" />
            <TextField source="legajo" label="Legajo" />
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="type" label="Tipo" />
            <TextField source="firstName" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <TextField source="gender" label="Género" />
            <TextField source="legajo" label="Legajo" />
        </SimpleForm>
    </Edit>
);

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="type" label="Tipo" />
            <TextField source="firstName" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <TextField source="gender" label="Género" />
            <TextField source="legajo" label="Legajo" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);