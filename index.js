const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const books = require('./routes/books');
const authors = require('./routes/authors');
const app = express();

mongoose.connect('mongodb://localhost/bookdb', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(morgan('combined'))
app.use('/api/books', books);
app.use('/api/authors', authors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));