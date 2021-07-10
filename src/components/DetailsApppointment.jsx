import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
const useStyle = makeStyles({
    Paper:{
        padding: "20px",
        textAlign:"left",
    }
})
const Details = (props) =>{
    const classes = useStyle()
    return(
        <Container>
            <Paper className={classes.Paper}>
                <Typography>Name: <b>{props.appointment.name}</b></Typography>
                <Typography>Age: <b>{props.appointment.age}</b></Typography>
                <Typography>Gender: <b>{props.appointment.gender}</b></Typography>
                <Typography>Date: <b>{props.appointment.date}</b></Typography>
                <Typography>Time: <b>{props.appointment.Time}</b></Typography>
            </Paper>
        </Container>
    )
}

export default Details