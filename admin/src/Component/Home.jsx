import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from './../Component/Menu'
const useStyles = makeStyles({
  
  
 
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 20,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    
  },
  child: {
    width: "20%",
    

  },
  card:{
    color:'primary'
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (

    <div className={classes.container}>
       <div className={classes.child}>
       <Menu/>
       <Card className={classes.pos} style={{backgroundColor: "orange"}}>
          <CardContent  >
            <Typography className={classes.title}  gutterBottom>
              Users
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small" href='/User'>See All</Button>
         </CardActions>
       </Card>{" "}
    <Card style={{backgroundColor: "red"}}>
      <CardContent >
        <Typography className={classes.title} color="white" gutterBottom>
         Feedback from Users
        </Typography>
    
      
      </CardContent>
      <CardActions>
        <Button size="small" href='/Feedback'>See All</Button>
      </CardActions>
    </Card>
       </div>
      </div>
      
 
  );
}