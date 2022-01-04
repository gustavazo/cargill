import React, { useEffect, useState } from 'react'
import QuizService from '../../services/QuizService'
import {
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    IconButton,
    Button
} from "@material-ui/core";
import QuestionAnswer from './questionAnswer';

const Edition = (props) => {
    const [questionSelected, setQuestionSelected] = useState(null)

    const onRowClick = (q) => {
        setQuestionSelected(q)
    }
    
    return (

        <div>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Questions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.record.questions.map((q) => (
                            <>
                                <TableRow>
                                    <TableCell>
                                        <div>
                                            <div>{q.statement}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell><Button variant="text" onClick={() => onRowClick(q)}>Answer</Button></TableCell>
                                    
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
