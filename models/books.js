const mongoose = require('mongoose');
const Joi = require('joi');

const Book = mongoose.model('Book', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  insertion: {
      type: Date,
      default: Date.now
  }
}));

function validate(book) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genre: Joi.string().min(5).max(50).required(),
      author: Joi.string().length(24).required()
    };
  
    return Joi.validate(book, schema);
  }

module.exports.Book = Book;
module.exports.validateBook = validate;