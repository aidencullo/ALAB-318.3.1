const express = require('express');
const router = express.Router();

const authors = [];
const { checkAuthor } = require('../utils/author');

const getNextId = () => {
  const maxId = authors.reduce((max, author) => Math.max(max, author.id), 0);
  return maxId + 1;
};

router
  .route('/')
  .get((req, res) => {
    res.json(authors);
  })
  .post((req, res) => {
    const newAuthor = req.body;
    checkAuthor(newAuthor);
    newAuthor.id = getNextId();
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = authors.find(author => author.id === id);

    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.json(author);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = authors.find(author => author.id === id);

    if (!author) {
      return res.status(404).send('Author not found');
    }

    checkAuthor(req.body);
    Object.assign(author, req.body);
    res.json(author);
  })
  .patch((req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = authors.find(author => author.id === id);

    if (!author) {
      return res.status(404).send('Author not found');
    }

    Object.assign(author, req.body);
    checkAuthor(author);
    res.json(author);
  });


module.exports = router;
