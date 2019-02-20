import React from "react";

const Entry = props => {
  return (
    <li className="e-card z-depth-4" key={props.id}>
      <p className="e-card-head">
        Task: {props.task}
        <i
          className="small material-icons"
          onClick={props.deleteHandler(props.id)}
        >
          delete
        </i>
      </p>
      <p>Date: {props.date}</p>
      <p>Points: {props.points}</p>
    </li>
  );
};

export default Entry;
