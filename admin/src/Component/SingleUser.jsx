import React from "react";
import { Grid } from "@material-ui/core";
const SingleUser = ({ User }) => {
  return (
    <Grid item xs={6}>
      <h2>First Name:  {User.First_name}</h2>
      <p>Last Name:   {User.Last_name}</p>
      <p>Email:  {User.email}</p>
      <p>Contact:  {User.phone_no}</p>
      <p>Organization: {User.organization.organization_name}</p>
      <p>Department:  {User.department.department_name}</p>
      <p>Role:   {User.role}</p>
      <hr />
    </Grid>
  );
};

export default SingleUser;