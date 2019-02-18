import React from "react";

const Entry = props => {
  return (
    <li key={props.id}>
      <p>Task: {props.task}</p>
      <p>Date: {new Date(props.date).toDateString()}</p>
      <p>Points: {props.points}</p>
    </li>
  );
};

export default Entry;
