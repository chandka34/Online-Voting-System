import React from "react";
import SingleDepartment from "./Singledepartment";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DepartmentService from "./../Services/DepartmentService";
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

const Departments = (props) => {
  const [Departments, setDepartments] = React.useState([]);
  const [openPopup, setOpenPopup] = React.useState(false)
  const id = props.match.params.id;
  console.log({message:id})
  const classes = useStyles();
  const getData = () => {
    DepartmentService
      .getdepartments(id)
      .then((data) => {
        setDepartments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Departments Component");
  const handleNewDepartmentClick = () => {
    console.log(props);
    props.history.push("/Department/New/" +id);
  };
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Departments</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewDepartmentClick}
      >
        <AddIcon />
      </Fab>
      {Departments.length == 0 ? (
        <p>There are no Departments</p>
      ) : (
        <Grid container spacing={3}>
          {Departments.map((Department, index) => (
            <SingleDepartment key={index} Department={Department} onDelete={getData} />
          ))}
        </Grid>
      )}
      </div>
    </div>
  );
};

export default Departments;