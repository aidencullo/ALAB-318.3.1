const express = require('express');
const router = express.Router();

const books = require('../data/books.js');

router
  .route('/')
  .get((req, res) => {
    res.json(books);
  });

module.exports = router;
