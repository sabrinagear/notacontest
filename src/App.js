import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import HomeView from "./components/HomeView";
import StudentView from "./components/StudentView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      pointScores: []
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
      .then(res => this.setState({ scores: res.data }))
      .catch(err => console.log(err.message));
  };

  render() {
    const { students, scores } = this.state;
    return (
      <div className="App">
        <div className="home-view">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <HomeView
                  students={this.state.students}
                  scores={this.state.scores}
                />
              )}
            />

            <Route
              exact
              path="/:id"
              render={props => (
                <StudentView {...props} students={students} scores={scores} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
