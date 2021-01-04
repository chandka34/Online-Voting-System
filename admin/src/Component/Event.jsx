import React from "react";
import SingleEvent from "./SingleEvent";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EventService from "./../Services/EventService";
import NewEvent from './../Component/NewEvent'
import Menu from './../Component/Menu'
import Popup from "./../Component/popup";
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

const Events = (props) => {
  const [Events, setEvents] = React.useState([]);
 
  const classes = useStyles();
  const getData = () => {
    EventService
      .getEvent()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Events Component");
  const handleNewEventClick = () => {
    console.log(props);
    props.history.push("/Event/New");
  };
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Events</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewEventClick}
      >
        <AddIcon />
      </Fab>
      {Events.length == 0 ? (
        <p>There are no Events</p>
      ) : (
        <Grid container spacing={3}>
          {Events.map((Event, index) => (
            <SingleEvent key={index} Event={Event} onDelete={getData} />
          ))}
        </Grid>
      )}
     
      </div>
    </div>
  );
};

export default Events;


