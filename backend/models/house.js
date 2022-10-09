const mongoose = require("mongoose");

const housesSchema = new mongoose.Schema({
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
  with_who: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("House", housesSchema);
