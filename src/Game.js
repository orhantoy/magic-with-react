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
      cardAnswers: new Array(this.props.n),
    }
  }

  triggerStart() {
    this.setState({ stage: "game", currentCard: 0, cardAnswers: new Array(this.props.n) })
  }

  triggerReset() {
    this.setState({ stage: "intro" })
  }

  registerAnswer(numberPresent) {
    var nextCardAnswers = this.state.cardAnswers.slice();
    nextCardAnswers[this.state.currentCard] = numberPresent;

    var nextCurrentCard = this.state.currentCard + 1;

    if (nextCurrentCard >= this.props.n) {
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
    return this.state.cardAnswers.reduce(
      (acc, numberPresent, index) => acc + (numberPresent === true ? (1 << index) : 0)
    )
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
