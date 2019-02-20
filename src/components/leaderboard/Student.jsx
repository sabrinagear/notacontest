import React, { Component } from "react";
import axios from "axios";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPoints: 0
    };
  }

  componentDidMount() {
    const id = this.props.id;
    this.total(id);
  }

  total(id) {
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
    return (
      <div className="student-card">
        <h2>{this.props.name}</h2>
        <h3>Points: {this.state.totalPoints}</h3>
      </div>
    );
  }
}

export default Student;
