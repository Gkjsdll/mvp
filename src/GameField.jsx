var GameField = (props) => {
  let fieldStyle = {
    width: props.width,
    height: props.height
  }
  return (
    <div id="gameField" style={fieldStyle} onClick={props.clickHandler}></div>
  );
};
