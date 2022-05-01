const express = require("express");
const deckHelper = require("../setDeckHelper.js");
const gameRouter = express.Router();

/* get current game or start new game */
gameRouter.post("/", (req, res) => {
  /* start new game if game hasn't been started or a reset has been called */
  if (req.session?.started != true || req.body.reset == true) {
    console.log("initializing game...");
    req.session.started = true;
    req.session.deck = deckHelper.generateSetDeck();
    req.session.difficulty = req.body.difficulty;
    console.log("Difficulty " + req.session.difficulty);

    let players = [];
    for (let i = 0; i < req.body.playerCount; i++) {
      players.push({ time: 0, score: 0, name: "Player " + (i + 1) });
    }

    let game = {
      hand: deckHelper.drawCards(12, req.session.deck),
      deckCount: req.session.deck.cards.length,
      time: Date.now(),
      players: players,
      currentTurn: 0,
      currentTurnTime: Date.now(),
      isWon: false,
      game: req.session.started,
    };

    req.session.game = game;
  }

  handleTurnTimer(req.session.game);

  res.json(req.session.game);
});

// get current game state
gameRouter.get("/", (req, res) => {
  //console.log("getting game state...");
  handleTurnTimer(req.session.game);
  res.json(req.session.game);
});

// draw three or less cards to hand and apply score penalty
gameRouter.post("/hand", (req, res) => {
  console.log("drawing cards...");
  /* draw 3 cards or however many cards are left in deck */
  let cardsToDraw =
    req.session.deck?.cards.length >= 3 ? 3 : req.session.deck.cards.length;
  req.session.game.hand = req.session.game.hand.concat(
    deckHelper.drawCards(cardsToDraw, req.session.deck)
  );
  req.session.game.deckCount = req.session.deck.cards.length;

  req.session.game.players[req.session.game.currentTurn].score -= 100;
  res.json(req.session.game);
});

/* get hint about current hand */
/* TODO add server side check of hint difficulty */
gameRouter.get("/set", (req, res) => {
  req.session.game.players[req.session.game.currentTurn].score +=
    -1000 + 200 * req.session.difficulty;
  let hint = deckHelper.findSetinCards(req.session.game.hand);
  for (let i = 0; i < req.session.difficulty; i++) {
    hint.pop();
  }
  res.json([hint, req.session.game]);
});

// check if current selected cards are a set
gameRouter.post("/set", (req, res) => {
  console.log("checking if valid set...");
  /* default to incorrect set */
  let isValidSet = false;
  let scoreModifier = -1000;
  /* validate set */
  if (checkValidSetInput(req.body) && deckHelper.isValidSet(req.body)) {
    /* remove the valid set from hand */
    req.session.game.hand = deckHelper.removeCards(
      req.body.map((card) => card.id),
      req.session.game.hand
    );
    /* draw up to 12 cards */
    if (
      req.session.game.hand.length < 12 &&
      req.session.deck.cards.length > 0
    ) {
      req.session.game.hand = req.session.game.hand.concat(
        deckHelper.drawCards(3, req.session.deck)
      );
      req.session.game.deckCount = req.session.deck.cards.length;
    }

    isValidSet = true;
    scoreModifier = 1000;
  }

  /* add score and send response */
  req.session.game.players[req.session.game.currentTurn].score += scoreModifier;

  if (req.session.game.players.length > 1) {
    console.log("next turn");
    req.session.game.currentTurn = incrementCurrentTurn(
      req.session.game.currentTurn,
      req.session.game.players.length
    );
    handleTurnTimer(req.session.game);
    req.session.game.currentTurnTime = Date.now();
  }

  if (
    req.session.deck.cards.length === 0 &&
    req.session.game.hand.length === 0
  ) {
    req.session.game.isWon = true;
  }

  if (
    req.session.deck.cards.length === 0 &&
    deckHelper.findSetinCards(req.session.game.hand).length === 0
  ) {
    req.session.game.isWon = true;
  }

  res.json([isValidSet, req.session.game]);
});

/* check if possible set is actually a valid input from client */
function checkValidSetInput(cards) {
  let isValidInput = true;

  if (cards.length != 3) {
    isValidInput = false;
  }

  // /* messy code. checks if input cards are from the cards in hand */
  // if (_.unionWith(cards, app.get('hand'), _.isEqual).length === app.get('hand').length) {
  //   isValidInput = false;
  // }

  return isValidInput;
}

function incrementCurrentTurn(currentTurn, playerCount) {
  if (playerCount <= 1) {
    return currentTurn;
  }
  if (currentTurn === playerCount - 1) {
    return 0;
  }

  console.log("turn incremented");
  return ++currentTurn;
}

function handleTurnTimer(game) {
  if (game.players.length <= 1) {
    return;
  }

  let turnTimerLength = 10000;

  if (Math.abs(game.currentTurnTime - Date.now()) > turnTimerLength) {
    console.log("turn over");
    game.players[game.currentTurn].score -= 2000;
    game.currentTurnTime = Date.now();
    game.currentTurn = incrementCurrentTurn(
      game.currentTurn,
      game.players.length
    );
  }
}

module.exports = gameRouter;
