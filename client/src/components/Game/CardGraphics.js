import React from "react";
import "./CardGraphics.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { drawCardGraphic } from "../../helpers/GraphicsHelper";

class CardGraphics extends React.Component {
  constructor(props) {
    super(props);

    this.cardRef = React.createRef();

    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.renderCard);
    this.renderCard();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.renderCard);
  }

  renderCard() {
    if (this.cardRef?.current && this.props.card) {
      this.canvas = this.cardRef.current;
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      drawCardGraphic(this.props.card, this.canvas, this.ctx);
    }
  }

  render() {
    this.renderCard();
    return <canvas className="card-graphics" ref={this.cardRef}></canvas>;
  }
}

export default CardGraphics;
