import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import ElectionService from "./../Services/ElectionService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const NewElection = (props) => {
  const [name, setUser] = React.useState("");
 
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
            ElectionService
              .addElection({ name})
              .then((data) => {
                console.log(data);
                props.history.push("/Election");
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