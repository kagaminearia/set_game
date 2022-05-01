import _ from "lodash";

class HandManager {
  constructor(handleValidSet, updateHandstate) {
    this.hand = [];
    this.tempHand = [];
    this.handleValidSet = handleValidSet;
    this.updateHandstate = updateHandstate;
  }

  getHand() {
    let completeHand = _.concat(this.hand, this.tempHand);
    return _.sortBy(completeHand, (card) => card.order);
  }

  setHand(hand) {
    this.hand = hand;
  }

  markCorrect(cards) {
    for (const card of cards) {
      this.getCard(card.id).selected = false;
      this.getCard(card.id).correct = true;
    }
    this.updateHandstate();

    this.tempHand = cards;

    setTimeout(() => {
      this.tempHand = [];
      this.updateHandstate();
    }, 500);
  }

  markIncorrect(cards) {
    for (const card of cards) {
      this.getCard(card.id).selected = false;
      this.getCard(card.id).incorrect = true;
    }
    this.updateHandstate();

    setTimeout(() => {
      for (const card of cards) {
        this.getCard(card.id).incorrect = false;
      }
      this.updateHandstate();
    }, 500);
  }

  getCard(id) {
    return this.hand.find((card) => card.id === id);
  }

  selectCard(card) {
    /* check if the max number of selected cards has been reached or if the card being selected is actually a card being deselected */
    if (
      _.sumBy(this.hand, (card) => card.selected) < 3 ||
      card.selected === true
    ) {
      /* flip card to either be deselected or seleceted */
      this.getCard(card.id).selected = !card.selected;
      this.getCard(card.id).hint = this.getCard(card.id).hint = false;
    }

    if (_.sumBy(this.hand, (card) => card.selected) === 3) {
      let selectedCards = _.filter(this.hand, (card) => card.selected);
      console.log(selectedCards);
      this.handleValidSet(selectedCards);
    }
  }

  removeCards(cards) {
    for (const card of cards) {
      _.remove(this.hand, (x) => (x.id = card.id));
    }
  }

  markHints(validSet) {
    for (const card of validSet) {
      this.getCard(card.id).selected = false;
      this.getCard(card.id).hint = true;
    }
  }
}

export default HandManager;
