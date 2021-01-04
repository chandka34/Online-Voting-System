import React from "react";
import { Grid, Button } from "@material-ui/core";
import PostService from "./../Services/PostService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

const SinglePost = (props) => {
  const { Post, onDelete, history } = props;
  const auth=1;
  console.log(props);
  return (
    <Grid item xs={12}>
      <h2>
        {Post.name} {" "}
      
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            history.push("/Result/"+Post.organization_id+"/"+Post._id+"/"+auth);
           
          }}       >
          View Results
        </Button>
      </h2>
      
      <hr />
    </Grid>
  );
};

export default withRouter(SinglePost);