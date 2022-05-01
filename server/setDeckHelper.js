const { set } = require("lodash");

module.exports = {
  generateSetDeck: function () {
    let newTestDeck = [];

    /* there are 81 cards in deck (3 * 3 * 3 * 3)
        therefore if we iterate 9 by 9 times
        we are able to initialize all 81 cards (9 * 9) */

    //note this is still very inefficient
    let test = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let newCard = {
          id: i * 9 + j,
          selected: false,
          color: Math.floor(i / 3),
          shading: i % 3,
          shape: Math.floor(j / 3),
          number: j % 3,
        };
        newTestDeck.push(newCard);
      }
    }

    let finalizedDeck = { cards: newTestDeck, numberDrawn: 0 };

    return finalizedDeck;
  },

  drawCards: function (numberToDraw, deck) {
    let cardsToDraw = [];

    for (let i = 0; i < numberToDraw; i++) {
      let drawnCard = deck.cards.splice(
        Math.floor(Math.random() * deck.cards.length),
        1
      )[0];
      drawnCard.order = deck.numberDrawn++;
      cardsToDraw.push(drawnCard);
    }

    return cardsToDraw;
  },

  // selectCard(id, cards) {
  //     let selectedCard = cards.find(x => x.id === id);

  //     selectedCard.selected = !selectedCard.selected;

  //     return cards;
  // }

  removeCards: function (ids, cards) {
    /* look at lodash solution. _.difference() */
    for (const id of ids) {
      cards.splice(
        cards.findIndex((card) => card.id === id),
        1
      );
    }

    return cards;
  },

  isValidSet: function (cards) {
    let features = [[], [], [], []];

    for (let i = 0; i < cards.length; i++) {
      features[0].push(cards[i].color);
      features[1].push(cards[i].shape);
      features[2].push(cards[i].shading);
      features[3].push(cards[i].number);
    }

    for (const feature of features) {
      if (!isIdenticalOrDistinct(feature)) {
        return false;
      }
    }

    return true;

    function isIdenticalOrDistinct(features) {
      /* check if all identical */
      if (features[0] === features[1] && features[0] === features[2]) {
        return true;
      }
      /* check if not distinct */
      if (
        features[0] === features[1] ||
        features[0] === features[2] ||
        features[1] === features[2]
      ) {
        return false;
      }

      /* are all distinct */
      return true;
    }
  },

  /* inefficient simple approach */
  findSetinCards: function (cards) {
    n = cards.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          if (this.isValidSet([cards[i], cards[j], cards[k]])) {
            return [cards[i], cards[j], cards[k]];
          }
        }
      }
    }
    return [];
  },
};
