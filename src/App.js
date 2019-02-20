import React, { Component } from "react";
import { Route } from "react-router-dom";

import ScoreContainter from "./components/leaderboard/ScoreContainter";
import LandingPage from "./components/main/LandingPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/scoreboard" component={ScoreContainter} />
      </div>
    );
  }
}
export default App;
