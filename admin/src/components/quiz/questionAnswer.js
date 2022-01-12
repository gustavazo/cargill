import React, { useEffect, useState } from 'react'
import {
    TableRow,
    TextField
} from "@material-ui/core";
import AnswerService from '../../services/AnswerService';
import Modal from "simple-react-modal";
import QuestionService from '../../services/QuestionService';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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
            <div>
                {answers.answers.map((a) => {
                    return (
                        <>
                        <div style={{ display:'flex', alignItems: 'center', justifyContent:'space-between', flexDirection: 'row' }}>
                            <div>
                                <span style={{margin: 5}}>{a.label}</span>
                            </div>
                            <div>
                                <Button color='primary' style={{margin: 5}} variant='contained'onClick={() => openModal(a)}><EditIcon/></Button>
                                <Button color='error' style={{margin: 5}} onClick={() => deleteAns(a)} variant='contained'><DeleteIcon/></Button>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionAnswer
