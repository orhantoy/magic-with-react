import React from 'react';

function Intro(props) {
  return (
    <div className="Stage_Intro">
      <p className="lead">
        Are you ready for a Little Bit of Magic?
      </p>

      <p>
        If you are, think of a number between&nbsp;{props.firstNumber}&nbsp;and&nbsp;{props.lastNumber}.
      </p>

      <div>
        Ready? <button type="button" className="as-link" onClick={props.onClickStart}>{"Yes, let's go!"}</button>
      </div>
    </div>
  );
}

export default Intro;
