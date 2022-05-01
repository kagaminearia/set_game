import _ from "lodash";

class PlayerManager {
  constructor() {
    this.players = [];
    this.currentTurn = 0;
  }

  getScores() {
    return _.map(this.players, (player) => player.score);
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }

  setCurrentTurn(currentTurn) {
    this.currentTurn = currentTurn;
  }

  getCurrentPlayer() {
    if (this.players[this.currentTurn]) {
      return this.players[this.currentTurn];
    }
    return null;
  }
}

export default PlayerManager;
