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
import Grid from '@material-ui/core/Grid'

import avatar from "assets/img/faces/marc.jpg";
//Hello
import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath } from '../../config.js'

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

class DocumentUpload extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      files: []
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

  getAddTile() {
    const {classes} = this.classes;
    return (
      <div>
        <Card>
          <CardActions className={classes.actions}>
            <label htmlFor="outlined-button-file">
              <Button style={{float: 'right'}} component="span" className={classes.button}>
                +
              </Button>
            </label>
          </CardActions>
        </Card>
      </div>
    );
  }

  render() {
    return (
      <Grid container className={this.classes.root} spacing={24}>
        <Grid item className={this.classes.paper}>
          {this.getDocumentTile("Admins","")}
        </Grid>
        <Grid item className={this.classes.paper}>
          {this.getDocumentTile("Interviewers", "")}
        </Grid>
        <Grid item className={this.classes.paper}>
          {this.getDocumentTile("Managers", "")}
        </Grid>
        <Grid item className={this.classes.paper}>
          {this.getAddTile()}
        </Grid>
      </Grid>
    );
  }
}

DocumentUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};

// function UserProfile(props) {
//   const { classes } = props;

// }

export default withStyles(styles)(DocumentUpload);
