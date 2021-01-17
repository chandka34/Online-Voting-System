import React from "react";
import SingleOrganization from "./SingleOrganization";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import OrganizationService from "./../Services/OrganizationService";
import NewOrganization from './../Component/NewOrganization'; 
import Menu from './../Component/Menu'

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

const Organizations = (props) => {
  const [Organizations, setOrganizations] = React.useState([]);
 const Auth_id=1;
  const classes = useStyles();
  const getData = () => {
    OrganizationService
      .getorganizations(Auth_id)
      .then((data) => {
        setOrganizations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Organizations Component");
  const handleNewOrganizationClick = () => {
    console.log(props);
    props.history.push("/Organization/New/"+Auth_id);
  };
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Organizations</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewOrganizationClick}
      >
        <AddIcon />
      </Fab>
      {Organizations.length == 0 ? (
        <p>There are no Organizations</p>
      ) : (
        <Grid container spacing={3}>
          {Organizations.map((Organization, index) => (
            <SingleOrganization key={index} Organization={Organization} onDelete={getData} />
          ))}
        </Grid>
      )}
      
      </div>
    </div>
  );
};

export default Organizations;