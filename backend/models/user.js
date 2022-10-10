const mongoose = require("mongoose");
const User = require("./house");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  withWho: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
});

module.exports = mongoose.model("User", usersSchema);
