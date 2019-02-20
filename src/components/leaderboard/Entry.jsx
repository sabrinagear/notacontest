import React from "react";

const Entry = props => {
  return (
    <li className="e-card z-depth-4" key={props.id}>
      <p className="e-card-head">
        Task: {props.task}
        <i class="small material-icons">delete</i>
      </p>
      <p>Date: {props.date}</p>
      <p>Points: {props.points}</p>
    </li>
  );
};

export default Entry;
