var LeaderBoard = (props) => {
  return (
    <ul id="leaderBoard">
      <li><h5>High Scores</h5></li>
      {props.scores.map(function(entry, rank) {
        return (
          <li className="entry">
            <span className="rank">{rank + 1}. </span>
            <span className="user">{entry.username}</span>
            <span className="score">{entry.score}</span>
          </li>
          )
      })}
    </ul>
  );
}
