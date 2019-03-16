import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import SignIn from "layouts/SignIn.jsx";
import Candidate from "layouts/Candidate.jsx"
import Interviewer from "layouts/Interviewer.jsx"

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/admin" component={Admin} />
      <Route path="/candidate" component={Candidate}/>
      <Route path="/interviewer" component={Interviewer}/>
      <Redirect from="/" to="/login"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
