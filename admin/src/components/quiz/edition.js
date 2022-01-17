import React, { useEffect, useState } from 'react'
import Modal from "simple-react-modal";
import {
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TextField
} from "@material-ui/core";
import QuestionAnswer from './questionAnswer';
import QuestionService from '../../services/QuestionService';
import QuizService from '../../services/QuizService';
import AnswerService from '../../services/AnswerService'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Edition = (props) => {
    const [questionSelected, setQuestionSelected] = useState(null)
    const [openQ, setOpenQ] = useState(false)
    const [openA, setOpenA] = useState(false)
    const [openE, setOpenE] = useState(false)
    const [newQuestion, setNewQuestion] = useState(
        ''
    )
    const [editQ, setEditQ] = useState({
        statement: '',
        id:0
    })
    const [newAnswer, setNewAnswer] = useState({
        answer:'',
        value:true
    })
    const [quiz, setQuiz] = useState(props.record)
    const [question, setQuestion] = useState()

    console.log(quiz,'e logi')

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

    const openModalE = (q) => {
        setOpenE(true)
        setEditQ({
            statement: q.statement,
            id: q.id
        })
    }

    const closeModalE = () => {
        setOpenE(false)
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

    const handleChangeE = (e) => {
        setEditQ({
            ...editQ,
            statement: e.target.value
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

    const editedQ = async () => {
        const res = await QuestionService.editQuestion(editQ.id,{statement: editQ.statement})
        getQuiz()
    }

    

    return (

        <div>
            <div style={{fontSize: 35, margin: 20, marginBottom: 0, fontWeight:'bold'}}>{quiz?.title}</div>
            <div style={{fontSize: 30, margin: 20, marginTop: 0, fontWeight: 'lighter'}}>{quiz?.description}</div>
            <Button style={{position:'absolute', top:100, right: 40}}onClick={openModalQ}  variant="contained" color='primary'>Agregar Preguntas</Button>
            <Modal
            show={openE}
            onClose={closeModalE}
            >
                <form>
                    <TextField
                        label="Pregunta"
                        margin="normal"
                        variant="filled"
                        name="statement"
                        value={editQ.statement}
                        onChange={handleChangeE}
                    />
                </form>
                <Button onClick={editedQ}>Enviar</Button>
            </Modal>
            <Modal
            show={openQ}
            onClose={closeModalQ}
            >
                <div style={{display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 20, padding: 10}}>Agregar pregunta</div>
                <form style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField
                        label="Pregunta"
                        margin="normal"
                        variant="filled"
                        name="question"
                        onChange={handleChangeQ}
                    />
                </form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                   <Button variant='contained' color='primary' onClick={sendQuestion}>Enviar</Button>
                </div>
            </Modal>
            <Modal
            show={openA}
            onClose={closeModalA}
            >
                <div style={{display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 20, padding: 10}}>Agregar respuesta</div>
                <form style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField
                        label="Respuesta"
                        margin="normal"
                        variant="filled"
                        name="answer"
                        onChange={handleChangeA}
                    />
                </form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant='contained' color='primary' onClick={sendAnswer}>Enviar</Button>
                </div>
            </Modal>
                    <div style={{display: 'flex', justifyContent: 'space-between', background: '#2E7D32', color: 'white', padding: 5}}>
                        <div align="center" style={{fontSize: 22, fontWeight:'bold', marginLeft: 15}}>Preguntas</div>
                    </div>
                    <div>
                        {quiz.questions?.map((q) => (
                            <>
                                <div style={{cursor:'pointer'}} onClick={() => onRowClick(q)}>
                                    <div style={{fontSize:18, display: 'flex', justifyContent:'space-between', margin: 10, marginLeft: 20}}>
                                        <div>
                                            {q.statement}<ArrowDropDownIcon/>
                                        </div>
                                        <div>
                                            <Button onClick={() => openModalA(q)} variant="contained" color='success' style={{marginRight: 5}}><AddIcon/></Button>
                                            <Button onClick={() => deleteQ(q)}variant="contained" color='error' style={{marginLeft: 5}}><DeleteIcon/></Button>
                                            <Button onClick={() => openModalE(q)} variant="contained" color='primary' style={{marginLeft: 5}}>Editar pregunta</Button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{background: '#f5f5f4', paddingLeft: 20}}>
                                  {q.id === questionSelected?.id ? <QuestionAnswer questionSelected={questionSelected} /> : null}
                                </div>

                            </>
                        ))}
                    </div>
        </div>

    )
}

export default Edition
