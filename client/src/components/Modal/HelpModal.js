import { Button, Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pagestyle.css";

class HelpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.handleShowHelp = this.handleShowHelp.bind(this);
  }

  handleShowHelp() {
    this.setState((prev) => ({
      show: !prev.show,
    }));
  }

  // Render the rules and scoring information
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShowHelp}>
          Help
        </Button>

        <Modal show={this.state.show} onHide={this.handleShowHelp}>
          <Modal.Header closeButton>
            <Modal.Title>Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 id="welcome">Rules</h3>
                <p>The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a variation of the following four features:</p>
                <p>
                <ol>
                    <li><em>COLOR:</em> Each card is orange, green, or black. </li>
                    <li><em>SYMBOL:</em> Each card contains squares, triangles, or circles. </li>
                    <li><em>NUMBER:</em> Each card has one, two, or three symbols. </li>
                    <li><em>SHADING:</em> Each card is solid, open, or half-filled. </li>
                </ol>
                </p>
                <p>
                    A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card. 
                    That is to say, any feature in the 'Set' of three cards is either common to all three cards or is different on each card.
                </p>
            <h3 id='welcome'>Scoring</h3>
              <h5 id='welcome'>Single-Player</h5>
              <p>
                <table>
                  <tr>
                    <th>Actions</th>
                    <th>Points</th>
                  </tr>
                  <tr>
                    <td>Set found</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <td>Incorrect Set found</td>
                    <td>-1000</td>
                  </tr>
                  <tr>
                    <td>Drawing cards</td>
                    <td>-100</td>
                  </tr>
                  <tr>
                    <td>Using a hint</td>
                    <td>-200</td>
                  </tr>
                </table>
              </p>
              <h5 id='welcome'>Multiplayer</h5>
              <p>Scoring follows from single-player mode, but there is a penalty of 2000 points if you do not find a Set at all during your allotted minute.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShowHelp}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default HelpModal;
