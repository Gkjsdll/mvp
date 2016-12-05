class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      posX: 0,
      posY: 0,
      lastGuess: null
    };
  }

  componentWillMount() {
    this.newGame();
  }

  newGame() {
    let newX = Math.floor(Math.random() * this.props.width);
    let newY = Math.floor(Math.random() * this.props.height);
    this.setState({
      posX: newX,
      posY: newY,
      clicks: 0,
      gameStart: Date.now()
    });
  }

  distance(x, y) {
    let width = Math.abs(this.state.posX - x);
    let height = Math.abs(this.state.posY - y);
    return Math.sqrt(width ** 2 + height ** 2);
  }

  guess(e) {
    e = e.nativeEvent;
    let stateUpdate = {};
    let proximity = this.distance(e.offsetX, e.offsetY);
    proximity = Math.round(proximity);
    if (proximity < 35) {
      let gameTime = Date.now() - this.state.gameStart;
      gameTime = Math.floor(gameTime / 100) / 10;
      stateUpdate.lastGuess = `You win with ${this.state.clicks + 1} clicks! `;
      stateUpdate.lastGuess += `You took ${gameTime} seconds to win.`;
      this.newGame();
    } else {
      stateUpdate.lastGuess = `${proximity} pixels off!`;
      stateUpdate.clicks = this.state.clicks + 1;
    }
    this.setState(stateUpdate);
  }

  render() {
    return (
      <div>
        <h1>Hot and Cold</h1>
        <h3>Clicks: {this.state.clicks}</h3>
        <h5>Last Guess: {this.state.lastGuess ? this.state.lastGuess : 'no last guess'}</h5>
        <GameField width={this.props.width} height={this.props.height} clickHandler={this.guess.bind(this)} />
      </div>
      );
  }
}

ReactDOM.render(<App width="640" height="480"/>, document.getElementById('app'));
