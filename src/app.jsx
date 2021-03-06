class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      posX: 0,
      posY: 0,
      lastGuess: null,
      scores: [],
      showLeaderboard: false
    };
    this.getScores();
  }

  newGame(cb = () => {}) {
    this.getScores();
    let newX = Math.floor(Math.random() * this.props.width);
    let newY = Math.floor(Math.random() * this.props.height);

    let username = this.state.username;
    if(username) {
      return this.setState({
        posX: newX,
        posY: newY,
        clicks: 0,
        username: username,
        gameStart: Date.now(),
        playing: true
      }, cb);
    }
    while(!username) {
      username = prompt('Choose a username:');
    }
    this.setState({username: username});

  }

  getScores(cb = () => {}) {
    let app = this;
    $.get('/api/scores').done(function(scores) {
      app.setState({scores: scores}, cb);
    }).fail(console.error.bind(console));
  }

  distance(x, y) {
    let width = Math.abs(this.state.posX - x);
    let height = Math.abs(this.state.posY - y);
    return Math.sqrt(width * width + height * height);
  }

  score() {
    let time = Date.now() - this.state.gameStart;
    time = Math.floor(time / 100) / 10;
    let clicks = this.state.clicks;
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
    let app = this;
    e = e.nativeEvent;
    
    let checkClick = function() {
      let stateUpdate = {};
      let proximity = app.distance(e.offsetX, e.offsetY);
      proximity = Math.round(proximity);
      if (proximity <= 35) {
        let score = app.score();
        let gameTime = Date.now() - app.state.gameStart;
        gameTime = Math.floor(gameTime / 100) / 10;

        stateUpdate.lastGuess = `You win with ${app.state.clicks + 1} clicks! `;
        stateUpdate.lastGuess += `You took ${gameTime} seconds to win. `;
        stateUpdate.lastGuess += `Score: ${score} `;
        stateUpdate.playing = false;
        stateUpdate.clicks = 0;
        app.setState(stateUpdate);

        if (app.state.clicks) { //First click not incremented if game is won
          $.post('/api/scores', {
            username: app.state.username,
            score: score,
            clicks: app.state.clicks,
            time: gameTime * 10
          }).fail(function(err) {
            console.error(err);
          });
        } else {
          alert('Perfect scores don\'t go on the leaderboard!');
        }
      } else {
        stateUpdate.lastGuess = `${proximity} pixels off!`;
        stateUpdate.clicks = app.state.clicks + 1;
        app.setState(stateUpdate);
      }
    }

    if(!app.state.playing) {
      app.newGame(checkClick);
    } else {
      checkClick();
    }
  }

  toggleLeaderBoard() {
    let show = !this.state.showLeaderboard;
    if (show) {
      this.getScores();
    }
    this.setState({showLeaderboard: show});
  }

  render() {
    return (
      <div>
        <TopBar clickHandler={this.toggleLeaderBoard.bind(this)} playing={!this.state.showLeaderboard} />
        {this.state.showLeaderboard ?
          <LeaderBoard scores={this.state.scores} /> :
          <GameField
            width={this.props.width}
            height={this.props.height}
            clickHandler={this.guess.bind(this)}
            clicks={this.state.clicks}
            lastGuess={this.state.lastGuess}
          />}
      </div>
      );
  }
}

ReactDOM.render(<App width="640" height="480"/>, document.getElementById('app'));
