import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { apiUrl, USERTYPE_NAME, AUTHTOKEN_NAME, authPath } from '../config.js'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TestQuestion from '../components/TestQuestion'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 600,
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  bottomlink: {
    marginTop: theme.spacing.unit,
    fontSize: 'small',
  }
});



class Test extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    let test = JSON.parse(localStorage.getItem("test"));
    this.testId = test.id;
    this.testName = test.name;
    //console.log(this.classes);
    this.state = {
      login: '',
      password: '',
      started: false,
      answers: new Map(),
    };
  }

  getQuestions() {
    var questions = "";
    fetch(apiUrl + "/test/getQuestions", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      //mode: "no-cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem(AUTHTOKEN_NAME),
        test: this.testId,
      }), // body data type must match "Content-Type" header
    })
      .then(
        (response) => {
          if (response.status !== 200) {
            alert("Session closed")
            return;
          }
          // Examine the text in the response
          response.json().then((data) => {
            questions = data;


          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
    questions = {
      questions: [
        {
          text: "Question 1",
          id: 1,
          answers: [
            {
              text: "hot",
              id: 0,
            },
            {
              text: "cold",
              id: 4,
            }
          ]
        },
        {
          text: "Question 2",
          id: 3,
          answers: [
            {
              text: "mean",
              id: 1,
            },
            {
              text: "dumb",
              id: 2,
            }
          ]
        }
      ]
    }
    return questions.questions.map(question => <TestQuestion text={question.text} answers={question.answers}
      onSelect={id => {
        let nAnswers = new Map(this.state.answers);
        nAnswers.set(question.id, id);
        this.setState({
          answers: nAnswers,
        })
      }} />)
  }



  renderContent() {
    if (this.state.started == true) {
      let answers = [{ text: "answer 1", id: 1 }, { text: "answer 2", id: 3 }];
      let questionId = 0;
      return (<div>
        {this.getQuestions()}
        <Button color="primary" variant="contained" fullWidth onClick={() => {
          fetch(apiUrl + "/test/submit", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "no-cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.testId,
              answers: this.state.answers.forEach((mId, mAnswer, m) => {
                return {
                  id: mId,
                  answer: mAnswer,
                }
              })
            }), // body data type must match "Content-Type" header
          })
            .then(
              (response) => {
                if (response.status !== 200) {
                  alert("Invalid login or password")
                  return;
                }
                // Examine the text in the response
                response.json().then((data) => {
                  //console.log(data);
                  //this.props.dispatch({ type: 'UPDATE', token: data.token });
                  this.props.history.push('/dashboard/tests');
                });
              }
            )
            .catch(function (err) {
              console.log('Fetch Error :-S', err);
            });
          this.props.history.push('/dashboard/tests');
        }}>Submit</Button>
      </div>)
    }
    else {
      return (
        <form className={this.classes.form} onSubmit={() => this.setState({ started: true })}>
          Welcome to {this.testName}, here you will be able to take the test. Please note that you only have 1 hour to finish it. Time will start after you pressing the button.
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.classes.submit}
          >
            Start Test
          </Button>
        </form>
      )
    }
  }

  render() {
    return (
      <main className={this.classes.main}>
        <CssBaseline />
        <Paper className={this.classes.paper}>
          <Typography component="h1" variant="h5">
            {this.testName}
        </Typography>
          {this.renderContent()}
        </Paper>
      </main>
    );
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

const TestStyled = withStyles(styles)(Test);

export default connect(mapStateToProps)(TestStyled);