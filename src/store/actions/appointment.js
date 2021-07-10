import {
    LOAD_APPOINTMENT
  } from './actionTypes';
  import db from '../../db';
  import moment from 'moment';

  export const loadAppointment = (year, month, days) => {
    // let date = moment(`${year}-${month}`).format("YYYY-MM")  
    return (dispatch) => {
      db.table('appointment')
        .toArray()
        .then((appointment) => {
          const data = apointmentByDate(appointment, year, month, days)
          dispatch({
            type: LOAD_APPOINTMENT,
            payload: data,
          });
        });
    };
  }
  
  export const addAppointment = (inputdata , other) => {
    return async (dispatch) => {
      const apointmentData = { ...inputdata };
      const result = await db.table('appointment')
                              .add(apointmentData)
      
      const {year, month, days } = other;
      db.table('appointment')
      .toArray()
      .then((appointment) => {
        const data = apointmentByDate(appointment, year, month, days)
        dispatch({
          type: LOAD_APPOINTMENT,
          payload: data,
        });
      });
    }
  }

const apointmentByDate = (appointment, year, month, days) =>{
  let data = [];
  for(let i =1; i<=days ; i++){
    let current = moment(`${year}-${month}-${i}`).format("YYYY-MM-DD")
    let temp =[]; 
    for(let j=0; j<appointment.length; j++ ){
        if(appointment[j].date.includes(current)){
        temp.push(appointment[j])
        }
    }
    let newArray = [];
    newArray = temp.sort((a, b) =>{
      return a.Time.localeCompare(b.Time);
    })
    data.push(newArray)
  }
  return data
}
// let data = [];
          // for(let i =1; i<=days ; i++){
          //   let current = moment(`${year}-${month}-${i}`).format("YYYY-MM-DD")
          //   let temp =[]; 
          //   for(let j=0; j<appointment.length; j++ ){
          //       if(appointment[j].date.includes(current)){
          //       temp.push(appointment[j])
          //       }
          //   }
          //   let newArray = [];
          //   console.log("hello 1")
          //   newArray = temp.sort((a, b) =>{
          //     return a.Time.localeCompare(b.Time);
          //   })
          //    data.push(newArray)
          //    console.log(newArray)
          //   }

