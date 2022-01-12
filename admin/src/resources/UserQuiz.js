import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import UserQuizService from '../services/UserQuizService';
import UserService from '../services/UserService';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UserQuiz() {
    const [usersQuizzes, setUsersQuizzes] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [userSelected, setUserSelected] = React.useState({});
    const [dateSelected, setDateSelected] = React.useState("");
    const [filter, setFilter] = React.useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = (q) => () => {
        setOpen(true);
        console.log('q', q)
    };
    const handleClose = () => setOpen(false);

    const fetchUsersQuizzes = async () => {
        const allUsersQuizzes = await UserQuizService.find(filter);
        setUsersQuizzes(allUsersQuizzes.data);
    };

    const fetchUsers = async () => {
        const allUsers = await UserService.find();
        setUsers(allUsers.data);
        console.log('allUsers', allUsers);
    };

    function pickerUser(evt, value) {
        console.log('pickerUSre', evt.target.value);
        console.log('pickerValue', value);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            if (user.firstName === value) {
                setUserSelected(user)
            }
        }
        setFilter({
            ...filter,
            where: {
                ...filter.where || {},
                customUserId: userSelected.id
            }
        })
    };

    function handleFecha(evt) {
        const start = new Date(evt.target.value);
        const end = new Date(evt.target.value);
        setDateSelected(getDateTime(evt.target.value));
        setFilter({
            ...filter,
            where: {
                ...filter.where || {},
                date: {
                    between: [start.setHours(0), end.setHours(23, 59)]
                }
            }
        })
    };

    function handleClick() {
        fetchUsersQuizzes();
    };

    function onClickRefresh() {
        setUserSelected({});
        // setDateSelected(getDateTime());
        window.location.reload();
    };

    const getDateTime = () => {
        const date = new Date().toISOString();
        const cantidadCaracteres = date.length;
        const hasta = cantidadCaracteres - 14;
        const dateModificado = date.slice(0, hasta)

        return dateModificado;
    };

    React.useEffect(() => {
        fetchUsersQuizzes();
        fetchUsers();
    }, []);

    // console.log('usersQuizzes', usersQuizzes);
    console.log('userSelected', userSelected);
    console.log('filter', filter)
    console.log('date', dateSelected)

    return (
        <div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>



            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <h1>usersQuizzes</h1>
                <Button onClick={onClickRefresh}>Refrescar</Button>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={users.map((option) => option.firstName)}
                        renderInput={(params) => <TextField {...params} label="Seleccionar usuario" />}
                        onChange={pickerUser}
                        value={userSelected.firstName}
                    />
                </Stack>
                <br />
                <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    onChange={handleFecha}
                    defaultValue={getDateTime()}
                    // value={dateSelected}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button onClick={handleClick}>Buscar</Button>
            </div>
            <br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Observation</TableCell>
                            <TableCell>Tittle</TableCell>
                            <TableCell>Boton</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersQuizzes.map((q) => (
                            <TableRow
                                key={q.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {q.quiz.description}
                                </TableCell>
                                <TableCell>{q.quiz.title}</TableCell>
                                <TableCell><Button onClick={handleOpen(q)}>Detalles</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};


// automcoplete para usuarios
// input date para fechas
// boton de buscar


// boton de refrescar filtros
// agregar boton para detalles de userQuizz
// agregar filtro de estado( si el quizz esta aprobado o no )
// css