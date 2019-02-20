import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import StudentList from "./StudentList";
import StudentView from "./StudentView";
import PointForm from "./PointForm";

class ScoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      points: []
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  //Gets all students from database
  fetchStudents = () => {
    axios
      .get("https://notacontest.herokuapp.com/students")
      .then(res => this.setState({ students: res.data }))
      .catch(err => console.log(err.message));
  };

  //Gets all point entries from database
  fetchPoints = () => {
    axios
      .get("https://notacontest.herokuapp.com/scores")
      .then(res => this.setState({ points: res.data }))
      .catch(err => console.log(err.message));
  };

  addPoints = obj => {
    console.log("addPointsfired", obj);
    axios
      .post("https://notacontest.herokuapp.com/scores", obj)
      .then(res => {
        console.log("successful", res);
        this.setState({ students: res.data.students });
        this.fetchStudents();
        this.fetchPoints();
      })
      .catch(error => console.log(error));
  };

  delete = id => {
    console.log("deleteFired", id);
    axios
      .delete(`https://notacontest.herokuapp.com/scores/${id}`)
      .then(res => {
        console.log("successful", res);
        this.setState({ points: res.data.scores });
        this.fetchStudents();
        this.fetchPoints();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { students, scores } = this.state;
    return (
      <div className="App">
        <div className="home-view">
          <Switch>
            <Route
              exact
              path="/scoreboard"
              render={props => (
                <StudentList
                  {...props}
                  students={this.state.students}
                  scores={this.state.scores}
                  getTotal={this.getTotal}
                />
              )}
            />

            <Route
              exact
              path="/scoreboard/student/:id"
              render={props => (
                <StudentView
                  {...props}
                  students={students}
                  scores={scores}
                  getEntries={this.getEntries}
                  getTotal={this.getTotal}
                  delete={this.delete}
                />
              )}
            />

            <Route
              exact
              path="/scoreboard/form"
              render={props => (
                <PointForm
                  {...props}
                  students={students}
                  scores={scores}
                  addPoints={this.addPoints}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default ScoreContainer;
