import { Button, Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class WinModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true, name: "" };
    this.handleShowWin = this.handleShowWin.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleShowWin() {
    this.setState((prev) => ({
      show: !prev.show,
    }));
  }

  handleNameChange(event) {
    this.setState((prev) => ({
      show: prev.show,
      name: event.target.value,
    }));
  }

  // Render the winning message and allow player to submit info to leaderboard
  render() {
    return (
      <>
        <Modal show={this.props.isWon} onHide={this.handleShowWin}>
          <Modal.Header closeButton>
            <Modal.Title>You've Won!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={this.state.name.length === 0}
              onClick={() => this.props.handleGameWon(this.state.name)}
            >
              Save Entry and Play Again!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default WinModal;
