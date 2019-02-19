import React from "react";

const Student = props => {
  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h3>Id: {props.id}</h3>
    </div>
  );
};

export default Student;
