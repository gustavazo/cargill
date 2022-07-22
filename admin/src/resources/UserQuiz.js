import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import UserQuizService from "../services/UserQuizService";
import UserService from "../services/UserService";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveRedEye } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Title, Confirm } from "react-admin";
import moment from "moment";
import AreaService from "../services/AreaService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const pickerStyle = {
  background: "white",
  borderRadius: 5,
  border: "1px solid black",
  marginBottom: 10,
  marginRight: 10,
}



export default function UserQuiz() {
  const [usersQuizzes, setUsersQuizzes] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [userSelected, setUserSelected] = React.useState({});
  const [areaSelected, setAreaSelected] = React.useState({});
  const [dateSelected, setDateSelected] = React.useState("");
  const [filter, setFilter] = React.useState({});
  const [quizSelected, setQuizSelected] = React.useState(null);
  const localUserType = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpen = (q) => () => {
    setQuizSelected(q);
    setOpen(true);
  };
  const handleOpenDeleteDialog = (q) => {
    console.log('q', q)
    setQuizSelected(q);
    setOpenDeleteDialog(true);
  };
  const handleDelete = async (q) => {
    const res = await UserQuizService.remove(q.id);
    fetchUsersQuizzes();
    setOpenDeleteDialog(false)
  }



  const handleClose = () => setOpen(false);

  const fetchUsersQuizzes = async () => {
    const res = await UserQuizService.find({ ...filter, include: ['area'] });
    let allUsersQuizzes = res.data;
    localUserType.current !== '2' ? allUsersQuizzes = allUsersQuizzes.filter(userQuiz => userQuiz.customUser.type !== '2') : null
    setUsersQuizzes(allUsersQuizzes);
  };

  const fetchUsers = async () => {
    const res = await UserService.find();
    let allUsers = res.data;
    console.log('allUsers', allUsers)
    localUserType.current !== '2' ? allUsers = allUsers.filter(user => user.type !== '2') : null
    setUsers(allUsers);
  };
  const fetchAreas = async () => {
    const res = await AreaService.find();
    let allAreas = res.data;
    console.log('allAreas', allAreas)
    setAreas(allAreas);

  }

  function pickerArea(evt, value) {
    const area = areas.find((a) => a.id === value?.id)
    setAreaSelected(area);
    addFilter({ areaId: area.id });

  }



  function pickerUser(evt, value) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.id === value.id) {
        setUserSelected(user);
      }
    }
    const user = users.find((u) => u.id === value.id);

    // setFilter({
    //   ...filter,
    //   where: {
    //     ...(filter.where || {}),//en javascript una operación and u or no devuelve un booleano si no el valor de la variable verdadera en si
    //     customUserId: user.id,
    //   },
    // });
    addFilter({ customUserId: user.id });
  }

  function addFilter(newFilter) {
    setFilter({
      ...filter,
      where: {
        ...(filter.where || {}),//en javascript una operación and u or no devuelve un booleano si no el valor de la variable verdadera en si
        ...newFilter
      },
    });
  }

  function handleFecha(evt) {
    const start = moment(new Date(evt.target.value));
    const end = moment(new Date(evt.target.value))
      .add(1, "day")
      .subtract(1, "millisecond");
    //console.log("START", start.toISOString());
    //console.log("END", end.toISOString());

    setDateSelected(getDateTime(evt.target.value));
    setFilter({
      ...filter,
      where: {
        ...(filter.where || {}),
        date: {
          //between: [start.setHours(0), end.setHours(23, 59)]
          between: [start, end],
        },
      },
    });
  }



  function handleClick() {
    fetchUsersQuizzes();
  }

  function onClickRefresh() {
    setUserSelected({});
    // setDateSelected(getDateTime());
    window.location.reload();
  }

  const getDateTime = () => {
    const date = new Date().toISOString();
    const cantidadCaracteres = date.length;
    const hasta = cantidadCaracteres - 14;
    const dateModificado = date.slice(0, hasta);

    return dateModificado;
  };

  React.useEffect(() => {
    fetchUsersQuizzes();
    fetchUsers();
    fetchAreas();
    localUserType.current = localStorage.getItem("userType");
  }, []);

  //////////////////////////////////////
  //     REVISAR ANTES DE PUSHEAR     //
  //////////////////////////////////////

  const renderIsValid = (id) => {
    const valid = quizSelected.userAnswers?.find(a => a.answerId === id)?.value;

    return (
      <>
        <StyledTableCell align="center">{valid ? "✔" : null}</StyledTableCell>
        <StyledTableCell align="center">{!valid ? "❌" : null}</StyledTableCell>
      </>
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  console.log('quizSelected', quizSelected);

  //////////////////////////////////////
  //     REVISAR ANTES DE PUSHEAR     //
  //////////////////////////////////////

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      //sx={{display: 'flex'}}
      >
        <Box sx={style} style={{ width: "auto", maxHeight: '90vh', display: "flex", flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 35,
              margin: 0,
              //marginTop: -20,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {quizSelected?.quiz?.title}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 30,
              //marginTop: -15,
              fontWeight: "lighter",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {quizSelected?.area?.name}
          </div>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "lighter",
              fontSize: 20,
              margin: 5,
            }}
          >
            Fecha de realizacion del test:{" "}
            {moment.utc(new Date(quizSelected?.date)).format("DD/MM/YYYY, HH:mm")}
          </span>
          <TableContainer component={Paper} style={{ maxHeight: 500 }}>
            <Table aria-label="customized table" stickyHeader>
              {quizSelected?.quiz?.questions?.map((question, index) => (
                <>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        {question?.statement}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        CUMPLE
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        NO CUMPLE
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {question?.answers?.map((answer) => (
                      <StyledTableRow
                        key={answer?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {/* Empty TableCell */}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {answer?.label} {answer.excluding && "-" + " EXCLUYENTE "}
                        </StyledTableCell>
                        {renderIsValid(answer.id)}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </>
              ))}
            </Table>
          </TableContainer>
          <br />
          <TextField
            id="outlined-read-only-input"
            label="Observaciones"
            defaultValue={quizSelected?.observations}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Box>
      </Modal>
      <Confirm
        isOpen={openDeleteDialog}
        title={"Borrar Test de " + quizSelected?.customUser.firstName + " " + quizSelected?.customUser.lastName}
        content={"¿Está seguro que desea borrar el test de forma permanente?"}
        onConfirm={() => handleDelete(quizSelected)}
        onClose={() => setOpenDeleteDialog(false)}
      />
      <Paper>
        <div style={{ margin: 25 }}>
          <Title title="Pruebas de los usuarios" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            border: "1px solid #2196F3",
            borderBottom: 0,
            borderRadius: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            paddingTop: 10,
            background: "#2196F3",
          }}
        >
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              disablePortal
              options={areas.map((option) => { return { label: option.name, id: option.id } })}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar área" />
              )}
              onChange={pickerArea}
              value={areaSelected?.name}
              style={pickerStyle}
            />
          </Stack>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              disablePortal
              //options={users.map((option) => option.firstName)}¨
              options={users.map((option) => { return { label: option.lastName + " " + option.firstName + " - " + option.username, id: option.id } })}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar usuario" />
              )}
              onChange={pickerUser}
              value={userSelected.firstName}
              style={pickerStyle}
            />
          </Stack>
          <div>
            <TextField
              id="date"
              label="Fecha"
              type="date"
              onChange={handleFecha}
              defaultValue={getDateTime()}
              style={{
                background: "white",
                borderRadius: 5,
                border: "1px solid black",
                marginBottom: 10,
                marginRight: 10,
              }}
              variant="filled"
              // value={dateSelected}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              style={{
                margin: 5,
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "40px",
                background: "#f5f5f5",
                color: "gray",
                marginBottom: 10,
              }}
              variant="contained"
              onClick={onClickRefresh}
            >
              <RefreshIcon style={{ fontSize: 20 }} />
            </Button>
            <Button
              style={{
                margin: 5,
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "40px",
                background: "#f4f4f4",
                color: "gray",
                marginRight: 10,
                marginBottom: 10,
              }}
              variant="contained"
              onClick={handleClick}
            >
              <SearchIcon style={{ fontSize: 20 }} />
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Area</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Aprobado</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersQuizzes.map((q) => (
                <TableRow
                  key={q.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{q?.area?.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {q?.quiz?.description}
                  </TableCell>
                  <TableCell>
                    {q?.customUser?.lastName + ", " + q?.customUser?.firstName}
                  </TableCell>
                  <TableCell>{q?.date}</TableCell>
                  <TableCell>
                    {q?.valid ? <span>✔</span> : <span>❌</span>}
                  </TableCell>
                  <TableCell>{q?.observations}</TableCell>
                  <TableCell>
                    <Button variant="contained" style={{ margin: 5, width: '40px', height: '40px' }} onClick={handleOpen(q)}>
                      VER
                    </Button>
                    {(localUserType.current === '2') ?
                      <Button color='error' style={{ margin: 5, width: '40px', height: '40px' }} onClick={() => handleOpenDeleteDialog(q)} variant='contained'><DeleteIcon style={{ fontSize: 20 }} /></Button>
                      : null
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

// automcoplete para usuarios
// input date para fechas
// boton de buscar

// boton de refrescar filtros
// agregar boton para detalles de userQuizz
// agregar filtro de estado( si el quizz esta aprobado o no )
// css
