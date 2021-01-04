
import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Header from './Component/Header'
import Menu from './Component/Menu'
import Candidate from "./Component/Candidates";
import ALLCandidate from "./Component/ALLCandidates";
import NewCandidate from "./Component/NewCandidate";
import CreateElection from "./Component/CreateElection";
import UpdateCandidate from "./Component/updateCandidate";
import User from "./Component/User";
import Result from "./Component/Results";
import Election from "./Component/Election";
import Home from "./Component/Home";
import NotFound from "./Component/NoTFound";
import Login from "./Component/auth/Login";
import toast, { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import departments from "./Component/Department";
import Newdepartment from "./Component/NewDepartment";
import UpdateDepartment from "./Component/updateDepartment";
import organizations from "./Component/Organization";
import Neworganization from "./Component/NewOrganization";
import UpdateOrganization from "./Component/updateOrganization";
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

     
       <ProtectedRoute path ="/Candidates/New/:org_id/:dep_id" exact component={NewCandidate} />   
       <ProtectedRoute path ="/Candidates/Update/:id" component={UpdateCandidate} />  
             <ProtectedRoute path ="/Candidates/:org_id/:dep_id" component={Candidate} />   
             <ProtectedRoute path ="/Candidates/:org_id" component={ALLCandidate} />   
             <ProtectedRoute path ="/User" exact component={User} />
            <ProtectedRoute path ="/Result/:org_id/:p_id/:Auth_id" exact component={Result} />
             <ProtectedRoute path ="/Election/Create" component={CreateElection} />  
             <ProtectedRoute path ="/Election" exact component={Election} />
             <ProtectedRoute path ="/Post/New/:id" component={NewPost} />  
             <ProtectedRoute path ="/Post/:id" exact component={Posts} />
             <ProtectedRoute path ="/Feedback" exact component={feedbacks} />
             <ProtectedRoute path ="/Organization/New" component={Neworganization} />  
             <ProtectedRoute path ="/Organization/Update/:id" component={UpdateOrganization} /> 
             <ProtectedRoute path ="/Organization" exact component={organizations} />
             <ProtectedRoute path ="/Department/New/:id" component={Newdepartment} />  
             <ProtectedRoute path ="/Department/Update/:id" component={UpdateDepartment} /> 
             <ProtectedRoute path ="/Department/:id" exact component={departments} />
             <ProtectedRoute path ="/Event/New" exact component={NewEvents}/>
             <ProtectedRoute path ="/Event/Update/:id" component={UpdateEvent} /> 
             <ProtectedRoute path ="/Event" exact component={Events}/>
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
