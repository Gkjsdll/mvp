var GameField = (props) => {
  let fieldStyle = {
    width: props.width,
    height: props.height
  }
  return (
    <div>
      <h3>Clicks: {props.clicks}</h3>
      <h5>Last Guess: {props.lastGuess ? this.state.lastGuess : 'no last guess'}</h5>
      <div id="gameField" style={fieldStyle} onClick={props.clickHandler}></div>
    </div>
  );
};
