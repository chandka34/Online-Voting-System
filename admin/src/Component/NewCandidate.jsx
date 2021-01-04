import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import CandidateService from "./../Services/CandidateService";
import { makeStyles } from "@material-ui/core/styles";
import Menu from './../Component/Menu'
const NewCandidate = (props) => {
  const [Name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone_no, setPhone] = React.useState("");
  const [post, setPost] = React.useState("");
  const [Symbol, setSymbol] = React.useState("");
  
  const dep_id = props.match.params.dep_id;
  const org_id =props.match.params.org_id;



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
      width: "70%",
    },
  }));
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={12} className={classes.child}>
      <Menu/>
       
      </Grid>
     

      <Grid item xs={3}></Grid>
      <Grid item xs={6}>   
      <h1>Add New Candidate</h1>
      <TextField
          label="Name"
          fullWidth
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
        label="Phone No."
        fullWidth
        value={phone_no}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
        <TextField
          label="User Email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="post"
          fullWidth
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
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
            CandidateService
              .addCandidate(org_id,dep_id,{ Name,phone_no,email,post})
              .then((data) => {
                console.log(data);
                props.history.push("/Candidates/"+org_id+"/"+dep_id);
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
  );
};

export default NewCandidate