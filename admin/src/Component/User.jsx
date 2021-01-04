
  
import React from "react";
import SingleUser from "./SingleUser";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
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
    width: "80%",
  },
}));

const User = () => {
  const [User, setUser] = React.useState([]);
  const classes = useStyles();
  const getData = () => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  console.log("Inside User Component");
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Users</h1>
    
      {User.length == 0 ? (
        <p>There are no Users</p>
      ) : (
        <Grid container spacing={3}>
          {User.map((User, index) => (
            <SingleUser key={index} User={User} />
          ))}
        </Grid>
      )}
    </div>
    </div>
  );
};

export default User;

