/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import {candidateRoutes, adminRoutes, interviewerRoutes, managerRoutes} from "routes.js";
import {USERTYPE_NAME} from "config.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/crowd.jpg";
import logo from "assets/img/inno_logo.png";
import { Button } from "@material-ui/core";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      redirecting: false,
      userType: "candidate"//localStorage.getItem(USERTYPE_NAME)
    };
    switch(this.state.userType) {
      case "candidate":
        this.routes = candidateRoutes;        
        break;
      case "admin":
        this.routes = adminRoutes;
        break;
      case "interviewer":
        this.routes = interviewerRoutes;
        break;
      case "manager":
        this.routes = managerRoutes;
        break;
      default:
        this.routes = adminRoutes;
    }
  }

  switchRoutes() {
    return (
      <Switch>
        {this.routes.map((prop, key) => {
          if (prop.layout === "/dashboard") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          }
        })}
    </Switch>);
  };

  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    if(this.state.redirecting) {
      this.props.history.push('/login');
    }
    
    if(this.props.location.pathname === '/dashboard')
    {
      this.props.history.push('/dashboard/editprofile');
    }

    const { classes, ...rest } = this.props;
    return (
      <div style={{height: '100%'}} className={classes.wrapper}>
        <Sidebar
          routes={this.routes.filter(function(i,n){return !n.hidden})}//{this.routes.map(elem => {
          //   if (!elem.hidden) {
          //     return (elem);
          //   }
          // })}
          logoText={"IU Admission"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={this.routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{this.switchRoutes()}</div>
            </div>
          ) : (
            <div className={classes.map}>{this.switchRoutes()}</div>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
