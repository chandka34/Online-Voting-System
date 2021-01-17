import React from "react";
import SinglePost from "./SinglePost";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PostService from "./../Services/PostService";
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

const Posts = (props) => {
  const [Posts, setPosts] = React.useState([]);
  const id = props.match.params.id;
  const Auth_id = props.match.params.Auth_id;

  const classes = useStyles();
  const getData = () => {
    PostService
      .getPosts(id,Auth_id)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getData, []);
  // console.log("Inside Posts Component");
  const handleNewPostClick = () => {
    console.log(props);
    props.history.push("/Post/New/"+id+"/"+Auth_id);
  };
  return (
    <div className={classes.container}>
    <div className={classes.child}>
    <Menu/>
      <h1>Posts</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewPostClick}
      >
        <AddIcon />
      </Fab>
      {Posts.length == 0 ? (
        <p>There are no Posts</p>
      ) : (
        <Grid container spacing={3}>
          {Posts.map((Post, index) => (
            <SinglePost key={index} Post={Post} onDelete={getData} />
          ))}
        </Grid>
      )}
      </div>
    </div>
  );
};

export default Posts;