import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import {DropzoneArea} from 'material-ui-dropzone'

import avatar from "assets/img/faces/marc.jpg";

import { apiUrl, loginSuffixUrl, USERTYPE_NAME, AUTHTOKEN_NAME } from '../../config.js'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      files: []
    };
  }
  
  handleFileChange(files){
    this.setState({
      files: files
    });
  }

  componentDidMount() {
    fetch(apiUrl + loginSuffixUrl, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        // 'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 className={this.classes.cardTitleWhite}>Passport Scan</h4>
          </CardHeader>
          <CardBody>
            <DropzoneArea 
            onChange={this.handleFileChange.bind(this)}
            />
          </CardBody>
          <CardFooter>
            <div className={this.classes.left}>
              {/* <Button color="success">Update Profile</Button>
              <Button color="warning">Cancel</Button> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

// function UserProfile(props) {
//   const { classes } = props;

// }

export default withStyles(styles)(UserProfile);
