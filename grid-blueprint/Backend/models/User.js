const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  googleId: String,
  avatar: String
});

module.exports = mongoose.model("User", userSchema);