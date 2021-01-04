import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DepartmentService from "./../Services/DepartmentService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const UpdateDepartment = (props) => {
    const [department_name, setUser] = React.useState("");
    const [department_id, setId] = React.useState("");
  const id = props.match.params.id;
  React.useEffect(() => {
    DepartmentService.getSingleDepartment(id).then((data) => {
      setUser(data.department_name);
      setId(data.department_id);
    });
  }, []);
  return (
  
    
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Update Department</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          value={department_name}
          onChange={(e) => {
            setUser(e.target.value);
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
              .updatedepartment(id, { department_name,department_id })
              .then((data) => {
                console.log(data);
                props.history.push("/Department");
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

export default UpdateDepartment;