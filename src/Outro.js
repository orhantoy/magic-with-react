import React from 'react';

function Outro(props) {
  return (
    <div className="Stage_Outro">
      <p>
        Let me think...
      </p>

      <p>
        Was <strong>{props.yourNumber}</strong> the number you thought of?
      </p>

      <p>
        <button onClick={props.onClickReset}>Let me try again!</button>
      </p>
    </div>
  );
}

export default Outro;
