import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* The timing and scoring part of the game */
class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.playerTimerLength = 60000;

    console.log(this.props.currentTurnTime);

    this.state = {
      timeRemaining: 0,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 100);
    this.setState({
      currentTurnTime: this.props.currentTurnTime,
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (Date.now() - this.props.currentTurnTime > this.playerTimerLength) {
      this.props.getGameState();
      this.setState({ currentTurnTime: this.playerTimerLength });
      return;
    }
    this.setState((prev) => ({
      timeRemaining: prev.timeRemaining - 100,
    }));
  }

  render() {
    console.log("timer" + this.props.currentTurnTime);
    return (
      <div className="time">
        Time left:{" "}
        {(this.playerTimerLength - (Date.now() - this.props.currentTurnTime)) /
          1000}
      </div>
    );
  }
}

export default Timer;
