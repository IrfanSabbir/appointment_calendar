import React, { useState } from 'react'
import {  Grid , Paper, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { monthList, yearList } from './dataConfig'
import { useHistory, useParams } from 'react-router'
import Modal from './Modal'
import DropDown from './DropDown'
import { connect } from 'react-redux'
import AddAppointment from './AddAppointment'
import DetailsAppointment from './DetailsApppointment'
import * as actions from '../store/actions/index'
import moment from 'moment'

const useStyle = makeStyles({
    Paper:{
        height:"130px",
        border:"2px solid grey",
        padding: "10px",
        textAlign:"center",
        overflow:"auto"
    },
    AapointmentCard:{
        textAlign:"left",
        fontSize:"15px",
        padding:"10px",
        margin:"5px",
        background:"#E9E8E4",
        cursor: "pointer",
    },
    
})

const AppointmentGrid = (props) =>{
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [inputType, setInputType] = useState(false);
    const history = useHistory()
    const [item, setItems] = useState()
    const { year_no, month_no }  = useParams();

    const handleClose = () => {
        setOpen(false)
        setTitle("")
        setInputType(false)
        setItems({})
    };

    const classes = useStyle()
    const totalGrid = []
    if(props.totalDays > 0){
        for(let i = 0; i< props.totalDays; i++){
            totalGrid.push(
            <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                <Paper className={classes.Paper}>
                    <Typography variant="body2" color="primary">{moment(`${year_no}-${month_no}-${i+1}`).format("YYYY-MM-DD")}</Typography>
                    <hr/>
                    {props.appointment[i]?.length > 0 &&  props.appointment[i].map(app =>{
                        return(
                        <Paper key={app.id} className={classes.AapointmentCard}
                            onClick={()=> {
                                setItems(app);
                                setOpen(true);
                                setTitle("Appointment Details");
                                setInputType(false)
                            }}
                        >
                            <Typography>{app.name}</Typography>
                        </Paper>
                        )
                    }) }
                </Paper>
            </Grid>
            )
        }
    } 

    const monthHandler = (e)=>{
        history.push(`/year/${year_no}/month/${e.target.value}`)
    }
    const yearHandler = (e)=>{
        history.push(`/year/${e.target.value}/month/${month_no}`)
    }
    
    return(
        <div>
            <Modal
                open={open} 
                handleClose={handleClose}
                title={title}
            >
                {inputType ? 
                <AddAppointment days={props.totalDays}/> : 
                <DetailsAppointment appointment ={item}/>}
            </Modal>
            <Grid container>
                <Grid item xs={6} sm={3} md={3} lg={2}  style={{textAlign:"left"}}>
                    <DropDown
                        handleChange={yearHandler} 
                        name={"Year Select"} 
                        items={yearList}
                        data={props.year}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3}  style={{textAlign:"left"}}>
                    <DropDown 
                        handleChange={monthHandler} 
                        name={"Month Select"} 
                        items={monthList}
                        month={true}
                        data={props.month?.month}
                    />
                </Grid>  
                <Grid item xs={12} sm={6} md={6} lg={7} style={{textAlign:"right"}}>
                    <Button variant="outlined" color="primary" size="large"
                    onClick={()=>{
                        setOpen(true);
                        setTitle("Create Doctor Appointment");
                        setInputType(true)
                    }}>
                        Create Appointment
                    </Button>
                </Grid> 
            </Grid>   
            <Grid container spacing={0}>
               {totalGrid}
            </Grid>
            
        </div>
    )
}



const mapStateToProps = state => {
    return{
      appointment: state.appoimentResult.appointment
    }
}
const mapDispatchToProps = dispatch => {
    return{
      onLoadAppointment: (year, month, days)=> dispatch(actions.loadAppointment(year, month, days))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentGrid);