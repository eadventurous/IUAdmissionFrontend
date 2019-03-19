import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import SignIn from "layouts/SignIn.jsx";
import SignUp from "layouts/SignUp.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

const initialState = {
  token: localStorage.getItem("TOKEN"),
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
  localStorage.setItem('TOKEN', store.getState().token);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById("root")
);
