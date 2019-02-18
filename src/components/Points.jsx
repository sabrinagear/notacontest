import React, { Component } from "react";

const Points = props => {
  return (
    <div>
      <h3> Point Entries: {props.pointEntries}</h3>
      <h3> Total: {props.totalPoints}</h3>
    </div>
  );
};

export default Points;
