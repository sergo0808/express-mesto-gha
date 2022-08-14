const mongoose = require('mongoose')

const userSchema = new mongoose.userSchema({
  name: {
    type: String,
    minLength: 2,
    maxLenength: 30,
    require: true
  },
  about: {
    type: String,
    minLength: 2,
    maxLenength: 30,
    require: true
  },
  avatar: {
    type: String,
    require: true
  }
})

const User = mongoose.userSchema("User", userSchema);
module.exports = User;