import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home">
        <Header />
        <Link to="/scoreboard">
          <button className="leaderboard-button">Scoreboard</button>
        </Link>
      </div>
    );
  }
}

export default LandingPage;
