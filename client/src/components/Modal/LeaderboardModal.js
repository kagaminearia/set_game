import { Button, Modal } from "react-bootstrap";
import * as API from "../../helpers/API";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class LeaderboardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entries: [], show: false };
    this.handleShowLeaderboard = this.handleShowLeaderboard.bind(this);
    this.handleGetLeaderboard = this.handleGetLeaderboard.bind(this);
  }

  handleShowLeaderboard() {
    this.setState((prev) => ({
      show: !prev.show,
      entries: prev.entries,
    }));

    if (this.state.entries.length === 0) {
      this.handleGetLeaderboard();
    }
  }

  handleGetLeaderboard() {
    API.getLeaderboard().then((entries) => {
      this.setState((prev) => ({
        entries: entries,
        show: prev.show,
      }));
    });
  }

  // Render the leaderboard data which contains the name, score, and time of each player
  renderLeaderboard(entry, number) {
    return (
      <tr>
        <td>{number}</td>
        <td>{entry.name}</td>
        <td>{entry.score}</td>
        <td>{entry.time}</td>
      </tr>
    );
  }

  // Render the leaderboard on the modal
  render() {
    let rows = [];
    let i = 1;

    for (const entry of this.state.entries) {
      rows.push(this.renderLeaderboard(entry, i));
      i++;
    }

    return (
      <>
        <Button variant="primary" onClick={this.handleShowLeaderboard}>
          Leaderboard
        </Button>

        <Modal show={this.state.show} onHide={this.handleShowLeaderboard}>
          <Modal.Header closeButton>
            <Modal.Title>Leaderboard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShowLeaderboard}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleShowLeaderboard}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default LeaderboardModal;
