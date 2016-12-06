var TopBar = (props) => (
  <div className="top-bar">
    <div className="top-bar-left">
      <ul className="menu">
        <li className="menu-text">Hot and Cold</li>
      </ul>
    </div>

    <div className="top-bar-right">
      {props.authorized ? <User /> : <Guest />}
    </div>
  </div>
);
