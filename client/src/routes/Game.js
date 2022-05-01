import React from "react";
import Board from "../components/Game/Board";
import * as API from "../helpers/API";
import HandManager from "../helpers/HandManager";
import Button from "react-bootstrap/Button";
// import {
//   IoMdSettings,
//   IoMdTrophy,
//   BsArrowCounterclockwise,
//   IoMdHelpCircle,
// } from "react-icons/";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pagestyle.css";
import "./Game.css";
import SolitaireInformation from "../components/Game/SolitaireInformation";
import MultiplayerInformation from "../components/Game/MultiplayerInformation";
import PlayerManager from "../helpers/PlayerManager";
import SettingModal from "../components/Modal/SettingsModal";
import HelpModal from "../components/Modal/HelpModal";
import LeaderboardModal from "../components/Modal/LeaderboardModal";
import WinModal from "../components/Modal/WinModal";

// Contains all cards on board in game of Set, handles card selection logic and validation
// CurrentHand should be pushed up to a higher-level component (game)
// and testDeck should be moved to server-side */
class Game extends React.Component {
  constructor(props) {
    super(props);

    this.playerCount = 1;
    this.difficulty = 0;
    this.state = { hand: [], scores: [], deckCount: 0, isWon: false };
    this.initialTime = 0;
    this.currentTurnTime = 0;

    this.updateHandState = this.updateHandState.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.handleDrawCardsClick = this.handleDrawCardsClick.bind(this);
    this.handleHintClick = this.handleHintClick.bind(this);
    this.handleValidSet = this.handleValidSet.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleGameWon = this.handleGameWon.bind(this);
    this.handleSettings = this.handleSettings.bind(this);

    this.handManager = new HandManager(
      this.handleValidSet,
      this.updateHandState
    );
    this.playerManager = new PlayerManager();
  }

  // Initialize game of set or get the current game
  componentDidMount() {
    //call initial getSetHand. generates new deck and hand on backend.
    API.postSetGame(this.playerCount, this.difficulty, false).then((game) => {
      this.handManager.setHand(game.hand);
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.playerCount = this.playerManager.getPlayers().length;
      this.difficulty = game.difficulty;
      this.initialTime = game.time;
      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Handles the client and server-side changes when there is a valid set or not
  handleValidSet(cards) {
    API.postValidSet(cards).then((data) => {
      // Will be used for clientside animations
      let isValid = data[0];
      let game = data[1];

      if (isValid) {
        this.handManager.markCorrect(cards);
      }
      this.handManager.setHand(game.hand);

      if (!isValid) {
        this.handManager.markIncorrect(cards);
      }
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Synchronizes componenent state with hand manager
  updateHandState() {
    this.setState((prev) => ({
      hand: this.handManager.getHand(),
      deckCount: prev.deckCount,
      scores: prev.scores,
      timer: prev.timer,
      isWon: prev.isWon,
    }));
  }

  // Used to synchronize client state with server state
  getGameState() {
    API.getSetGame().then((game) => {
      this.handManager.setHand(game.hand);
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.initialTime = game.time;
      this.currentTurnTime = game.currentTurnTime;
      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Used to draw 3 cards when the draw button is clicked
  handleDrawCardsClick() {
    // State update
    API.postSetDrawCards().then((game) => {
      this.handManager.setHand(game.hand);
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Used to help players find a set when the hint button is clicked
  handleHintClick() {
    API.getValidSet().then((data) => {
      let cardsToMark = data[0];
      let game = data[1];
      this.handManager.markHints(cardsToMark);
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Used to restart the game to a fresh state when the reset button is clicked
  handleResetClick() {
    API.postSetGame(this.playerCount, this.difficulty, true).then((game) => {
      this.handManager.setHand(game.hand);
      this.playerManager.setPlayers(game.players);
      this.playerManager.setCurrentTurn(game.currentTurn);
      this.initialTime = game.time;

      this.setState({
        hand: this.handManager.getHand(),
        deckCount: game.deckCount,
        scores: this.playerManager.getScores(),
        timer: game.currentTurnTime,
        isWon: game.isWon,
      });
    });
  }

  // Used to send information about the game to the leaderboard, then resets the game
  handleGameWon(name) {
    API.postLeaderboard(
      name,
      this.state.scores[0],
      Date.now() - this.initialTime
    ).then((res) => {
      this.handleResetClick();
    });
  }

  // Add difficulty functionality to the settings
  handleSettings(playerNum, diff) {
    console.log(diff);
    this.playerCount = playerNum;
    this.difficulty = diff;
    this.handleResetClick();
  }

  // Render the game screen
  render() {
    return (
      <div>
        <WinModal handleGameWon={this.handleGameWon} isWon={this.state.isWon} />
        <header>
          <div class="menu-left">
            <SettingModal handleSettings={this.handleSettings} />
            <HelpModal />
          </div>
          <div class="title">Set</div>
          <div class="menu-right">
            <LeaderboardModal />
            <Button variant="primary" onClick={this.handleResetClick}>
              {" "}
              Reset{" "}
            </Button>
          </div>
        </header>

        <div>
          {this.playerCount === 1 ? (
            <SolitaireInformation
              initialTime={this.initialTime}
              playerManager={this.playerManager}
            />
          ) : (
            <MultiplayerInformation
              getGameState={this.getGameState}
              currentTurnTime={this.state.timer}
              playerManager={this.playerManager}
            />
          )}
          <span class="game-info">Cards Left: {this.state.deckCount}</span>
          <br />
          <button
            disabled={!this.state.deckCount}
            class="gamebutton"
            onClick={this.handleDrawCardsClick}
          >
            {" "}
            Draw{" "}
          </button>
          <button
            disabled={this.difficulty === 3}
            class="gamebutton"
            onClick={this.handleHintClick}
          >
            {" "}
            Hint{" "}
          </button>
        </div>

        <div class="board-container">
          <Board
            handManager={this.handManager}
            updateHandState={this.updateHandState}
          />
        </div>
      </div>
    );
  }
}

export default Game;
