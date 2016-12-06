require('dotenv').config();
require(__dirname + '/services/db.js');

var path = require('path');
var morgan = require('morgan');
var express = require('express');
var app = express();

app.use(morgan('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', require(__dirname + '/routes'));

app.all('/*', function(req, res) {
  res.send('404 - Not found');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
