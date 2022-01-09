import React, { useEffect, useState } from 'react'
import {
    TableRow,
    TableCell,
    Switch
} from "@material-ui/core";

const QuestionAnswer = (props) => {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <div>
            {props.questionSelected.answers.map((a) => {
                return (<TableRow>
                    <TableCell>{a.label}</TableCell>
                    <TableCell><Switch {...label} /></TableCell>
                </TableRow>)
            })}
        </div>
    )
}

export default QuestionAnswer
