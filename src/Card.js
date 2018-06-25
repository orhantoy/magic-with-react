import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="Stage_Game">
        <p className="lead card-question">Is your number here?</p>

        <div>
          <table className="card">
            <tbody>
              {this.props.numbersTable.map(function(row, rowIndex) {
                return (
                  <tr key={"row-" + rowIndex}>
                    {row.map(function(number, cellIndex) {
                      return <td key={"row-" + rowIndex + "-" + cellIndex }>{number}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="choices">
          <button onClick={this.props.onClickNumberPresent} className="choice yes">
            <span role="img" aria-label="Thumbs up">👍</span> My number is there
          </button>
          <button onClick={this.props.onClickNumberAbsent} className="choice no">
            My number is not there <span role="img" aria-label="Thumbs down">👎</span>
          </button>
        </div>

        <p className="reset">
          <button className="as-link" onClick={this.props.onClickReset}>I want to start over</button>
        </p>
      </div>
    )
  }
}

export default Card;
