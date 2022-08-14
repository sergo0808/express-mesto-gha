const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 30,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  likes: [{
    Array: [ObjectId],
    default: []
  }],
  creatAt: {
    type: Date,
    default: Date.now
  }
})

const Card = mongoose.userSchema("Card", userSchema);
module.exports = Card;