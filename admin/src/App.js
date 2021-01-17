
import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Candidate from "./Component/Candidates";
import ALLCandidate from "./Component/ALLCandidates";
import NewCandidate from "./Component/NewCandidate";
import User from "./Component/User";
import Result from "./Component/Results";
import Home from "./Component/Home";
import NotFound from "./Component/NoTFound";
import Login from "./Component/auth/Login";
import toast, { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import departments from "./Component/Department";
import Newdepartment from "./Component/NewDepartment";
import organizations from "./Component/Organization";
import Neworganization from "./Component/NewOrganization";
import NewPost from "./Component/NewPost";
import Posts from "./Component/Post";
import Events from "./Component/Event";
import NewEvents from './Component/NewEvent';
import UpdateEvent from "./Component/updateEvent";
import { ProtectedRoute } from "./../src/Component/auth/ProtectedRoutes";

import feedbacks from "./Component/Feeback";
function App() {
  return (
  <Router> 
    <div>
  
    <ToastContainer />
    
       <Switch>

     
       <ProtectedRoute path ="/Candidates/New/:org_id/:dep_id/:Auth_id" exact component={NewCandidate} />   
             <ProtectedRoute path ="/Candidates/:org_id/:dep_id/:Auth_id" component={Candidate} />   
             <ProtectedRoute path ="/Candidates/:org_id/:Auth_id" component={ALLCandidate} />   
             <ProtectedRoute path ="/User/:Auth_id" exact component={User} />
            <ProtectedRoute path ="/Result/:org_id/:p_id/:Auth_id" exact component={Result} />
             <ProtectedRoute path ="/Post/New/:id/:Auth_id" component={NewPost} />  
             <ProtectedRoute path ="/Post/:id/:Auth_id" exact component={Posts} />
             <ProtectedRoute path ="/Feedback/:Auth_id" exact component={feedbacks} />
             <ProtectedRoute path ="/Organization/New/:Auth_id" component={Neworganization} />  
             <ProtectedRoute path ="/Organization/:Auth_id" exact component={organizations} />
             <ProtectedRoute path ="/Department/New/:id/:Auth_id" component={Newdepartment} />  
             <ProtectedRoute path ="/Department/:id/:Auth_id" exact component={departments} />
             <ProtectedRoute path ="/Event/New/:Auth_id" exact component={NewEvents}/>
             <ProtectedRoute path ="/Event/Update/:id/:Auth_id" component={UpdateEvent} /> 
             <ProtectedRoute path ="/Event/:Auth_id" exact component={Events}/>
             <Route path ="/Home" exact component={Home} />   
             <Route path ="/" component={Login} /> 
             <Route path ="/Not-Found"  component={NotFound} />  
             <Redirect to='/Not-Found'/> 
             
       </Switch>
   
     </div>
     
    </Router>
  );
}

export default App;
