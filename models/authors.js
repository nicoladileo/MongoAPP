const mongoose = require('mongoose');
const Joi = require('joi');

const Author = mongoose.model('Author', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  surname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validate(author) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      surname: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(author, schema);
  }

module.exports.Author = Author;
module.exports.validateAuthor = validate;