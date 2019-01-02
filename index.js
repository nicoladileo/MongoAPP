const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const books = require('./routes/books');
const app = express();

mongoose.connect('mongodb://localhost/bookdb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(morgan())
app.use('/api/books', books);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));