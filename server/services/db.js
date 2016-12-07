var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/mvp';
mongoose.connect(MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function() {
  console.log(`Connected to MongoDB at ${process.env.MONGO_URI ? 'mLab' : 'localhost'}`);
});

module.exports = db;
