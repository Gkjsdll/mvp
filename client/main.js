$(function() {
  var $gameField = $('#gameField');
  var $clicks = $('#clicks');
  var $lastGuess = $('#lastGuess');

  var fieldWidth = $gameField.width();
  var fieldHeight = $gameField.height();

  var posX;
  var posY;
  var clicks;

  var updateClicks = function(reset) {
    clicks++;
    if (reset) {
      clicks = 0;
    }
    $clicks.text(clicks);
  };

  var newGame = function() {
    posX = Math.floor(Math.random() * (fieldWidth + 1));
    posY = Math.floor(Math.random() * (fieldHeight + 1));
    updateClicks(true);
  }
  newGame();

  var distance = function(x, y) {
    var width = Math.abs(posX - x);
    var height = Math.abs(posY - y);
    return Math.sqrt(width ** 2 + height ** 2);
  };

  $gameField.click(function(e) {
    updateClicks();

    var proximity = distance(e.offsetX, e.offsetY);
    proximity = Math.round(proximity);

    if (proximity <= 35) {
      $lastGuess.text('You win with ' + clicks + ' clicks!');
      newGame();
    } else {
      $lastGuess.text(proximity + ' pixels off!');
    }
  });
});
