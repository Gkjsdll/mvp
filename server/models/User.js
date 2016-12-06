var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

UserSchema.statics.register = function(user) {
  let User = this;
  return User.findOne({ username: user.username }).exec().then(function(foundUser) {
    if (foundUser) {
      throw new Error('Username already taken.');
    } if (!user.username || !user.password) {
      throw new Error('Missing username or password');
    } else {
      return new User(user).save();
    }
  });
}

UserSchema.methods.hashPassword = function() {
  let User = this;
  return bcrypt.hash(User.password, 10).then(function(hash) {
    User.password = hash;
    return User.save();
  }).catch(function(err) {
    console.error(err);
  });
};

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.hashPassword();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
