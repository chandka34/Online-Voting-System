import React from "react";
import { Grid, Button } from "@material-ui/core";
import CandidateService from "./../Services/CandidateService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

import Menu from './../Component/Menu'
const SingleCandidate = (props) => {
  const { Candidate, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={6}>
    <Menu/>
      <h2>
        {Candidate.Name} {" "}
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            CandidateService
              .deleteCandidate(Candidate._id)
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
     
      <p>{Candidate.email}</p>
      <p>{Candidate.phone_no}</p>
      <p>{Candidate.organization}</p>
      <p>{Candidate.department}</p>

      <p>{Candidate.post.name}</p>
      <hr />
    </Grid>
  );
};

export default withRouter(SingleCandidate);