import React from "react";
import { Grid } from "@material-ui/core";
const SingleUser = ({ User }) => {
  return (
    <Grid item xs={2}>
      <h2>{User.First_name}</h2>
      <p>{User.Last_name}</p>
      <p>{User.email}</p>
      <p>{User.phone_no}</p>
      <p>{User.organization.organization_id}</p>
      <p>{User.department.department_id}</p>
      <p>{User.role}</p>
      <hr />
    </Grid>
  );
};

export default SingleUser;