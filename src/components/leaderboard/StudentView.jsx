import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Entry from "./Entry";

//import PropTypes from "prop-types";

//NoteView is the class that displays a single note. This class deploys the editNote() and deleteNote() functions, which live in the App.js file

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPoints: 0,
      pointEntries: [],
      name: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    console.log(id);
    this.fetch(id);
  }

  async fetch(id) {
    //Get Name
    await axios
      .get(`https://notacontest.herokuapp.com/students/${id}`)
      .then(res => {
        console.log("Name", res);
        this.setState(() => ({
          name: res.data.name
        }));
      })
      .catch(err => {
        console.dir(err);
      });

    // Get Points
    axios
      .get(`https://notacontest.herokuapp.com/students/scores/${id}`)
      .then(res => {
        console.log("StudentView", res);
        this.setState(() => ({
          pointEntries: res.data
        }));
      })
      .catch(err => {
        console.dir(err);
      });

    //get total
    axios
      .get(`https://notacontest.herokuapp.com/students/total/${id}`)
      .then(res => {
        console.log("StudentView", res);
        this.setState(() => ({
          totalPoints: res.data
        }));
      })
      .catch(err => {
        console.dir(err);
      });
  }

  render() {
    const { pointEntries, totalPoints, name } = this.state;
    if (!this.props.students) {
      return (
        <div>
          <h1>Loading Information...</h1>
        </div>
      );
    } else if (totalPoints < 1) {
      return (
        <div>
          <h1>This student has no points.</h1>
        </div>
      );
    } else {
      return (
        <div className="student-view">
          <h1>{name}</h1>
          <h2>Total Points: {totalPoints}</h2>
          <h2>Point Entries:</h2>

          <ul>
            {pointEntries.map(entry => {
              return (
                <Entry
                  points={entry.points}
                  task={entry.task}
                  id={entry.id}
                  key={entry.id}
                  date={entry.date}
                />
              );
            })}
          </ul>
          <Button
            component={Link}
            to="/scoreboard"
            variant="outlined"
            color="secondary"
            className="button"
          >
            Back
          </Button>
        </div>
      );
    }
  }
}

//Type validation for props
// StudentView.propTypes = {
//   id: PropTypes.number,
//   editNote: PropTypes.func.isRequired,
//   deleteNote: PropTypes.func.isRequired
// };

export default StudentView;
