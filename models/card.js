const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: ["underfind"],
    },
  ],
  creatAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
