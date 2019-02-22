import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Entry from "./Entry";

//import PropTypes from "prop-types";

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      totalPoints: 0,
      pointEntries: [],
      name: "",
      currentPage: 1,
      entriesPerPage: 6
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.state.id;
    console.log(id);
    this.fetch(id);
  }

  async fetch(id) {
    //Get Name
    await axios
      .get(`https://notacontest.herokuapp.com/students/${id}`)
      .then(res => {
        console.log("Name", res.data.name);
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
  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  };

  back = e => {
    e.preventDefault();
    const { currentPage } = this.state;
    if (currentPage > 1) {
      let back = currentPage - 1;
      this.setState({
        currentPage: back
      });
    }
  };

  next = e => {
    e.preventDefault();
    const { currentPage, pointEntries, entriesPerPage } = this.state;
    console.log(pointEntries.length % entriesPerPage);
    if (currentPage <= pointEntries.length % entriesPerPage) {
      let next = currentPage + 1;
      this.setState({
        currentPage: next
      });
    }
  };

  deleteHandler = eid => e => {
    console.log("deleteHandlerFired");
    this.props.delete(eid);
    this.fetch(this.state.id);
  };

  render() {
    const {
      pointEntries,
      totalPoints,
      name,
      currentPage,
      entriesPerPage
    } = this.state;

    // Logic for displaying current todos
    const indexOfLastPE = currentPage * entriesPerPage;
    const indexOfFirstPE = indexOfLastPE - entriesPerPage;
    const currentPEs = pointEntries.slice(indexOfFirstPE, indexOfLastPE);

    const renderEntries = currentPEs.map(entry => {
      return (
        <Entry
          {...this.props}
          points={entry.points}
          task={entry.task}
          id={entry.id}
          key={entry.id}
          date={entry.date}
          fetch={this.fetch}
          deleteHandler={this.deleteHandler}
        />
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pointEntries.length / entriesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="waves-effect hoverable"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    if (!this.props.students) {
      return (
        <div>
          <h1>Loading Information...</h1>
        </div>
      );
    } else if (totalPoints < 1) {
      return (
        <div className="student-view">
          <h1>{name}</h1>
          <h1>This student has no points.</h1>
        </div>
      );
    } else {
      return (
        <div className="student-view">
          <h1>{name}</h1>
          <h2>Total Points: {totalPoints}</h2>
          <h2>Point Entries:</h2>

          <ul>{renderEntries}</ul>
          <ul id="page-numbers" className="pagination">
            <li onClick={this.back}>
              <i className="hoverable material-icons">chevron_left</i>
            </li>
            {renderPageNumbers}
            <li onClick={this.next}>
              <i className="hoverable material-icons">chevron_right</i>
            </li>
          </ul>

          <div className="flex">
            <Button
              component={Link}
              to="/scoreboard"
              variant="contained"
              color="default"
              className="bb button grey darken-2 hoverable"
            >
              Back
            </Button>
            <Button
              component={Link}
              to="/scoreboard/form"
              variant="contained"
              color="default"
              className="bb button grey darken-2 hoverable"
            >
              Add New
            </Button>
          </div>
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
