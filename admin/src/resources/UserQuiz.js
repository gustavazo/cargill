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
import { styled } from "@mui/material/styles";
import { Title } from "react-admin";
import moment from "moment";

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

export default function UserQuiz() {
  const [usersQuizzes, setUsersQuizzes] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userSelected, setUserSelected] = React.useState({});
  const [dateSelected, setDateSelected] = React.useState("");
  const [filter, setFilter] = React.useState({});
  const [quizSelected, setQuizSelected] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (q) => () => {
    setQuizSelected(q);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchUsersQuizzes = async () => {
    const allUsersQuizzes = await UserQuizService.find(filter);
    setUsersQuizzes(allUsersQuizzes.data);
  };

  const fetchUsers = async () => {
    const allUsers = await UserService.find();
    setUsers(allUsers.data);
  };

  function pickerUser(evt, value) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (user.firstName === value) {
        setUserSelected(user);
      }
    }
    const user = users.find((u) => u.firstName === value);

    setFilter({
      ...filter,
      where: {
        ...(filter.where || {}),
        customUserId: user.id,
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
  }, []);

  //////////////////////////////////////
  //     REVISAR ANTES DE PUSHEAR     //
  //////////////////////////////////////

  const renderIsValid = (id) => {
    const valid = quizSelected.userAnswers?.find(a => a.answerId === id).value;

    return (
      <>
        <StyledTableCell align="center">{valid ? "✔": null}</StyledTableCell>
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

  console.log(quizSelected);

  //////////////////////////////////////
  //     REVISAR ANTES DE PUSHEAR     //
  //////////////////////////////////////

  return (
    <div>
      <Paper>
        <div style={{ margin: 25 }}>
          <Title title="Pruebas de los usuarios" />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ width: "auto" }}>
              <div
                style={{
                  fontSize: 35,
                  margin: 0,
                  marginTop: -20,
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
                  marginTop: -15,
                  fontWeight: "lighter",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {quizSelected?.quiz?.description}
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
                {moment().format("DD/MM/YYYY HH:mm")}
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
                              {answer?.label}
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
              freeSolo
              options={users.map((option) => option.firstName)}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar usuario" />
              )}
              onChange={pickerUser}
              value={userSelected.firstName}
              style={{
                background: "white",
                borderRadius: 5,
                border: "1px solid black",
                marginBottom: 10,
                marginRight: 10,
              }}
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
                <TableCell>Encuesta</TableCell>
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
                  <TableCell>{q?.quiz?.title}</TableCell>
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
                    <Button variant="contained" onClick={handleOpen(q)}>
                      Ver
                    </Button>
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
