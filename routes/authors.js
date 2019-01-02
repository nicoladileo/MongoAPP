
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Author,validateAuthor} = require('../models/authors');

router.get('/', async (req, res) => {
    const authors = await Author.find().sort('name');
    res.send(authors);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('The author with the given ID was not found.');
    const author = await Author.findById(req.params.id);
    if (!author) 
        return res.status(404).send('The author with the given ID was not found.');
    res.send(author);
});

router.post('/', async (req, res) => {
    const {error} = validateAuthor(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let author = new Author(req.body);
    author = await author.save();
    res.send(author);
});

module.exports = router;