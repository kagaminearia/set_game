import React from "react";
//import "./Game_Information.css";
import Timer from "./Timer";
import Score from "./Score";
import "bootstrap/dist/css/bootstrap.min.css";

/* contains all ui information of a multiplayer game of set */
class MultiplayerInformation extends React.Component {
  constructor(props) {
    super(props);
    console.log("info.js " + this.props.currentTurnTime);
  }

  renderPlayer(player) {
    return (
      <div>
        {player?.name} <Score score={player?.score} />
      </div>
    );
  }

  render() {
    let rows = [];

    for (const player of this.props.playerManager.getPlayers()) {
      rows.push(this.renderPlayer(player));
    }

    return (
      <div class="game-info">
        <Timer
          getGameState={this.props.getGameState}
          currentTurnTime={this.props.currentTurnTime}
        />
        <div>{rows}</div>
        <p>
          {" "}
          Current Player's Turn:{" "}
          {this.props.playerManager.getCurrentPlayer()?.name}{" "}
        </p>
      </div>
    );
  }
}

export default MultiplayerInformation;
