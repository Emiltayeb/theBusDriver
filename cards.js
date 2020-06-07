const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

class Card_deck {
  constructor() {
    this.deck = [];
  }

  creatDeck(suits, values) {
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push(new Card(suit, value));
      }
    }
    return this.deck;
  }

  shuffel() {
    let counter = this.deck.length,
      temp,
      i;
    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = this.deck[counter];
      this.deck[counter] = this.deck[i];
      this.deck[i] = temp;
    }

    return this.deck;
  }

  reset() {
    this.deck = [];
    this.creatDeck(suits, values);
    this.shuffel();
    console.log(this.deck);
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}
