import React from "react";
import { Grid, Button } from "@material-ui/core";
import DepartmentService from "./../Services/DepartmentService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const SingleDepartment = (props) => {
  const { Department, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={12}>
    <Menu/>
      <h2>
        {Department.department_name} {" "}
       
        
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            DepartmentService
              .deletedepartment(Department._id)
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
        </Button>{" "}
        <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          history.push("/Candidates/"+ Department.organization_id+"/"+ Department._id);
          console.log({message:Department._id})
        }}

      >
        view Candidates
      </Button>
        
      </h2>
    
      <p> {Department.department_id} {" "}</p>
      <hr />
    </Grid>
  );
};

export default withRouter(SingleDepartment);