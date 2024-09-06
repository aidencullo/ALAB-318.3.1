const express = require('express');
const router = express.Router();

const books = require('../data/books.js');

router
  .route('/')
  .get((req, res) => {
    res.json(books);
  })
  .post((req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
  });

module.exports = router;
