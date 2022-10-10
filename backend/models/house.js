const mongoose = require("mongoose");
const User = require("./user");

const housesSchema = new mongoose.Schema({
  houseName: {
    type: String,
  },
  rooms: [
    {
      name: {
        type: String,
      },
      size: {
        type: Number,
      },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],
});

module.exports = mongoose.model("House", housesSchema);
