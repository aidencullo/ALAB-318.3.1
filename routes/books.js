const express = require('express');
const router = express.Router();

const books = require('../data/books');
const { checkBook } = require('../utils/book');

router
  .route('/')
  .get((req, res) => {
    res.json(books);
  })
  .post((req, res) => {
    const newBook = req.body;
    checkBook(newBook);
    books.push(newBook);
    res.json(newBook);
  })

router
  .route('/:id')
  .get((req, res) => {
    const book = books.find(book => book.id == req.params.id)
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  })


module.exports = router;
