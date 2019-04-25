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

import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath, userDataPath, candidatesPath, fileStoragePath, fileManagerPath } from '../../config.js'
import { TableFooter } from "@material-ui/core";
import {saveAs} from "file-saver";
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";


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
      curr_id: "",
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
      overlayActive: false,
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
        if (response.status == 200) {
          response.json().then((data) => {
            this.setState({ rows: data });
            console.log(data);
          });
        }
      })
    // .then(json => console.log(this.state.rows));
  }


  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  getUserData(id) {
    var url = new URL(apiUrl + userDataPath);
    var params = { candidateid: id };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        //'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => this.setState({
        curr_id: id,
        email: data.email,
        phone_number: data.phone ? data.phone : "",
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

  showOverlay(self = this) {
    self.setState({ overlayActive: true });
  }

  hideOverlay(self = this) {
    self.setState({ overlayActive: false });
  }

  getFileFromServer(self, type, id) {
    self.showOverlay(self);
    var url = new URL(apiUrl + fileManagerPath);
    var params = { candidateId: id, type: type};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Authorization': self.state.authToken,
        'Content-Type': 'application/json'
      }),
    })// .then(json => console.log(json))
      .then(response => {
        if(response.status == 200){
          response.json().then((data) => {
            self.fileDownloadCall(self, data.data.fileName, data.bytes)
          })
        }else if(response.status == 404){
          alert("No file provided.");
        }else{
          alert("Server error.");
        }
        self.hideOverlay(self);
      });
  }

  fileDownloadCall(self, filename, str) {
    self.fileDownload(self, filename, self.bytesToBlob(str));
  }

  bytesToBlob(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }

    // var bufView = new TextEncoder("ascii").encode(str);
    return new Blob([bufView]);
  }

  fileDownload(self, filename, file) {
    var fr = new FileReader();
    fr.onload = function () {
      // self.setState({photo: fr.result});
      console.log(filename);
      saveAs(fr.result, filename);
      // console.log(fr.result);
    }
    fr.readAsDataURL(file);
  }

  render() {
    const { classes } = this.classes;
    return (
      <div>
        <LoadingOverlay
          active={this.state.overlayActive}
          spinner={<SyncLoader />}
          styles={{
            wrapper: {
              overflow: this.state.overlayActive ? 'hidden' : 'visible'
            }
          }}
          text=''
        >
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
                value={this.state.first_name + " " + this.state.last_name}
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
                value={this.state.email}
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
                value={this.state.phone_number}
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
                value={this.state.city}
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
                value={this.state.country}
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
                value={this.state.postal_code}
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
                value={this.state.skype_account}
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
                value={this.state.telegram_alias}
              />
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'profilePhoto', this.state.curr_id)}>Photo</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'cvname', this.state.curr_id)}>CV</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'mlname', this.state.curr_id)}>Motivation Letter</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'trname', this.state.curr_id)}>Transcript</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'psname', this.state.curr_id)}>Passport Scan</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'rcname', this.state.curr_id)}>Reccomnedations</Button>
              <Button variant="outlined" onClick={()=>this.getFileFromServer(this, 'prname', this.state.curr_id)}>Projects</Button>



            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Close
          </Button>
              
            </DialogActions>
          </Dialog>
        </LoadingOverlay>
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
