const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: false,
  },
  compagnie: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = model("users", UserSchema);
