import React, { useEffect, useState } from 'react'
import {
    TableRow,
    TextField
} from "@material-ui/core";
import AnswerService from '../../services/AnswerService';
import Modal from "simple-react-modal";
import QuestionService from '../../services/QuestionService';
import Button from '@mui/material/Button';

const QuestionAnswer = (props) => {

    const [open, setOpen] = useState(false)
    const [editA, setEditA] = useState({
        label:'',
        id:0
    })
    const [answers, setAnswers] = useState(props.questionSelected)

    const getAnswers = async () => {
        const res = await QuestionService.findById(props.questionSelected.id)
        setAnswers(res.data)
    }


    const openModal = (a) => {
        setOpen(true)
        setEditA({
            label: a.label,
            id: a.id
        })
    }

    const handleChange = (e) => {
        setEditA({
            ...editA,
            [e.target.name]: e.target.value
        })
    }

    const closeModal = () => {
        setOpen(false)
    }

    const deleteAns = async (ans) => {
        const res = await AnswerService.deleteAnswer(ans.id)
        getAnswers()
    }
    
    const edition = async () => {
        const res = await AnswerService.editAnswer(editA.id, {label: editA.label})
        getAnswers()
    }


    return (
        <div>
            <Modal
            show={open}
            onClose={closeModal}
            >
                <form>
                    <TextField
                        label="Nueva Respuesta"
                        margin="normal"
                        variant="filled"
                        name="label"
                        value={editA.label}
                        onChange={handleChange}
                    />
                </form>
                <Button variant='contained' color='primary'onClick={edition}>Editar</Button>
            </Modal>
            <TableRow>
                {answers.answers.map((a) => {
                    return (
                        <>
                        <div style={{ display:'flex', textAlign:'center', alignContent: 'center', alignItems: 'center', flexDirection:'column', border: '1px solid black' }}>
                            <span style={{margin: 5}}>{a.label}</span>
                            <Button color='error' style={{margin: 5}} onClick={() => deleteAns(a)} variant='contained'>Borrar respuesta</Button>
                            <Button color='primary' style={{margin: 5}} variant='contained'onClick={() => openModal(a)}>Editar respuesta</Button>
                        </div>
                        </>
                    )
                })}
            </TableRow>
        </div>
    )
}

export default QuestionAnswer
