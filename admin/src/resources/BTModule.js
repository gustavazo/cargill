import { List, Datagrid, TextField } from 'react-admin';
import { ReferenceField, ReferenceInput, SelectInput } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';
import { Create } from 'react-admin';
import BTcreate from '../components/btmodule/create';


const redirect = () => `/BTModules/`;

export const BTModuleCreate = (props) => (
    <Create {...props}>
        {/* <SimpleForm redirect={redirect}>
            <TextInput source="name" label="Nombre" />
            <TextInput source="macAddress" label="Dirección MAC" />
            <ReferenceInput label="Area" source="areaId" reference="areas">
                <SelectInput optionText=""/>
            </ReferenceInput>
        </SimpleForm> */}
        <BTcreate {...props} />
    </Create>
);

export const BTModuleEdit = (props) => (
    <Edit {...props}>
        <BTcreate {...props} />
    </Edit>
);

export const BTModuleList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source="name" label="Nombre" />
        <TextField source="macAddress" label="Dirección MAC" />
        <ReferenceField label="Area" source="areaId" reference="Areas">
            <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );