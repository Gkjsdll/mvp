var LeaderBoard = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Score</th>
          <th>Clicks</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
      {props.scores.map(function(entry, rank) {
        return (
          <tr className="entry">
            <td className="rank">{rank + 1}. </td>
            <td className="user">{entry.username}</td>
            <td className="score">{entry.score}</td>
            <td className="clicks">{entry.clicks}</td>
            <td className="time">{entry.time / 10}s</td>
          </tr>
          )
      })}
      </tbody>
    </table>
  );
}
