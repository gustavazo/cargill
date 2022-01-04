import React, { useEffect, useState } from 'react'
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

const QuestionAnswer = (props) => {
    console.log(props, 'respuestasbro')
    return (
        <div>
            {props.questionSelected.answers.map((a) => {
                return (<TableRow>
                    <TableCell>hola</TableCell>
                </TableRow>)
            })}
        </div>
    )
}

export default QuestionAnswer
