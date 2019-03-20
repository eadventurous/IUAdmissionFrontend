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
import { apiUrl } from '../config.js';
import { connect } from 'react-redux';
import MuiPhoneNumber from 'material-ui-phone-number';
import NativeSelect from '@material-ui/core/NativeSelect';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector-material-ui-new';
import { Link } from 'react-router-dom';

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
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        //console.log(this.classes);
        this.state = {
            email: '',
            password: '',
        };
        this.logIn = this.logIn.bind(this);
    }

    logIn(event) {
        event.preventDefault();
        fetch(apiUrl + "/auth", { login: this.state.login, password: this.state.password })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        alert("Invalid login or password")
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        this.props.dispatch({ type: 'UPDATE', token: data.token });
                        this.props.history.push('/admin/dashboard');
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        //Debug code
        /*this.props.dispatch({type: 'UPDATE', token: this.state.email + "token"});
        this.props.history.push('/admin/dashboard');*/
    }

    render() {
        return (
            <main className={this.classes.main}>
                <CssBaseline />
                <Paper className={this.classes.paper}>
                    <Avatar className={this.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={this.classes.form} onSubmit={this.logIn}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus
                                value={this.state.name} onChange={evt => this.setState({ name: evt.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <MuiPhoneNumber defaultCountry={'ru'}
                                value={this.state.tel} onChange={value => this.setState({ tel: value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email"
                                value={this.state.email} onChange={evt => this.setState({ email: evt.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"
                                value={this.state.password} onChange={evt => this.setState({ password: evt.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <NativeSelect
                                value={this.state.program}
                                onChange={evt => this.setState({ program: evt.target.value })}
                                name="program"
                            >
                                <option value={10}>Bachelor</option>
                                <option value={20}>Master</option>
                                <option value={30}>PhD</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="acknowledgment">How did you hear about Innopolis</InputLabel>
                            <Input id="acknowledgment" name="acknowledgment"
                                value={this.state.acknowledgment} onChange={evt => this.setState({ acknowledgment: evt.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <CountryDropdown
                                value={this.state.country}
                                onChange={(val) => this.setState({country: val})}
                                showDefaultOption={false}/>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                        >
                            Sign up
                        </Button>
                    </form>
                    <Link className={this.classes.bottomlink} to="/login">Sign in instead</Link>
                </Paper>
            </main >
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        token: state.token
    };
}

const SignUpStyled = withStyles(styles)(SignUp);

export default connect(mapStateToProps)(SignUpStyled);