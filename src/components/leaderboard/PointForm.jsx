import React, { useState } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = () => ({
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

const PointForm = props => {
  const [formData, setFormData] = useState({
    task: "",
    studentId: 0,
    points: 0
  });
  //hooks
  const updateFormData = e => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addPointHandler = e => {
    e.preventDefault();
    let epoch = Date.parse(new Date());

    props.addPoints({
      task: formData.task,
      points: formData.points,
      studentId: formData.studentId,
      date: epoch
    });

    setFormData({
      task: "",
      points: 0,
      studentId: 0
    });

    props.history.goBack();
    window.scrollTo(0, 0);
  };

  const { classes, students } = props;
  const { task, points, studentId } = formData;

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="on"
      onSubmit={addPointHandler}
    >
      <h1>Point-O-Matic</h1>
      <h2>Student</h2>
      <TextField
        id="dropdown"
        select
        className={classes.textField}
        value={studentId}
        name="studentId"
        onChange={e => updateFormData(e)}
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
        value={task}
        name="task"
        onChange={e => updateFormData(e)}
        margin="normal"
      />
      <h2>Points</h2>
      <TextField
        id="input"
        value={points}
        name="points"
        onChange={e => updateFormData(e)}
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

      <Button component={Link} to="/scoreboard" className="button form-submit">
        Cancel
      </Button>
    </form>
  );
};

PointForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PointForm);
