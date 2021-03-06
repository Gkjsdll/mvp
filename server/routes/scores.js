var path = require('path');
var router = require('express').Router();
var Score = require(path.join(__dirname, '../models/Score.js'));

router.get('/', function(req, res) {
  Score.find({}).select('-_id -__v').sort({score: -1}).limit(25).exec().then(function(scores) {
    res.status(200).send(scores);
  }).catch(function(err) {
    res.status(500).send(err);
  });
});

router.post('/', function(req, res) {
  if(!req.body.username || !req.body.score) {
    return res.status(400).send('Missing username or score');
  }
  var newScore = new Score(req.body);
  console.log(req.body);
  newScore.save().then(function(savedScore) {
    res.status(201).send(`Saved score ${savedScore.score} as ${savedScore.userame}`);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;
