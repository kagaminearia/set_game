import React from "react";
//import "./Game_Information.css";
import Clock from "./Clock";
import Score from "./Score";
import "bootstrap/dist/css/bootstrap.min.css";

/* contains all cards on board in game of Set. handles card selection logic and validation */
/* currentHand should be pushed up to a higher-level component (game)
   and testDeck should be moved to sever-side */
class SolitaireInformation extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div class="game-info">
        <Clock initialTime={this.props.initialTime} />
        <Score score={this.props.playerManager.getScores()[0]} />
      </div>
    );
  }
}

export default SolitaireInformation;
