var mongoose = require('mongoose');


var ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  clicks: {
    type: Number,
    required: true
  },

  time: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
