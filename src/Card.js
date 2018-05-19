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
          <button onClick={this.props.onClickNumberPresent} className="choice yes">👍 My number is there</button>
          <button onClick={this.props.onClickNumberAbsent} className="choice no">My number is not there 👎</button>
        </div>

        <p className="reset">
          <button onClick={this.props.onClickReset}>I want to start over</button>
        </p>
      </div>
    )
  }
}

export default Card;

/*
<p class="lead card-question">Is your number here?</p>

        <form method="post">
          <% if next_card_index %>
            <input type="hidden" name="card_index" value="<%= next_card_index %>">
          <% end %>

          <% game.answers.each do |answer| %>
            <input type="hidden" name="answers[<%= answer[:index] %>]" value="<%= answer[:value] %>">
          <% end %>

          <div>
            <table class="card">
              <tbody>
                <% game.numbers_table.each do |row| %>
                  <tr>
                    <% row.each do |number| %>
                      <td><%= number %></td>
                    <% end %>
                  </tr>
                <% end %>
              </tbody>
            </table>
          </div>

          <div class="choices">
            <button type="submit" name="answers[<%= game.current_card_index %>]" value="1" class="choice yes">👍 My number is there</button>
            <button type="submit" name="answers[<%= game.current_card_index %>]" value="0" class="choice no">My number is not there 👎</button>
          </div>
        </form>

        <p class="reset">
          <a href="<%= h root_url %>">I want to start over</a>
        </p>*/
