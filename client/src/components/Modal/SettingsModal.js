import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
class SettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      text1: "1",
      text2: "Easy",
    };
    this.playerNum = 1;
    this.diff = 0;
    this.handleShowSettings = this.handleShowSettings.bind(this);
    this.handlePlayerNum = this.handlePlayerNum.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShowSettings() {
    this.setState((prev) => ({
      show: !prev.show,
    }));
  }

  handlePlayerNum(playerNum) {
    this.playerNum = playerNum;
  }

  handleDifficulty(diff) {
    this.diff = diff;
  }

  handleSubmit() {
    this.props.handleSettings(this.playerNum, this.diff);
  }

  // Handles changing number of players
  handleClick1(text) {
    this.setState((prev) => ({
      show: prev.show,
      text1: text,
      text2: prev.text2,
    }));
  }

  // Handles changing difficulty
  handleClick2(text) {
    this.setState((prev) => ({
      show: prev.show,
      text1: prev.text1,
      text2: text,
    }));
  }

  // Render the dropdown menus for changing settings and descriptions of what they do
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShowSettings}>
          Settings
        </Button>

        <Modal show={this.state.show} onHide={this.handleShowSettings}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Mode</h4>
            <p>
              Change number of players. Multiplayer gives each player 1 minute
              to find a Set.
            </p>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title={this.state.text1}
              >
                <Dropdown.Item eventKey="1">
                  <div
                    onClick={(e) => {
                      this.handlePlayerNum(1);
                      this.handleClick1(e.target.textContent);
                    }}
                  >
                    1
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  <div
                    onClick={(e) => {
                      this.handlePlayerNum(2);
                      this.handleClick1(e.target.textContent);
                    }}
                  >
                    2
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  <div
                    onClick={(e) => {
                      this.handlePlayerNum(3);
                      this.handleClick1(e.target.textContent);
                    }}
                  >
                    3
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="4">
                  <div
                    onClick={(e) => {
                      this.handlePlayerNum(4);
                      this.handleClick1(e.target.textContent);
                    }}
                  >
                    4
                  </div>
                </Dropdown.Item>
              </DropdownButton>
            </p>
            <h4>Difficulty</h4>
            <p>
              Changes how many cards are highlighted when player uses a hint.
              Easy shows 3 for a whole Set, Medium shows 2, Hard shows 1, and
              Extreme eliminates the use of hints altogether.
            </p>
            <p>
              <DropdownButton
                id="dropdown-basic-button"
                title={this.state.text2}
              >
                <Dropdown.Item eventKey="Easy">
                  <div
                    onClick={(e) => {
                      this.handleDifficulty(0);
                      this.handleClick2(e.target.textContent);
                    }}
                  >
                    Easy
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Medium">
                  <div
                    onClick={(e) => {
                      this.handleDifficulty(1);
                      this.handleClick2(e.target.textContent);
                    }}
                  >
                    Medium
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Hard">
                  <div
                    onClick={(e) => {
                      this.handleDifficulty(2);
                      this.handleClick2(e.target.textContent);
                    }}
                  >
                    Hard
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Extreme">
                  <div
                    onClick={(e) => {
                      this.handleDifficulty(3);
                      this.handleClick2(e.target.textContent);
                    }}
                  >
                    Extreme
                  </div>
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShowSettings}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.handleSubmit();
                this.handleShowSettings();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SettingsModal;
