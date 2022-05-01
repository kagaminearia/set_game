import "./Card.css";
import CardGraphics from "./CardGraphics";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    this.props.handManager.selectCard(this.props.card);
    this.props.updateHandState();
  }

  //break card text into own componenent
  render() {
    const cardClass =
      "card-selector " +
      (this.props.card?.selected ? "selected " : "") +
      (this.props.card?.hint ? "hint " : "") +
      (this.props.card?.correct ? "correct " : "") +
      (this.props.card?.incorrect ? "incorrect " : "");

    console.log(cardClass);

    return (
      <button className={cardClass} onClick={this.handleCardClick}>
        <CardGraphics card={this.props.card} />
      </button>
    );
  }
}

export default Card;
