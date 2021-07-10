import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import { useParams } from 'react-router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "300px",
    height:"50px",
  },
}));

const AppointmentForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const { year_no, month_no }  = useParams();

  const onSubmit = data => {
    console.log(data);
    const other = {year: year_no, month: month_no , days : props.days}
    // console.log(other)
    props.onAddAppointment(data, other)
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Name is required' }}
      />
      <Controller
        name="gender"
        control={control}
        defaultValue=""        
        render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlineddropdown">Select Gender</InputLabel>
            <Select
                variant="outlined"
                native
                onChange={onChange}
                label="Gender"
                // helperText={error ? error.message : null}
                error={!!error}
                value={value}
            >
                <option aria-label="None" value="" />
                <option value="Male"> Male</option>
                <option value="Female"> Female</option>
            </Select>
        </FormControl>    
        )}
        rules={{ required: 'Gender is required required' }}
      />
      <Controller
        name="age"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Age"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="number"
          />
        )}
        rules={{ required: 'Email required' }}
      />
      <Controller
        name="date"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
            label="Date"
            type="date"
            value={value}
            onChange={onChange}
            error={!!error}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        rules={{ required: 'Date is required' }}
      />
      <Controller
        name="Time"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
            label="Time"
            type="time"
            value={value}
            onChange={onChange}
            error={!!error}
            InputLabelProps={{
              shrink: true,
            }}
            // inputProps={{
            //     step: 300, // 5 min
            //     }}
          />
        )}
        rules={{ required: 'Please select Time' }}
      />

    <Button type="submit" variant="contained" color="primary">
        Create Appointment
    </Button>
    </form>
  );
};

const mapDispatchToProps = dispatch =>{
    return{
        onAddAppointment: (data, other) => dispatch(actions.addAppointment(data, other))
    }
}
export default connect(null, mapDispatchToProps)(AppointmentForm);
