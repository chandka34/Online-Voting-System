import React from "react";
import { Grid, Button } from "@material-ui/core";
import feedbackService from "./../Services/Feedback";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const Singlefeedback = (props) => {
  const { Feedback, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={12}>
    <Menu/>
      <h2>
        {Feedback.feedback} {" "}
     
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            feedbackService
              .deletefeedback(Feedback._id)
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

      <hr />
    </Grid>
  );
};

export default withRouter(Singlefeedback);