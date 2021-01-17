import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventService from "./../Services/EventService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
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
    width: "80%",
  },
}));
const UpdateEvent = (props) => {
    const [name, setName] = React.useState("");
    const [SDate, setSDate] = React.useState(new Date());
    const [EndDate, setEndDate] = React.useState(new Date());
    const classes = useStyles();
  const id = props.match.params.id;
  const Auth_id = props.match.params.Auth_id;

  const handleDateChange = (date)=> {
    setSDate(date)
  }
  const handleEndDateChange = (date)=> {
    setEndDate(date)
  }

  return (
  
    <div className={classes.container}>
    <div className={classes.child}>
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu />
        <h1>Update Event</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}></Grid>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker 
        value={SDate} onChange={handleDateChange} 
        label="Start Date"/>{ ' ' }
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}></Grid>
        <DateTimePicker 
        value={EndDate} onChange={handleEndDateChange} 
        label="End Date"/>
        </MuiPickersUtilsProvider>{ "" }
      </Grid>
      
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            EventService
              .updateEvent(id,Auth_id,{name,SDate,EndDate})
              .then((data) => {
                console.log(data);
                props.history.push("/Event/1");
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message, {
                  position: toast.POSITION.TOP_LEF});
              });
          }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
 </div>
 </div>
  );
};

export default UpdateEvent;