import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    backgroundColor: "#adcfbe",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "noWrap",
    alignItems: "center"
  },

  textField: {
    margin: "1rem auto",
    width: "50%",
    backgroundColor: "#fff5e9",
    borderRadius: "0.2rem",
    fontSize: "2rem"
  },
  h1: {
    margin: "2rem"
  },
  dense: {
    marginTop: 0
  },
  menu: {
    width: 100
  }
});

class PointForm extends React.Component {
  state = {
    task: "",
    points: 0,
    studentId: 0
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addPointHandler = e => {
    e.preventDefault();
    let epoch = Date.parse(new Date());

    this.props.addPoints({
      task: this.state.task,
      points: this.state.points,
      studentId: this.state.studentId,
      date: epoch
    });

    this.setState({
      task: "",
      points: 0,
      studentId: 0
    });
    console.log(this.props.history);
    this.props.history.goBack();
    window.scrollTo(0, 0);
  };

  render() {
    const { classes, students } = this.props;

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="on"
        onSubmit={this.addPointHandler}
      >
        <h1>Point-O-Matic</h1>
        <h2>Student</h2>
        <TextField
          id="dropdown"
          select
          className={classes.textField}
          value={this.state.studentId}
          onChange={this.handleChange("studentId")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {students.map(s => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>
        <h2>Task</h2>
        <TextField
          id="input"
          className={classes.textField}
          value={this.state.task}
          onChange={this.handleChange("task")}
          margin="normal"
        />
        <h2>Points</h2>
        <TextField
          id="input"
          value={this.state.points}
          onChange={this.handleChange("points")}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />

        <button className="button form-submit" type="submit">
          Save
        </button>

        <Button
          component={Link}
          to="/scoreboard"
          className="button form-submit"
        >
          Cancel
        </Button>
      </form>
    );
  }
}

PointForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PointForm);
