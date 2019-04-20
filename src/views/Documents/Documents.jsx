import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
// import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import { DropzoneArea } from 'material-ui-dropzone'

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import avatar from "assets/img/faces/marc.jpg";

import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath } from '../../config.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
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
    justifyContent: "space-between"
  },
  input: {
    display: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
});

class DocumentUpload extends Component {
  constructor(props) {
    super();
    this.classes = props;
    this.state = {
      profileInfo: [],
      authToken: localStorage.getItem(AUTHTOKEN_NAME),
      files: [],
      passportScan1: "Hello Johnny!",
      passportScan2: null,
    };
  }

  handleFileChange(files) {
    this.setState({
      files: files,
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
  makeEntry(top, title, description, reference) {
    const { classes } = this.classes;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {top}
            </Typography>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="outlined-button-file"
              multiple
              onChange={()=>{this.setState({[reference]: "Hi"})}}
              type="file"
              />
            <label htmlFor="outlined-button-file">
              <Button variant="outlined" component="span" className={classes.button}>
                Upload
              </Button>
            </label>
          </CardActions>
        </Card>
      </div>
      );
  }

  render() {
    return (
      <Grid container className={this.classes.root} spacing={16}>
          <Grid item xs>
            {this.makeEntry(this.state.passportScan1, 'Passport Scan', 'description', 'passportScan1')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'description', 'passportScan')}
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
