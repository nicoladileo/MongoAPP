const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}));

function validate(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(8)
    };
  
    return Joi.validate(user, schema);
  }

  function validateLogin(user) {
    const schema = {
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(8)
    };
  
    return Joi.validate(user, schema);
  }

module.exports.User = User;
module.exports.validateUser = validate;
module.exports.validateUserLogin = validateLogin;