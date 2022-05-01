import React from "react";
import Card from "./Card";
import "./Board.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* contains all cards on board in game of Set. handles card selection logic and validation */
/* currentHand should be pushed up to a higher-level component (game)
   and testDeck should be moved to sever-side */
class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  renderCard(card) {
    return (
      <Card
        handManager={this.props.handManager}
        card={card}
        updateHandState={this.props.updateHandState}
      />
    );
  }

  render() {
    let rows = [];

    for (const card of this.props.handManager.getHand()) {
      rows.push(this.renderCard(card));
    }

    /* className horizontal span should be own componenent (game controls) */
    return <div className="board">{rows}</div>;
  }
}

export default Board;
