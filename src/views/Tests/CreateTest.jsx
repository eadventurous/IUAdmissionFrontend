import React from "react";
// @material-ui/core components
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, profilePath } from '../../config.js';

const styles = {
    textField: {
        width: 500,
        height: 500
    },
};

class CreateTest extends React.Component {

    constructor(props){
        super();
        this.classes=props;
        this.state = {
            test: "",
            authToken: localStorage.getItem(AUTHTOKEN_NAME),
        }
    }


    render() {

        return (<div>
            <TextField
                id="outlined-multiline-flexible"
                label="Text Creation JSON"
                multiline
                rowsMax="200"
                value={this.state.test}
                onChange={event => {
                    this.setState({
                        test: event.target.value,
                    });
                }}
                className={this.classes.textField}
                margin="normal"
                helperText="input JSON in the defined format"
                variant="outlined"
                fullWidth
                rows="25"
            />
            <Button onClick={
                ()=>{
                    fetch(apiUrl + "/test/create", {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        // mode: "no-cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        headers: {
                          "Content-Type": "application/json",
                          'Authorization': this.state.authToken,
                        },
                        body: this.state.test, // body data type must match "Content-Type" header
                      })
                        .then(
                          (response) => {
                            if (response.status === 200) {
                                alert("Test successfully created.");
                            }
                            else{
                                alert("Test creation failed. Check your formatting please.")
                            }
                          }
                        )
                        .catch(function (err) {
                          console.log('Fetch Error :-S', err);
                        });
                }
            }>Create Test</Button>
        </div>)
    }
}

export default withStyles(styles)(CreateTest);