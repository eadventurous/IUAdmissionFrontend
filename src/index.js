import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { AUTHTOKEN_NAME, USERTYPE_NAME } from "config.js"

// core components
import MainLayout from "layouts/Main.jsx";
import SignIn from "layouts/SignIn.jsx";
import SignUp from "layouts/SignUp.jsx";
import Test from "layouts/Test.jsx"

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

const initialState = {
  token: localStorage.getItem(AUTHTOKEN_NAME),
};

function reducer(state = initialState, action) {
  switch(action.type){
    case 'UPDATE':
      return {
        token: action.token,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  localStorage.setItem(AUTHTOKEN_NAME, store.getState().token);
});

ReactDOM.render(
  
  <Provider store={store}>
    <Router history={hist}>
  
      <Switch>
        <Route path="/test" component={Test}/>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={MainLayout} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById("root")
);
