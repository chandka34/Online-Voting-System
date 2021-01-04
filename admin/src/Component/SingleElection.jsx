import React from "react";
import { Grid, Button } from "@material-ui/core";
import ElectionService from "./../Services/ElectionService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const SingleElection = (props) => {
  const { Election, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={12}>
    <Menu/>
      <h2>
        {Election.name} {" "}
      
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            ElectionService
              .deleteElection(Election._id)
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

export default withRouter(SingleElection);