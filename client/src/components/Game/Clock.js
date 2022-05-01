import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* The timing and scoring part of the game */
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: Date.now(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    });
  }

  render() {
    return (
      <div className="time">
        Time: {(this.state.currentTime - this.props.initialTime) / 1000}
      </div>
    );
  }
}

export default Clock;
