import React, { Component } from 'react';
import Intro from './Intro';
import Outro from './Outro';
import Card from './Card';
import numbersTableForCard from './numbers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "intro",
      currentCard: null,
      cardAnswerMap: {},
    }
  }

  triggerStart() {
    this.setState({ stage: "game", currentCard: 0, cardAnswerMap: {} })
  }

  triggerReset() {
    this.setState({ stage: "intro" })
  }

  registerAnswer(numberPresent) {
    var nextCardAnswerMap = Object.assign({}, this.state.cardAnswerMap);
    nextCardAnswerMap[this.state.currentCard] = numberPresent;

    var nextCurrentCard = this.state.currentCard + 1;

    if (nextCurrentCard >= 6) {
      this.setState({ stage: "outro", currentCard: null, cardAnswerMap: nextCardAnswerMap });
    } else {
      this.setState({ stage: "game", currentCard: nextCurrentCard, cardAnswerMap: nextCardAnswerMap });
    }
  }

  buildNumbersTable() {
    if (this.state.stage === "game") {
      return numbersTableForCard(this.state.currentCard);
    } else {
      return null;
    }
  }

  calculateMagicNumber() {
    var magicNumber = 0;

    for (var cardIndex in this.state.cardAnswerMap) {
      if (this.state.cardAnswerMap[cardIndex] === true) {
        magicNumber += 1 << cardIndex;
      }
    }

    return magicNumber;
  }

  render() {
    return (
      <div className="App container">
        {this.state.stage === "intro" ? <Intro firstNumber={1} lastNumber={60} onClickStart={this.triggerStart.bind(this)} /> : null}
        {this.state.stage === "game" ? <Card numbersTable={this.buildNumbersTable()} onClickReset={this.triggerReset.bind(this)} onClickNumberPresent={this.registerAnswer.bind(this, true)} onClickNumberAbsent={this.registerAnswer.bind(this, false)} /> : null}
        {this.state.stage === "outro" ? <Outro yourNumber={this.calculateMagicNumber()} onClickReset={this.triggerReset.bind(this)} /> : null}
      </div>
    );
  }
}

export default App;
