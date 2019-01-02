const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const books = require('./routes/books');
const authors = require('./routes/authors');
const users = require('./routes/users');
const app = express();

if (!config.get('jwtkey')) {
    console.log('FATAL ERROR - Not valid configuration')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/bookdb', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(morgan('combined'))
app.use('/api/books', books);
app.use('/api/authors', authors);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));