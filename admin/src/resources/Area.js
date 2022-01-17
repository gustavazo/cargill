import { List, Datagrid, TextField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';


export const AreaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="type" label="Tipo" />
            <TextField source="description" label="Descripción" />
            <TextField source="tagCode" label="Código QR" />
        </SimpleForm>
    </Create>
);

export const AreaEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="type" label="Tipo" />
            <TextField source="description" label="Descripción" />
            <TextField source="tagCode" label="Código QR" />
        </SimpleForm>
    </Edit>
);

export const AreaList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="type" label="Tipo" />
            <TextField source="description" label="Descripción" />
            <TextField source="tagCode" label="Código QR" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);