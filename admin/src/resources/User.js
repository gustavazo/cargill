import { List, Datagrid, TextField, FunctionField } from 'react-admin';
import { SelectInput } from 'react-admin';
import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';

const redirect = () => `/CustomUsers/`;

const userType = {
    0: "Operador",
    1: "Administrador",
    2: "Super administrador"
};


export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <SelectInput
                source="type"
                label="Tipo"
                choices={[
                    { id: '0', name: 'Operador' },
                    { id: '1', name: 'Administrador' },
                    { id: '2', name: 'Super administrador' }
                ]} />
            <TextInput source="firstName" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <TextInput source="email" label="Email" />
            <TextInput source="password" label="Contraseña" />
            <SelectInput
                source="gender"
                label="Género"
                choices={[
                    { id: 'Masculino', name: 'Masculino' },
                    { id: 'Femenino', name: 'Femenino' }
                ]} />
            <TextInput source="username" label="Legajo" />
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
                    { id: '0', name: 'Operador' },
                    { id: '1', name: 'Administrador' },
                    { id: '2', name: 'Super administrador' }
                ]} />
            <TextInput source="firstName" label="Nombre" />
            <TextInput source="lastName" label="Apellido" />
            <SelectInput
                source="gender"
                label="Género"
                choices={[
                    { id: 'Masculino', name: 'Masculino' },
                    { id: 'Femenino', name: 'Femenino' }
                ]} />
            <TextInput source="username" label="Legajo" />
        </SimpleForm>
    </Edit>
);

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <FunctionField source="type" label="Tipo" render={record => userType[record.type]} />
            <TextField source="firstName" label="Nombre" />
            <TextField source="lastName" label="Apellido" />
            <TextField source="gender" label="Género" />
            <TextField source="username" label="Legajo" />
            <EditButton />
        </Datagrid>
    </List>
);