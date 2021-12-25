const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
  },
});

module.exports = new mongoose.model("User", userSchema);
