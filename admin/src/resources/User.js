import { List, Datagrid, TextField, FunctionField, email } from 'react-admin';
import { SelectInput } from 'react-admin';
import { ShowButton, EditButton, Edit, SimpleForm, TextInput, PasswordInput, required, regex } from 'react-admin';
import { Create } from 'react-admin';
const validations = {
    passwordEdit: [regex(/^\S+$/, "La contraseña no puede tener espacios en blanco")],
    password: [regex(/^\S+$/, 'La contraseña no puede tener espacios en blanco'), required()],
    userName: [required()],
    firstName: [required()],
    lastName: [required()],
    email: [required(), email()],
    type: [required()]
}
const redirect = () => `/CustomUsers/`;

const userType = {
    0: "Operador",
    1: "Administrador",
    2: "Super administrador"
};
//
function getUserTypeChoices() {
    let arrChoices = [];
    const localUserType = localStorage.getItem("userType");
    for (const key in userType) {
        if (userType.hasOwnProperty(key)) {
            //en caso de que el usuario logeado no sea superadmin no puede asignar la jerarqu[ia de superadmin a ningun usuario]
            if (key !== '2' || (key === '2' && localUserType === '2')) {
                const element = { id: key, name: userType[key] };
                arrChoices.push(element);
            }
        }
    }
    console.log('ArrChoices', arrChoices);
    return arrChoices;
}

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <SelectInput
                source="type"
                label="Tipo"
                validate={validations.type}
                choices={getUserTypeChoices()} />
            <TextInput source="firstName" label="Nombre" validate={validations.firstName} />
            <TextInput source="lastName" label="Apellido" validate={validations.lastName} />
            <TextInput source="email" label="Email" validate={validations.email} />
            <PasswordInput source="password" label="Contraseña" inputProps={{ autoComplete: "new-password" }} validate={validations.password} />
            <SelectInput
                source="gender"
                label="Género"
                choices={[
                    { id: 'Masculino', name: 'Masculino' },
                    { id: 'Femenino', name: 'Femenino' }
                ]} />
            <TextInput source="username" label="Legajo" validate={validations.userName} />
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <SelectInput
                    source="type"
                    label="Tipo"
                    validate={validations.type}
                    choices={getUserTypeChoices()} />
                <TextInput source="firstName" label="Nombre" validate={validations.firstName} />
                <TextInput source="lastName" label="Apellido" validate={validations.lastName} />
                <TextInput source="email" label="Email" validate={validations.email} />
                <PasswordInput source="password" label="Modificar Contraseña" helperText="Completar solo en caso de requerir modificar contraseña" inputProps={{ autoComplete: "new-password" }} validate={validations.passwordEdit} />
                <SelectInput
                    source="gender"
                    label="Género"
                    choices={[
                        { id: 'Masculino', name: 'Masculino' },
                        { id: 'Femenino', name: 'Femenino' }
                    ]} />
                <TextInput source="username" label="Legajo" validate={validations.userName} />
            </SimpleForm>
        </Edit>
    )
}
    ;

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