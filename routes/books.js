const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Book,validateBook} = require('../models/books');
const authorize = require('../middlewares/auth');

router.get('/', authorize, async (req, res) => {
    const books = await Book.find()
        .populate('author')
        .sort('title');
    res.send(books);
});

router.get('/:id', authorize, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('The book with the given ID was not found.');
    const book = await Book.findById(req.params.id)
        .populate('author');
    if (!book) 
        return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});

router.post('/',  async (req, res) => {
    const {error} = validateBook(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let book = new Book(req.body);
    book = await book.save();
    res.send(book);
});

router.put('/:id', async (req, res) => {
    const {error} = validateBook(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('The book with the given ID was not found.');
    const book = await Book.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!book) 
        return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});

router.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('The book with the given ID was not found.');
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) 
        return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});


module.exports = router;