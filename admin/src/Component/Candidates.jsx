import React from "react";
import SingleCandidate from "./SingleCandidate";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CandidateService from "./../Services/CandidateService";
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

const Candidates = (props) => {
  const [Candidates, setCandidates] = React.useState([]);
  
  const id = props.match.params.id;
  const org_id = props.match.params.org_id;
  const dep_id = props.match.params.dep_id
  console.log({message: props})
  const classes = useStyles();
  const getData = () => {
    CandidateService
      .getCandidates(org_id,dep_id)
      
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
  const handleNewCandidateClick = () => {
    console.log(props);
    props.history.push("/Candidates/New/"+ org_id+"/"+ dep_id);
  };
  return (
    
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Candidates</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewCandidateClick}
      >
        <AddIcon />
      </Fab>
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