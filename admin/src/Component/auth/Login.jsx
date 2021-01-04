import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import userService from "../../Services/userSrvice";
import { toast } from "react-toastify";
import admin from './admin'

import background from '../../Component/ballot-vote.jpg';
const useStyles = makeStyles((theme) => ({
 
  container: {
    backgroundImage:`url(${background})`,
    backgroundRepeat: 'no-repeat',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  child: {
    width: "30%",
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const [username, setusername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className={classes.container}>
      <div className={classes.child}>
      <paper >
      <h1>Login</h1>
        <TextField
          label="Username"
         
          fullWidth
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />{" "}
        <br />
        <TextField
          label="password"
          
          type='password'
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />{" "}
        <br />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={(e) => {
            userService
              .login(username, password) 
              .then((data) => {
                console.log(data);
                window.location.href = "/Home";
              })
              .catch((err) => {
                
                console.log(err);
                toast.error(err.response.data.message, {
                  position: toast.POSITION.TOP_LEF});
              });
          }}
        >
          Login
        </Button>
        </paper>
      </div>
    </div>
  );
};

export default Login;