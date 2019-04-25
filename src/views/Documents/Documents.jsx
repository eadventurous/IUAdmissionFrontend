import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import { DropzoneArea } from 'material-ui-dropzone'

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { apiUrl, fileStoragePath, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath, fileInfoPath } from '../../config.js'
import {saveAs} from "file-saver";
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader'

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
      files: [],
      cvname: "no file",
      mlname: "no file",
      trname: "no file",
      psname: "no file",
      rcname: "no file",
      prname: "no file",
      overlayActive: false,
    };
  }

  handleFileChange(files) {
    this.setState({
      files: files,
    });
  }

  componentDidMount() {
    fetch(apiUrl + fileInfoPath, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.state.authToken,
        // 'Content-Type': 'application/json'
      })
    })
      .then(response => {
        
        if(response.status == 200)
        {
          response.json().then((data) => {
            for(var i = 0; i<data.length;i++)
            {
              this.setState({[data[i].type]: data[i].fileName});
            }
          })
        }
      });
  }

  updateFile(file, type)
  {
    var reader = new FileReader();
    reader.fileName = file.name;
    var self = this;
    reader.onload = function(event) {
      var arrayBuffer = this.result;
      var array = new Uint8Array(arrayBuffer);
      var binaryString = "";
      for (var i=0, len=array.length; i < len; i++) {
        binaryString+=String.fromCharCode(array[i]);
      }
      self.uploadFile(self, type, event.target.fileName, binaryString);
    }
    reader.readAsArrayBuffer(file);
  }

  showOverlay(self = this)
  {
    self.setState({overlayActive: true});
  }

  hideOverlay(self = this)
  {
    self.setState({overlayActive: false});
  }

  getFileFromServer(self, type)
  {
    self.showOverlay(self);
    var url = new URL(apiUrl + fileStoragePath);
    var params = {type: type};
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

  fileDownloadCall(self, filename, str)
  {
    self.fileDownload(self, filename, self.bytesToBlob(str));
  }

  bytesToBlob(str)
  {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    
    // var bufView = new TextEncoder("ascii").encode(str);
    return new Blob([bufView]);
  }

  fileDownload(self, filename, file)
  {
    var fr = new FileReader();
    fr.onload = function () {
        // self.setState({photo: fr.result});
        console.log(filename);
        saveAs(fr.result, filename);
        // console.log(fr.result);
    }
    fr.readAsDataURL(file);
  }

  uploadFile(self, type, filename, bytes)
  {
    self.showOverlay(self)
    console.log("Started uploading image.");
    fetch(apiUrl + fileStoragePath, {
      method: 'POST',
      headers: new Headers({
        'Authorization': this.state.authToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({"Data": {Type: type, FileName: filename}, Bytes: bytes})
    }).then(function (response) {
      console.log(response.status);
      if(response.status == 200) {
        self.setState({[type]: filename});
      }else{
        alert("Can not update photo.");
      }
    }).then(() => self.hideOverlay(self));
  }

  makeEntry(top, title, filename, reference) {
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
              {this.state[filename]}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <input
              accept="application/pdf,application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className={classes.input}
              style={{ display: 'none' }}
              id={reference}
              onChange={()=>{this.updateFile(this.refs[reference].files[0], filename)}}
              type="file"
              ref={reference}
              />
            <label htmlFor={reference}>
              <Button variant="outlined" component="span" className={classes.button}>
                Upload
              </Button>
            </label>
            <Button variant="outlined" onClick={() => this.getFileFromServer(this, filename)} component="span" className={classes.button}>
                Download
            </Button>
          </CardActions>
        </Card>
      </div>
      );
  }

  render() {
    return (
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
      <Grid container className={this.classes.root} spacing={16}>
          <Grid item xs>
            {this.makeEntry('required', 'Curriculum Vitae', 'cvname', 'cv')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Motivation Letter', 'mlname', 'ml')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Transcript of Records', 'trname', 'tr')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('required', 'Passport Scan', 'psname', 'ps')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('optional', 'Recommendations', 'rcname', 'rc')}
          </Grid>
          <Grid item xs>
            {this.makeEntry('optional', 'Projects', 'prname', 'pr')}
          </Grid>
      </Grid>
      </LoadingOverlay>
      
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
