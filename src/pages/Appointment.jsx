import React, {useEffect, useState} from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useParams } from 'react-router'
import moment from 'moment'
import AppointmentGrid from '..//components/AppointmentGrid'
import { monthList } from '../components/dataConfig'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

const useStyle = makeStyles({
    Typography:{
        textAlign:"center",
        fontSize: "25px",
        fontWeight:"bold",
        color:"#ff6347"
    },
})

const Appointment = (props) =>{
    const [days, setDays] = useState()
    const [month, setMonth] = useState()
    const { year_no, month_no }  = useParams();
    const classes = useStyle()
    useEffect(() => {
        const days = moment(`${year_no}-${month_no}`, "YYYY-MM").daysInMonth();
        monthList.map(item =>{
            if(+item.month === +month_no ) {
                setMonth(item)
            }
            return;
        })
        props.onLoadAppointment(year_no, month_no, days)
        setDays(days) 
    },[year_no,month_no ])
    return(
        <Container>
            <Typography className={classes.Typography}>Doctor appointment calendar</Typography>
            <AppointmentGrid totalDays={days} month={month} year={year_no}/>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return{
      onLoadAppointment: (year, month, days)=> dispatch(actions.loadAppointment(year, month, days))
    }
}
export default connect(null,mapDispatchToProps )(Appointment)