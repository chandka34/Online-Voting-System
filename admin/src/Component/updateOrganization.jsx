import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OrganizationService from "./../Services/OrganizationService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
const UpdateOrganization = (props) => {
    const [organization_name, setUser] = React.useState("");
    const [organization_id, setId] = React.useState("");
  const id = props.match.params.id;
  React.useEffect(() => {
    OrganizationService.getSingleOrganization(id).then((data) => {
      setUser(data.organization_name);
      setId(data.organization_id);
    });
  }, []);
  return (
  
    
   
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Update Organization</h1>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          value={organization_name}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <TextField
          label="Id"
          fullWidth
          value={organization_id}
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
            OrganizationService
              .updateorganization(id, { organization_name,organization_id })
              .then((data) => {
                console.log(data);
                props.history.push("/Organization");
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

export default UpdateOrganization;