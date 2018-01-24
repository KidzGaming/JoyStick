const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  fullname:{
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);