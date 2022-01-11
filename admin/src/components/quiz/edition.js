import React, { useEffect, useState } from 'react'
import Modal from "simple-react-modal";
import {
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    Button,
    TextField
} from "@material-ui/core";
import QuestionAnswer from './questionAnswer';
import QuestionService from '../../services/QuestionService';
import QuizService from '../../services/QuizService';
import AnswerService from '../../services/AnswerService'

const Edition = (props) => {
    const [questionSelected, setQuestionSelected] = useState(null)
    const [openQ, setOpenQ] = useState(false)
    const [openA, setOpenA] = useState(false)
    const [newQuestion, setNewQuestion] = useState(
        ''
    )
    const [newAnswer, setNewAnswer] = useState({
        answer:'',
        value:true
    })
    const [quiz, setQuiz] = useState(props.record)
    const [question, setQuestion] = useState()

    const onRowClick = (q) => {
        if (questionSelected === null) {
            setQuestionSelected(q)
        } else if (questionSelected != q) {
            setQuestionSelected(q)
        } else {
            setQuestionSelected(null)
        }
        
        
    }

    const openModalQ = () => {
        setOpenQ(true)
    }
    
    const closeModalQ = () => {
        setOpenQ(false)
    }
    
    const openModalA = (q) => {
        setOpenA(true)
        setQuestion(q)
        setQuestionSelected(null)
    }
    
    const closeModalA = () => {
        setOpenA(false)
        getQuiz()
    }

    const handleChangeQ = (e) => {
        setNewQuestion(e.target.value)
    }
    const handleChangeA = (e) => {
        setNewAnswer({
            ...newAnswer,
            answer: e.target.value
            })
        
    }

    const sendQuestion = async () => {
        const res = await QuestionService.create({
            statement:newQuestion,
            quizId: quiz.id
        })
        getQuiz()
    }
    
    const getQuiz = async () => {
        const res = await QuizService.findById(props.record.id)
        setQuiz(res.data)
    }

    const sendAnswer = async () => {
        const res = await AnswerService.create({
            label:newAnswer.answer,
            value:newAnswer.value,
            questionId:question.id
        })
        setOpenA(false)
        getQuiz()
    }

    const deleteQ = async (q) => {
        const res = await QuestionService.deleteQuestion(q.id)
        getQuiz()
    }

    

    return (

        <div>
            <h1>Title</h1>
            <h3>Description</h3>
            <Button onClick={openModalQ}  variant="contained" color='primary'>Agregar Preguntas</Button>
            <Modal
            show={openQ}
            onClose={closeModalQ}
            >
                <form>
                    <TextField
                        label="Pregunta"
                        margin="normal"
                        variant="filled"
                        name="question"
                        onChange={handleChangeQ}
                    />
                </form>
                <Button onClick={sendQuestion}>Enviar</Button>
            </Modal>
            <Modal
            show={openA}
            onClose={closeModalA}
            >
                <form>
                    <TextField
                        label="Respuesta"
                        margin="normal"
                        variant="filled"
                        name="answer"
                        onChange={handleChangeA}
                    />
                </form>
                <Button onClick={sendAnswer}>Enviar</Button>
            </Modal>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Preguntas</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quiz.questions.map((q) => (
                            <>
                                <TableRow>
                                    <TableCell>
                                        <div>
                                            <div>{q.statement}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell><Button variant="text" onClick={() => onRowClick(q)} variant="contained" color='primary'>Respuestas</Button></TableCell>
                                    <TableCell><Button onClick={() => openModalA(q)} variant="contained" color='primary'>Agregar Respuesta</Button></TableCell>
                                    <TableCell><Button onClick={() => deleteQ(q)}variant="contained" color='secondary'>Borrar</Button></TableCell>
                                    
                                </TableRow>
                                {q.id === questionSelected?.id ? <QuestionAnswer questionSelected={questionSelected} /> : null}

                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default Edition
