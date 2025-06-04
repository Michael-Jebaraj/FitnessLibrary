const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  weight: Number,
  height: Number,
  goal: String,
  trainingDays: Number,
  progress: {
    type: Object,
    default: {}
  },
  lastProgressReset:{
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
