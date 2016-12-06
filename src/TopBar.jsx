var TopBar = (props) => (
  <div className="top-bar">
    <div className="top-bar-left">
      <ul className="menu">
        <li className="menu-text">Hot and Cold</li>
      </ul>
    </div>
    <div className="top-bar-right">
      <ul className="menu">
        <li className="menu-text"><a href="#" onClick={props.clickHandler}>Toggle Leader Board</a></li>
      </ul>
    </div>
  </div>
);
