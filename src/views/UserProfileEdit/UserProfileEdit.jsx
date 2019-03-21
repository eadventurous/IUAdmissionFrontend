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
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiPhoneNumber from 'material-ui-phone-number';


import avatar from "assets/img/faces/marc.jpg";

import { apiUrl, profilePath, USERTYPE_NAME, AUTHTOKEN_NAME } from '../../config.js'
import { FormControlLabel, TextField } from "@material-ui/core";

const styles = theme => ({
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class UserProfile extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      email: '',
      phone_number: '',
      first_name: '',
      last_name: '',
      city: '',
      country: '',
      postal_code: '',
      skype_account: '',
      telegram_alias: '',
      about_me: '',
    };
  }

  componentDidMount() {
    fetch(apiUrl + profilePath, {
      method: 'GET',
      mode: 'no-cors',
      headers: new Headers({
        'Authorization': this.state.authToken,
        // 'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(json => this.fillData(json))
      .catch(error => console.log(error));
  }

  fillData(data) {
    this.state.email = data.email;
    this.state.phone_number = data.phone_number;
    this.state.first_name = data.first_name;
    this.state.city = data.last_name;
    this.state.country = data.country;
    this.state.postal_code = data.postal_code;
    this.state.skype_account = data.skype_account;
    this.state.telegram_alias = data.telegram_alias;
    this.state.about_me = data.about_me;
  }

  getUpdateForm() {
    return ({
      "fullName": this.state.first_name+" "+this.state.first_name,
      "email": this.state.email,
      "physicalAddress": this.state.country+" "+this.state.city+" "+this.state.postal_code,
      "skype": this.state.skype_account,
      "telegram": this.state.telegram_alias,
      "additionalInfo": this.state.about_me,
      "photoURL": "", 
    });
  }

  sendFormData()
  {
    fetch(apiUrl + profilePath, {
      method: 'POST',
      mode: 'no-cors',
      headers: new Headers({
        'Authorization': this.state.authToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.getUpdateForm())
    })
      .then(response => response.json())
      .then(json => this.fillData(json))
      .catch(error => console.log(error));
  }

  performUpdate() {
    console.log(this.state.email);
  }

  sendUpdate() {
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.classes.cardTitleWhite}>Edit Profile</h4>
                <p className={this.classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      id="outlined-requied-full-width"
                      label="Email"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.email}
                      onChange={evt => this.setState({ email: evt.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Phone Number"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.phone_number}
                      onChange={evt => this.setState({ phone_number: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      id="first-name"
                      label="First Name"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.first_name}
                      onChange={evt => this.setState({ first_name: evt.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      id="last-name"
                      label="Last Name"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.last_name}
                      onChange={evt => this.setState({ last_name: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      required
                      id="city"
                      label="City"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.city}
                      onChange={evt => this.setState({ city: evt.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      required
                      id="country"
                      label="Country"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.coutry}
                      onChange={evt => this.setState({ coutry: evt.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      required
                      id="postal-code"
                      label="Postal Code"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.postal_code}
                      onChange={evt => this.setState({ postal_code: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      required
                      id="skype-account"
                      label="Skype Account"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.skype_account}
                      onChange={evt => this.setState({ skype_account: evt.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      required
                      id="last-name"
                      label="Telegram Alias"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.telegram_alias}
                      onChange={evt => this.setState({ telegram_alias: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="About Me"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      value={this.state.about_me}
                      onChange={evt => this.setState({ about_me: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <div className={this.classes.left}>
                  <Button variant="outlined" color="success" onClick={() => this.sendFormData()} className={classes.button}>Update Profile</Button>
                  <Button variant="outlined" color="warning" className={classes.button}>Cancel</Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <Button color="primary" round>
                  Change Photo
                </Button>
                <h5 className={this.classes.cardCategory}> Registered</h5>
                <h4 className={this.classes.cardTitle}>Not Enrolled Yet</h4>
                {/* <p className={this.classes.description}>
                  Description
                </p> */}

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// function UserProfile(props) {
//   const { classes } = props;

// }

export default withStyles(styles)(UserProfile);
