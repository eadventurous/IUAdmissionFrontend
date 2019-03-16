import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import MainLayout from "layouts/Main.jsx";
import SignInLayout from "layouts/SignIn.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={SignInLayout} />
      <Route path="/dashboard" component={MainLayout}/>
      <Redirect from="/" to="/login"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
