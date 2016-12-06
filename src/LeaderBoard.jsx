class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    }
  }

  componentWillMount() {
    let board = this;
    this.fetch(function(scores) {
      board.setState({scores: scores});
    });
  }

  fetch(cb) {
    $.get('/api/scores').done(cb).fail(console.error.bind(console));
  }

  render () {
    return (
      <ul id="leaderBoard">
        <li><h5>High Scores</h5></li>
        {this.state.scores.map(function(entry) {
          return (
            <li className="entry">
              <span className="user">{entry.username}</span>
              <span className="score">{entry.score}</span>
            </li>
            )
        })}
      </ul>
    );
  }
}
