import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "80%",
    height:"50px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  return (
    <div>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlineddropdown">{props.name}</InputLabel>
        <Select
          native
          value={props.data}
          onChange={props.handleChange}
          label={props.name}
          
          inputProps={{
            name: `${props.name}`,
            id: 'outlineddropdown',
            style: {padding : '10px'}
          }}
        >
          <option aria-label="None" value="" />
          {props.month ? props.items.map( (item) =>{
                return(
                    <option key={item.month} value={item.month}>
                     {item.name} 
                    </option>
                )
            }) :
            props.items.map( (item) =>{
                return(
                    <option key={item} value={item}>{item}</option>
                )
            }) 
            }
        </Select>
      </FormControl>
    </div>
  );
}
