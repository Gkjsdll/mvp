class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      posX: 0,
      posY: 0,
      lastGuess: null,
      topScore: localStorage.topScore || 0
    };
  }

  componentWillMount() {
    this.newGame();
  }

  newGame() {
    let newX = Math.floor(Math.random() * this.props.width);
    let newY = Math.floor(Math.random() * this.props.height);
    let username = this.state.username || '';
    while(!username) {
      username = prompt('Choose a username:');
    }
    this.setState({
      posX: newX,
      posY: newY,
      clicks: 0,
      username: username,
      gameStart: Date.now()
    });
  }

  distance(x, y) {
    let width = Math.abs(this.state.posX - x);
    let height = Math.abs(this.state.posY - y);
    return Math.sqrt(width ** 2 + height ** 2);
  }

  score(clicks, time) {
    let score = 10000;
    for(let i = 0; i < clicks; i++) {
      score *= 0.99;
      score -= 50;
    }
    for(let i = 0; i < time * 10; i++) {
      score *= 0.999;
      score -= 5;
    }
    score = Math.floor(score);

    return score;
  }

  guess(e) {
    e = e.nativeEvent;
    let stateUpdate = {};
    let proximity = this.distance(e.offsetX, e.offsetY);
    proximity = Math.round(proximity);
    if (proximity < 35) {
      let gameTime = Date.now() - this.state.gameStart;
      gameTime = Math.floor(gameTime / 100) / 10;
      let score = this.score(this.state.clicks, gameTime);

      stateUpdate.lastGuess = `You win with ${this.state.clicks + 1} clicks! `;
      stateUpdate.lastGuess += `You took ${gameTime} seconds to win. `;
      stateUpdate.lastGuess += `Score: ${score} `;

      if(score > this.state.topScore) {
        if (this.state.clicks > 1) {
          let username = this.state.username;
          this.setState({topScore: score}, () => localStorage.topScore = score);
          $.post('/api/scores', {
            username: username,
            score: score
          }).done(function() {
            console.log('Posted new top score');
          }).fail(function(err) {
            console.error(err);
          });
        } else {
          alert('Perfect scores don\'t go on the leaderboard!');
        }
      }
      this.newGame();
    } else {
      stateUpdate.lastGuess = `${proximity} pixels off!`;
      stateUpdate.clicks = this.state.clicks + 1;
    }
    this.setState(stateUpdate);
  }

  resetScore() {
    var sure = confirm('Would you like to reset the top score?');
    if (sure) {
      this.setState({topScore: 0}, () => localStorage.topScore = 0);
    } else {
      alert('Top score not reset');
    }
  }

  render() {
    return (
      <div>
        <TopBar />
        <h3>Clicks: {this.state.clicks}</h3>
        <h5>Last Guess: {this.state.lastGuess ? this.state.lastGuess : 'no last guess'}</h5>
        <h5 onDoubleClick={this.resetScore.bind(this)}>Top Score: {this.state.topScore}</h5>
        <GameField width={this.props.width} height={this.props.height} clickHandler={this.guess.bind(this)} />
      </div>
      );
  }
}

ReactDOM.render(<App width="640" height="480"/>, document.getElementById('app'));
