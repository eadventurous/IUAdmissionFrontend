import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { DropzoneArea } from 'material-ui-dropzone'

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath, userDataPath, candidatesPath } from '../../config.js'
import { TableFooter } from "@material-ui/core";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Users extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      files: [],
      dialogOpen: false,
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
      postal_code: "",
      skype_account: "",
      telegram_alias: "",
      about_me: "",
      rows: [],
    };
  }

  handleFileChange(files) {
    this.setState({
      files: files
    });
  }

  componentDidMount() {
    fetch(apiUrl + candidatesPath, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if(response.status == 200){
          response.json().then((data)=>{
            this.setState({rows: data});
            console.log(data);
          });
        }})
      // .then(json => console.log(this.state.rows));
  }
  

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  
  getUserData(id)
  {
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
        phone_number: data.phone?data.phone:"",
        first_name: data.firstName,
        last_name: data.lastName,
        city: data.city,
        country: data.country,
        postal_code: data.postCode,
        skype_account: data.skype,
        telegram_alias: data.telegram,
        about_me: data.about,
      })).then(() => this.handleClickOpen())
      // .then(() => this.downloadProfilePhoto(this, 'profilePhoto' ))
      .catch(error => console.log(error))
  }

  render() {
    const {classes} = this.classes;
    return (
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.profile.firstName + " " + row.profile.lastName}
                </TableCell>
              <TableCell align="right"><Button onClick={() => this.getUserData(row.id)}>View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          fullWidth={true}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Candidate View</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
              
              <TextField
                required
                id="standard-required"
                label="Name"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              
              <TextField
                required
                id="standard-required"
                label="E-Mail"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Phone Number"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="City"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Country"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Postal Code"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Skype Account"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Telegram Alias"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Phone Number"
                InputProps={{
                  readOnly: true,
                }}
                multiline
                fullWidth={true}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />

          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleClose()} color="primary">
            Add
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

// function UserProfile(props) {
//   const { classes } = props;

// }

export default withStyles(styles)(Users);
