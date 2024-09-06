const express = require('express');
const router = express.Router();

const authors = require('../data/authors');
const { checkAuthor } = require('../utils/author');

router
  .route('/')
  .get((req, res) => {
    res.json(authors);
  })
  .post((req, res) => {
    const newAuthor = req.body;
    checkAuthor(newAuthor);
    authors.push(newAuthor);
    res.json(newAuthor);
  });

module.exports = router;
