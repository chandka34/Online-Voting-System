import React from 'react'
import {Bar} from 'react-chartjs-2'
import { makeStyles } from "@material-ui/core/styles";
import Menu from './../Component/Menu'
import SingleCandidate from "./SingleCandidate";
import axios from "axios";
import CandidateService from "./../Services/CandidateService";
function BarChart(props) {
  
  const [Votes, setVotes] = React.useState([]);
  const [chartData, setChartData] = React.useState({});
  const org_id = props.match.params.org_id;
  const p_id = props.match.params.p_id;
 const auth= props.match.params.Auth_id
  let Name = [];
  let points = [];
   
    
    const useStyles = makeStyles((theme) => ({
        container: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "700px",
        },
        child: {
          width: "60%",
        },
      }));
      

      axios
      .get("http://localhost:3030/candidate/Result/"+org_id+"/"+p_id+"/"+auth)
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          console.log(res.data);
         Name.push(dataObj.Name);
         points.push(dataObj.votes);
         console.log({Names:Name});
        };
        
       
      setChartData({
        
        labels: Name,
        datasets: [
          {
            label: "Votes",
            data:points,
            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
            borderWidth:4,
            
          }
        ]
      });
   
    
       
      })
  
      .catch(err => {
        console.log(err);
      });
    const options={
        title:{
            display:true,
            text:'Thanks for Voting'
        },
        scales:
        {
            yAxes:[
                {
                ticks: {
                  beginAtZero: true,
                    stepSize:1
                }
            }
            ]
        }
    }

       
    const classes = useStyles();
   
  
    return (
        <div className={classes.container}>
        <div className={classes.child}>
        <Menu/>
            <Bar data={chartData} options={options} />
         </div>
      </div>
    )

}
export default BarChart

