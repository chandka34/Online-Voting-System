import React from "react";
import { Grid, Button } from "@material-ui/core";
import EventService from "./../Services/EventService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const SingleEvent = (props) => {
  const { Event, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={12}>
    <Menu/>
      <h2>
        {Event.name} {" "}
        <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          console.log("navigate to update");
          history.push("/Event/Update/" + Event._id);
        }}
      >
        Edit
      </Button>{" "}
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            EventService
              .deleteEvent(Event._id)
              .then((data) => {
                console.log(data);
                onDelete();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Delete
        </Button>
      </h2>
      <p> {Event.SDate} {" "}</p>
      <p> {Event.EndDate} {" "}</p>

      <hr />
    </Grid>
  );
};

export default withRouter(SingleEvent);