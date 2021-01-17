import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import PostService from "./../Services/PostService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
import 'date-fns'
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers'
import { makeStyles } from "@material-ui/core/styles";
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
const NewElection = (props) => {
  const [name, setUser] = React.useState("");
  const [SDate, setDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const id = props.match.params.id;
  const Auth_id = props.match.params.Auth_id;

  const classes = useStyles();
    
  const handleDateChange = (date)=> {
    setDate(date)
  }
  const handleEndDateChange = (date)=> {
    setEndDate(date)
  }

  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Add Post</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
         
          value={name}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}></Grid>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker 
        value={SDate} onChange={handleDateChange} 
        label="Start Date"/>
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
            PostService
              .addPost(id,Auth_id,{name,SDate,EndDate})
              .then((data) => {
                console.log(data);
                props.history.push("/Post/"+id+"/"+Auth_id);
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
    </div>
    </div>
  );
};

export default NewElection