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
  fillBackground: {
    'background-color': '#FFFFFF',
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
      file: '',
    };
  }

  componentDidMount() {
    fetch(apiUrl + profilePath, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        //'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => this.setState({
        email: data.email,
        phone_number: data.phone,
        first_name: data.firstName,
        last_name: data.lastName,
        city: data.city,
        country: data.country,
        postal_code: data.postCode,
        skype_account: data.skype,
        telegram_alias: data.telegram,
        about_me: data.about,
      }))
      .catch(error => console.log(error));
      // console.log(this.state);
  }

  logOut() {
    fetch(apiUrl + '/auth/logout', {
      method: 'POST',
      headers: new Headers({
        'Authorization': this.state.authToken,
        'Content-Type': 'application/json'
      })
    }).catch(error => console.log(error));
    this.performLogout(1);
  }

  performLogout(stat) {
    localStorage.setItem(AUTHTOKEN_NAME, '');
    this.props.history.push("/login");
  }

  sendFormData()
  {
    fetch(apiUrl + profilePath, {
      method: 'POST',
      headers: new Headers({
        'Authorization': this.state.authToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.getUpdateForm())
    })
  }

  getUpdateForm() {
    return ({
      "FirstName": this.state.first_name,
      "LastName": this.state.last_name,
      "Email": this.state.email,
      "Phone": this.state.phone_number,
      "Country": this.state.country,
      "City": this.state.city,
      "PostCode": this.state.postal_code,
      "Skype": this.state.skype_account,
      "Telegram": this.state.telegram_alias,
      "About": this.state.about_me,
    });
  }

  performUpdate() {
    console.log(this.state.email);
  }

  handleFile(file)
  {
    var reader = new FileReader();
    reader.fileName = file.name;
    var self = this;
    reader.onload = function(event) {
      var arrayBuffer = this.result,
      array = new Uint8Array(arrayBuffer),
      binaryString = String.fromCharCode.apply(null, array);
      // console.log(binaryString);
      console.log(event.target.fileName)
      self.fileAvatarSet(self.bytesToBlob(binaryString));
    }
    reader.readAsArrayBuffer(file);
  }

  bytesToBlob(str)
  {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return new Blob([buf]);
  }

  fileAvatarSet(file)
  {
    var fr = new FileReader();
    var self = this;
    fr.onload = function () {
        self.refs.Img1.src = fr.result;
    }
    fr.readAsDataURL(file);
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
                      type="email"
                      autoComplete="email"
                      id="outlined-email-input"
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
                    <FormControl margin="normal" required fullWidth className={classes.textField}>
                        <MuiPhoneNumber defaultCountry={'ru'} variant="outlined"
                            value={this.state.phone_number} onChange={value => this.setState({ phone_number: value })} />
                    </FormControl>
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
                      value={this.state.country}
                      onChange={evt => this.setState({ country: evt.target.value })}
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
                    <TextField
                      labelText="About Me"
                      id="about-me"
                      label="About Me"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows="5"
                      value={this.state.about_me}
                      onChange={evt => this.setState({ about_me: evt.target.value })}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <div className={this.classes.left}>
                  <Button variant="outlined" color="success" onClick={() => this.sendFormData()} className={classes.button}>Update Profile</Button>
                  {/* <Button variant="outlined" color="warning" className={classes.button}>Cancel</Button> */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar  profile>
                  <a onClick={e => e.preventDefault()}>
                    <img ref="Img1" src={this.state.file} alt="..." />
                  </a>
              </CardAvatar>
              <CardBody profile>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="outlined-button-file"
                  multiple
                  onChange={()=>this.handleFile(this.refs.File1.files[0])}//this.setState({file: file})}}
                  type="file"
                  ref="File1"
                  />
                <label htmlFor="outlined-button-file">
                  <Button color="primary" variant="outlined" component="span" className={classes.button} round>
                    Change Photo
                  </Button>
                </label>
                <h5 className={this.classes.cardCategory}> Registered</h5>
                <h4 className={this.classes.cardTitle}>Not Enrolled Yet</h4>
                {/* <p className={this.classes.description}>
                  Description
                </p> */}
                <Button color="warning" round onClick={()=>this.logOut()}>
                  Log Out
                </Button>

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
