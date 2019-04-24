import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import avatar from "assets/img/faces/marc.jpg";
//Hello
import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath } from '../../config.js'
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
    };
  }

  handleFileChange(files) {
    this.setState({
      files: files
    });
  }

  componentDidMount() {
    fetch(apiUrl + profilePath, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        // 'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  getDocumentTile(name, description) {
    const {classes} = this.classes;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <label htmlFor="outlined-button-file">
              <Button variant="outlined" style={{float: 'right'}} component="span" className={classes.button}>
                View
              </Button>
            </label>
          </CardActions>
        </Card>
      </div>
    );
  }
  rows = [
    {
      name: "John Smith",
      group: "Admin",
      date: "09.09.2018",
    },
    {
      name: "Mario Plumber",
      group: "Manager",
      date: "01.08.2018",
    },
    {
      name: "Francesco Dresden",
      group: "Manager",
      date: "11.010.2018",
    },
    {
      name: "Another User",
      group: "Interviewer",
      date: "09.09.2018",
    },
  ];

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {classes} = this.classes;
    return (
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Registration Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.group}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right"><Button>Edit</Button></TableCell>
              </TableRow>
            ))}
              <Button onClick={() => this.handleClickOpen()}>+</Button>
          </TableBody>
        </Table>
      </Paper>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          fullWidth={true}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
              
              <TextField
                required
                id="standard-required"
                label="Name"
                fullWidth={true}
                className={classes.textField}
                margin="normal"
              />
              <FormControl fullWidth={true}>
              {/* <InputLabel htmlFor="age-simple">User Group</InputLabel> */}
              <Select
                value={10}
                onChange={this.handleSelect}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Manager</MenuItem>
                <MenuItem value={30}>Interviewer</MenuItem>
              </Select>
            </FormControl>
              <TextField
                required
                id="standard-required"
                label="E=Mail"
                fullWidth={true}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                id="standard-required"
                label="Password"
                fullWidth={true}
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
