import React from "react";
import SingleCandidate from "./SingleCandidate";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CandidateService from "../Services/CandidateService";
import Menu from './Menu'
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

const Candidates = (props) => {
  const [Candidates, setCandidates] = React.useState([]);
  
  
  const org_id = props.match.params.org_id;
  const Auth_id = props.match.params.Auth_id;

 
  const classes = useStyles();
  const getData = () => {
    CandidateService
      .getAllCandidates(org_id,Auth_id)
      .then((data) => {
        setCandidates(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Candidates Component");
  
  return (
    
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Candidates</h1>
     
      {Candidates.length == 0 ? (
        <p>There are no Candidates</p>
      ) : (
        <Grid container spacing={3}>
          {Candidates.map((Candidate, index) => (
            <SingleCandidate key={index} Candidate={Candidate} onDelete={getData} />
          ))}
        </Grid>
      )}
      </div>
    </div>
  );
};

export default Candidates;