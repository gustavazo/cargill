import { TableCell, TextField } from "@mui/material";
import Table from "@mui/material/node/Table";
import TableBody from "@mui/material/node/TableBody";
import TableContainer from "@mui/material/node/TableContainer";
import TableHead from "@mui/material/node/TableHead";
import TableRow from "@mui/material/node/TableRow";
import { formatDateUtc } from "./UserQuiz";
import Paper from "@mui/material/node/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

export function UserQuizToExport({ userQuiz }) {
    // if (userQuiz?.quiz?.questions?.length) {
    //     userQuiz.quiz.questions = [...userQuiz.quiz.questions, ...userQuiz.quiz.questions]
    // }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        padding: 0,
        margin: 0,
        height: 1
    }
    ));

    const renderIsValid = (id) => {
        const valid = userQuiz.userAnswers?.find(a => a.answerId === id)?.value;

        return (
            <>
                <StyledTableCell align="center">{valid ? "✔" : "❌"}</StyledTableCell>
            </>
        );
    };
    return (
        <div style={{}}>
            <div
                style={{ width: "auto", display: "flex", flexDirection: 'column' }}>
                <div
                    style={styles.title}
                >
                    {userQuiz?.quiz?.title}
                </div>
                <div
                    style={styles.subtitles}
                >
                    {userQuiz?.area?.name}
                </div>
                <span
                    style={styles.subtitles}
                >
                    Fecha de realizacion:{" "}
                    {/* {moment.utc(new Date(quizSelected?.date)).format("DD/MM/YYYY, HH:mm")} */}
                    {formatDateUtc(userQuiz?.date)}
                </span>
                <span
                    style={styles.subtitles}
                >
                    {`Verificó: ${userQuiz?.customUser?.firstName} ${userQuiz?.customUser?.lastName} - ${userQuiz?.customUser?.username}`}
                </span>
                <span
                    style={styles.subtitles}
                >
                    <span style={{ padding: 4 }}>{`Estado: `}</span>
                    <span style={{ padding: 4, fontWeight: 'bold' }}>{userQuiz?.valid ? <span style={{ color: "green" }}>CUMPLE</span> : <span style={{ color: "red" }}> NO CUMPLE</span>}</span>
                </span>
                <TableContainer component={Paper} >
                    <Table aria-label="customized table" >
                        {userQuiz?.quiz?.questions?.map((question, index) => (
                            <>
                                <TableHead>
                                    <TableRow style={{ padding: 10, backgroundColor: 'lightgray' }}>
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
                                            {question?.statement?.toUpperCase()}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {index == 0 ? "ESTADO" : ''}
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
                    label='Observaciones'
                    defaultValue={"Ninguna"}
                    value={userQuiz?.observations}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    multiline
                    size="small"
                    sx={{ fontSize: 1 }}

                />
            </div>
        </div >
    )
}


const styles = {
    subtitles: {
        display: "flex",
        justifyContent: "center",
        fontWeight: "lighter",
        fontSize: 18,
        margin: 0,
    },
    title: {
        fontSize: 25,
        margin: 0,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
    }

}
