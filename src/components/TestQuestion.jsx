import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = {
    card: {
        minWidth: 550,
        margin: '10px 10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginTop: 12,
        marginBottom: 12,
    },
    formControl: {
        margin: 3,
    },
};


class TestQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {selected: props.answers[0].id};
    }

    getRadioButtons() {
        return this.props.answers.map(answer => (<FormControlLabel
            control={<Radio color="primary" />}
            label={answer.text}
            value={answer.id}
        />))
    }

    render() {
        return (
            <Card className={this.classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.text}
                    </Typography>
                    <FormControl component="fieldset" className={this.classes.formControl}>
                        <RadioGroup
                            value={this.state.selected}
                            onChange={evt => {
                                this.setState({ selected: parseInt(evt.target.value) });
                                this.props.onSelect(parseInt(evt.target.value));
                            }}
                        >
                            {this.getRadioButtons()}
                        </RadioGroup>
                        <FormHelperText>Select one option</FormHelperText>
                    </FormControl>
                </CardContent>
            </Card>
        )
    }

}

export default withStyles(styles)(TestQuestion);