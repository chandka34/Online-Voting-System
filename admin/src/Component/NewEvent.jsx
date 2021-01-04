import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import EventService from "./../Services/EventService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
import { makeStyles } from "@material-ui/core/styles";
import 'date-fns'
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  child: {
    width: "60%",
  },
}));
const NewEvent = (props) => {
  const [name, setUser] = React.useState("");
  const [SDate, setDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const handleDateChange = (date)=> {
    setDate(date)
  }
  const handleEndDateChange = (date)=> {
    setEndDate(date)
  }

  
  return (
   
    
    <Grid container spacing={12}>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Add organization</h1>
      </Grid>
        <TextField
          label="Name"
        
          value={name}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker 
        value={SDate} onChange={handleDateChange} 
        label="Start Date"/>
        <DateTimePicker 
        value={EndDate} onChange={handleEndDateChange} 
        label="End Date"/>
        </MuiPickersUtilsProvider>{ "" }
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
        <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          EventService
            .addEvent({ name,SDate,EndDate})
            .then((data) => {
              console.log(data);
              props.history.push("/Event/");
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data, {
                position: toast.POSITION.TOP_LEF});
           
            });
        }}
      >
        Add New
      </Button>
      </Grid>
      </Grid>
    </Grid>
  
  );
};

export default NewEvent