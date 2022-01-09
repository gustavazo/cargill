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
    }
    
    const closeModalA = () => {
        setOpenA(false)
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

    const sendAnswer = async () => {
        const res = await AnswerService.create({
            label:newAnswer.answer,
            value:newAnswer.value,
            questionId:question.id
        })
        getQuiz()
    }
    
    const getQuiz = async () => {
        const res = await QuizService.findById(props.record.id)
        setQuiz(res.data)
    }

    const deleteQ = async (q) => {
        const res = await QuestionService.deleteAnswer(q.id)
        getQuiz()
    }

    

    return (

        <div>
            <h1>Title</h1>
            <h3>Description</h3>
            <Button onClick={openModalQ}>Add question</Button>
            <Modal
            show={openQ}
            onClose={closeModalQ}
            >
                <form>
                    <TextField
                        label="Question"
                        margin="normal"
                        variant="filled"
                        name="question"
                        onChange={handleChangeQ}
                    />
                </form>
                <Button onClick={sendQuestion}>Send</Button>
            </Modal>
            <Modal
            show={openA}
            onClose={closeModalA}
            >
                <form>
                    <TextField
                        label="Answer"
                        margin="normal"
                        variant="filled"
                        name="answer"
                        onChange={handleChangeA}
                    />
                </form>
                <Button onClick={sendAnswer}>Send</Button>
            </Modal>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Questions</TableCell>

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
                                    <TableCell><Button variant="text" onClick={() => onRowClick(q)}>Answer</Button></TableCell>
                                    <TableCell><Button onClick={() => openModalA(q)}>Add answer</Button></TableCell>
                                    <TableCell><Button onClick={() => deleteQ(q)}>Delete</Button></TableCell>
                                    
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
