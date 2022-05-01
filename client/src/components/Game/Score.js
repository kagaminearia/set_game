import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* The timing and scoring part of the game */
class Score extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <span>Score: {this.props.score}</span>;
  }
}

export default Score;
