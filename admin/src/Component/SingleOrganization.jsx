import React from "react";
import { Grid, Button } from "@material-ui/core";
import OrganizationService from "./../Services/OrganizationService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const SingleOrganization = (props) => {
  const { Organization, onDelete, history } = props;
  const Auth_id=1;
  console.log(props);
  return (
    <Grid item xs={12}>
    <Menu/>
      <h2>
        {Organization.organization_name} {"         "}
       </h2>
       <p> {Organization.organization_id} {" "}</p>
       
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            OrganizationService
              .deleteorganization(Organization._id,Auth_id)
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
        color="primary"
        onClick={(e) => {
         
          history.push("/Department/" + Organization._id+"/"+Auth_id);
        }}

      >
        view Departments
      </Button>{" "}

      <Button
      variant="contained"
      color="primary"
      onClick={(e) => {
       
        history.push("/Candidates/" + Organization._id+"/"+Auth_id);
      }}

    >
      Veiw All Candidates
    </Button>{" "}

    <Button
    variant="contained"
    color="primary"
    onClick={(e) => {
     
      history.push("/Post/"+ Organization._id+"/"+Auth_id);
    }}

  >
    Posts
  </Button>{" "}

      
      <hr />
    </Grid>
  );
};

export default withRouter(SingleOrganization);