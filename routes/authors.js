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
  })

router
  .route('/:id')
  .get((req, res) => {
    const author = authors.find(author => author.id == req.params.id)
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.json(author);
  })


module.exports = router;
