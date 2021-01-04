import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventService from "./../Services/EventService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const UpdateEvent = (props) => {
    const [name, setName] = React.useState("");
  const [Date, setDate] = React.useState("");
  const [Time, setTime] = React.useState();
  const id = props.match.params.id;
  React.useEffect(() => {
    EventService.getSingleEvent(id).then((data) => {
      setName(data.name);
      setDate(data.Date);
      setTime(data.Time);
    });
  }, []);
  return (
  
    
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu />
        <h1>Update Event</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Date"
          fullWidth
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          label="Time"
          fullWidth
          value={Time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
      </Grid>
      
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            EventService
              .updateEvent(id, { name,Date,Time })
              .then((data) => {
                console.log(data);
                props.history.push("/Event");
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.response.data, {
                  position: toast.POSITION.TOP_LEF});
              });
          }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
 
  );
};

export default UpdateEvent;