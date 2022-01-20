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
                    { id: 'Operador', name: 'Operador' },
                    { id: 'Admin', name: 'Admin' }
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
                    { id: 'Operador', name: 'Operador' },
                    { id: 'Admin', name: 'Admin' }
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
            <EditButton />
        </Datagrid>
    </List>
);