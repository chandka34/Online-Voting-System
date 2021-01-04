import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import PostService from "./../Services/PostService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const NewElection = (props) => {
  const [name, setUser] = React.useState("");
  const id = props.match.params.id;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Add Election</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setUser(e.target.value);
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
            PostService
              .addPost(id,{name})
              .then((data) => {
                console.log(data);
                props.history.push("/Post/"+id);
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
  );
};

export default NewElection