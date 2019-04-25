import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import Moment from 'react-moment';
import { Input } from "@material-ui/core";
import { AUTHTOKEN_NAME, apiUrl, interviewCandidatesPath } from "../../config.js";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

class Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: props.grade,
            inputGrade: "",
        };
    }

    render() {
        return (this.state.grade || <div>
            <Input value={this.state.inputGrade}
                onChange={(evt) => this.setState({ inputGrade: evt.target.value })}/>
            <Button onClick={() => this.setState({ grade: this.state.inputGrade })}>
                Submit
            </Button>
        </div>);
    }
}

function getTableData() {
    var rawData = "";
    fetch(apiUrl + interviewCandidatesPath, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        //mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem(AUTHTOKEN_NAME),
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
                    rawData = data;


                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    rawData = {
        candidates: [
            {
                name: "Lorem Ipsum",
                time: "1976-04-19 12:59",
                skype: "lorem_ipsum",
                grade: null,
            },
            {
                name: "Doler Sit",
                time: "1976-04-19 12:59",
                skype: "doler_sit",
                grade: "A",
            },
        ]
    }
    var tableData = [];
    rawData.candidates.forEach(candidate => {
        tableData.push([candidate.name, <Moment parse="YYYY-MM-DD HH:mm" format="MMM Do LT">{candidate.time}</Moment>, candidate.skype,
        <Grade grade={candidate.grade}></Grade>])
    });
    return tableData;
}

function InterviewList(props) {
    const { classes } = props;
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Interviews</h4>
                        <p className={classes.cardCategoryWhite}>
                            This is your schedule of interviews, please follow the selected time slots and grade the candidates.
            </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Name", "Time", "Skype", "Grade"]}
                            tableData={getTableData()}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export default withStyles(styles)(InterviewList);
