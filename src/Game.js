import React, { Component } from 'react';
import Intro from './Intro';
import Outro from './Outro';
import Card from './Card';
import numbersTableForCard from './numbers';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "intro",
      currentCard: null,
      cardAnswers: {},
    }
  }

  triggerStart() {
    var nextCurrentCard;

    if (this.props.randomCardOrder === true) {
      nextCurrentCard = Math.floor(Math.random() * this.props.n);
    } else {
      nextCurrentCard = 0;
    }

    this.setState({ stage: "game", currentCard: nextCurrentCard, cardAnswers: {} });
  }

  triggerReset() {
    this.setState({ stage: "intro" });
  }

  registerAnswer(numberPresent) {
    var nextCardAnswers = Object.assign({}, this.state.cardAnswers);
    nextCardAnswers[this.state.currentCard] = numberPresent;

    var nextCurrentCard = null;

    if (Object.keys(nextCardAnswers).length < this.props.n) {
      if (this.props.randomCardOrder === true) {
        var allCards = [...Array(this.props.n).keys()];
        var answeredCards = Object.keys(nextCardAnswers).map((stringValue) => Number(stringValue));
        var missingCards = allCards.filter((value) => !answeredCards.includes(value));
        var r = Math.floor(Math.random() * missingCards.length);
        nextCurrentCard = missingCards[r];
      } else {
        nextCurrentCard = this.state.currentCard + 1;
      }
    }

    if (nextCurrentCard === null) {
      this.setState({ stage: "outro", currentCard: null, cardAnswers: nextCardAnswers });
    } else {
      this.setState({ stage: "game", currentCard: nextCurrentCard, cardAnswers: nextCardAnswers });
    }
  }

  buildNumbersTable() {
    if (this.state.stage === "game") {
      return numbersTableForCard(this.roundedMaxNumber(), this.state.currentCard);
    } else {
      return null;
    }
  }

  roundedMaxNumber() {
    const actualLastNumber = (1 << this.props.n) - 1;
    return actualLastNumber - actualLastNumber % 10;
  }

  calculateMagicNumber() {
    var magicNumber = 0;

    for (var cardIndex in this.state.cardAnswers) {
      if (this.state.cardAnswers[cardIndex] === true) {
        magicNumber += 1 << cardIndex;
      }
    }

    return magicNumber;
  }

  render() {
    return (
      <div className="App container">
        {this.state.stage === "intro" ? <Intro firstNumber={1} lastNumber={this.roundedMaxNumber()} onClickStart={this.triggerStart.bind(this)} /> : null}
        {this.state.stage === "game" ? <Card numbersTable={this.buildNumbersTable()} onClickReset={this.triggerReset.bind(this)} onClickNumberPresent={this.registerAnswer.bind(this, true)} onClickNumberAbsent={this.registerAnswer.bind(this, false)} /> : null}
        {this.state.stage === "outro" ? <Outro yourNumber={this.calculateMagicNumber()} onClickReset={this.triggerReset.bind(this)} /> : null}
      </div>
    );
  }
}

export default Game;
