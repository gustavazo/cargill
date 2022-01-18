import { List, Datagrid, TextField } from 'react-admin';
import { SelectInput } from 'react-admin';
import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput
                source="type"
                label="Tipo"
                choices={[
                    { id: 'operador', name: 'Operador' },
                    { id: 'admin', name: 'Admin' }
            ]} />
            <TextInput source="firstName" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <TextInput source="gender" label="Género" />
            <TextInput source="legajo" label="Legajo" />
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput
                source="type"
                label="Tipo"
                choices={[
                    { id: 'operador', name: 'Operador' },
                    { id: 'admin', name: 'Admin' }
            ]} />
            <TextInput source="firstName" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <TextInput source="gender" label="Género" />
            <TextInput source="legajo" label="Legajo" />
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