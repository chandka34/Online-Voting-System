import React from "react";
import Singlefeedback from "./Singlefeedback";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import feedbackService from "./../Services/Feedback";
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

const Feedback = (props) => {
  const [Feedback, setfeedbacks] = React.useState([]);
  const classes = useStyles();
  const getData = () => { 
      feedbackService
      .getfeedback(1)
      .then((data) => {
        setfeedbacks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside feedbacks Component");
  
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>feedbacks</h1>
      
      {Feedback.length == 0 ? (
        <p>There is no feedback from any user</p>
      ) : (
        <Grid container spacing={3}>
          {Feedback.map((Feedback, index) => (
            <Singlefeedback key={index} Feedback={Feedback} onDelete={getData} />
          ))}
        </Grid>
      )}
      </div>
    </div>
  );
};

export default Feedback;