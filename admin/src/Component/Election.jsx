import React from "react";
import SingleElection from "./SingleElection";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ElectionService from "./../Services/ElectionService";
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

const Elections = (props) => {
  const [Elections, setElections] = React.useState([]);
  const classes = useStyles();
  const getData = () => {
    ElectionService
      .getElections()
      .then((data) => {
        setElections(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Elections Component");
  const handleNewElectionClick = () => {
    console.log(props);
    props.history.push("/Election/Create");
  };
  return (
    <div className={classes.container}>
    <div className={classes.child}>
  
      <h1>Elections</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewElectionClick}
      >
        <AddIcon />
      </Fab>
      {Elections.length == 0 ? (
        <p>There are no Elections</p>
      ) : (
        <Grid container spacing={3}>
          {Elections.map((Election, index) => (
            <SingleElection key={index} Election={Election} onDelete={getData} />
          ))}
        </Grid>
      )}
      </div>
    </div>
  );
};

export default Elections;