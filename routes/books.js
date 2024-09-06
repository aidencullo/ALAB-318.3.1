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
  });

module.exports = router;
