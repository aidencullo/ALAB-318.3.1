const express = require('express');
const router = express.Router();

const books = [];
const { checkBook } = require('../utils/book');

const getNextId = () => {
  const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
  return maxId + 1;
};

router
  .route('/')
  .get((req, res) => {
    res.json(books);
  })
  .post((req, res) => {
    const newBook = req.body;
    checkBook(newBook);
    newBook.id = getNextId();
    books.push(newBook);
    res.status(201).json(newBook);
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    checkBook(req.body);
    Object.assign(book, req.body);
    res.json(book);
  })
  .patch((req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    Object.assign(book, {...book, ...req.body});
    checkBook(book);
    res.json(book);
  });

module.exports = router;
