import {
    ADD_APPOINTMENT,
    LOAD_APPOINTMENT
  } from '../actions/actionTypes';
  
  const initialState = {
    appointment: [],
  };
  
const appointment =  (state= initialState, { type, payload }) => {
    switch (type) {
      case LOAD_APPOINTMENT: return { ...state, appointment: payload };
      case ADD_APPOINTMENT: return { ...state , appointment: [...state.appointment, payload] };
      default: return state;
    }
  }
export default appointment  