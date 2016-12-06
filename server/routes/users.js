var path = require('path');
var jwt = require('jwt-simple');
var router = require('express').Router();
var User = require(path.join(__dirname, '../models/User.js'));

router.get('/', function(req, res) {
  console.log('GET to /api/users/');
  User.find({}).select('-_id').exec().then(function(users) {
    console.log('THEN');
    res.send(users);
  }).catch(function(err) {
    console.log('CATCH');
    console.error(err);
  });
});

router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }).exec().then(function(foundUser){
    if(!foundUser) {
      return res.status(400).send('Incorrect username or password');
    }
    foundUser.authenticate(req.body.password).then(function(match) {
      if (match) {
        var token = jwt.encode({
          username: savedUser.username,
          timestamp: Date.now()
        }, process.env.JWT_SECRET);
        res.cookie.usertoken = token;
        return res.status(201).redirect('/');
      }
      return res.status(403).send('Incorrect username or password');
    });
  });
});

router.post('/register', function(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  User.register(user).then(function(savedUser) {
    var token = jwt.encode({
      username: savedUser.username,
      timestamp: Date.now()
    }, process.env.JWT_SECRET);
    res.cookie.usertoken = token;
    res.status(201).redirect('/');
  }).catch(function(err) {
    console.error(err);
  })
});

module.exports = router;
