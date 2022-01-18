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
import { useNotify } from 'react-admin';


const QuestionAnswer = (props) => {
    const notify = useNotify();
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
        notify('La consigna ha sido borrada')
    }
    
    const edition = async () => {
        const res = await AnswerService.editAnswer(editA.id, {label: editA.label})
        getAnswers()
        closeModal()
        notify('La consigna ha sido editada')
    }


    return (
        <div>
            <Modal
            show={open}
            onClose={closeModal}
            >
                <div style={{display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 20, padding: 10}}>Editar Consigna</div>
                <form style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField
                        label="Consigna"
                        margin="normal"
                        variant="filled"
                        name="label"
                        value={editA.label}
                        onChange={handleChange}
                    />
                </form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button variant='contained' color='primary'onClick={edition}>Editar</Button>
                </div>
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
                                <Button color='primary' style={{margin: 5, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}} variant='contained'onClick={() => openModal(a)}><EditIcon style={{fontSize: 20}}/></Button>
                                <Button color='error' style={{margin: 5, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}} onClick={() => deleteAns(a)} variant='contained'><DeleteIcon style={{fontSize: 20}}/></Button>
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
