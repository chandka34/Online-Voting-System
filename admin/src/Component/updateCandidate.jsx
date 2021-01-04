import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CandidateService from "./../Services/CandidateService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'

const UpdateCandidate = (props) => {
  const [user, setUser] = React.useState("");
  const [post, setPost] = React.useState(0);
  const id = props.match.params.id;
  React.useEffect(() => {
    CandidateService.getSingleCandidate(id).then((data) => {
      setUser(data.user);
      setPost(data.post);
    });
  }, []);
  return (
  
    
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Update Candidate</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="User Email"
          fullWidth
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <TextField
          label="post"
          fullWidth
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
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
            CandidateService
              .updateCandidate(id, { user, post })
              .then((data) => {
                console.log(data);
                props.history.push("/Candidates/Update");
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

export default UpdateCandidate;