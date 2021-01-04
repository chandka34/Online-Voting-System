import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import DepartmentService from "./../Services/DepartmentService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const NewDepartment = (props) => {
  const [department_name, setDepartment] = React.useState("");
  const [department_id, setId] = React.useState("");

  const id = props.match.params.id;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Add department</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          value={department_name}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
        <TextField
          label="Id"
          fullWidth
          value={department_id}
          onChange={(e) => {
            setId(e.target.value);
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
            DepartmentService
              .adddepartment(id,{ department_name,department_id})
              .then((data) => {
                console.log(data);
                props.history.push("/Department/" +id);
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

export default NewDepartment