import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import OrganizationService from "./../Services/OrganizationService";
import { toast } from "react-toastify";
import Menu from './../Component/Menu'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  child: {
    width: "60%",
  },
}));
const NewOrganization = (props) => {
  const [organization_name, setUser] = React.useState("");
  const [organization_id, setId] = React.useState("");
 const id= props.match.params.Auth_id
 const classes = useStyles();
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Menu/>
        <h1>Add organization</h1>
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
              .addorganization(id,{ organization_name,organization_id})
              .then((data) => {
                console.log(data);
                props.history.push("/Organization/"+id);
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message, {
                  position: toast.POSITION.TOP_LEF});
             
              });
          }}
        >
          Add New
        </Button>
      </Grid>
    </Grid>
    </div>
    </div>
  );
};

export default NewOrganization