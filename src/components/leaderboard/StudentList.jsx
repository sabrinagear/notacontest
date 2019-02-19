import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Student from "./Student";

const StudentList = props => {
  if (!props.students) {
    return (
      <div>
        <h1>Loading Team...</h1>
      </div>
    );
  } else {
    return (
      <div className="student-list">
        <div className="header">
          <h1>Welcome to Fun Bus</h1>
          <h2 className="list-header">Team Members:</h2>
        </div>
        <div>
          <section className="list">
            {props.students
              .map(student => {
                return (
                  <Link to={`/scoreboard/${student.id}`} key={student.id}>
                    <Student
                      {...props}
                      name={student.name}
                      id={student.id}
                      key={student.id}
                    />
                  </Link>
                );
              })
              .reverse()}
          </section>
        </div>
      </div>
    );
  }
};

Student.defaultProps = {
  students: []
};

StudentList.propTypes = {
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.number
};

export default StudentList;
