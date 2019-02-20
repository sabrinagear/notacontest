import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home">
        <div className="main-img">
          {
            <img
              src={require("../../img/logo.png")}
              className="logo"
              style={imageStyle}
            />
          }
        </div>

        <Button
          component={Link}
          to="/scoreboard"
          variant="outlined"
          color="secondary"
          className="button"
        >
          Scoreboard
        </Button>
      </div>
    );
  }
}

export default LandingPage;

const imageStyle = {
  width: "100%",
  maxWidth: "40vw",
  height: "auto",
  margin: "0 auto"
};
