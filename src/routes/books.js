const express = require('express');
const router = express.Router();

const books = require('../data/books');
const { checkBook } = require('../utils/book');

const getNextId = () => {
  const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
  return maxId + 1;
};

router
  .route('/')
  .get((req, res) => {
    let returnBooks = books;
    if (req.query.genre) {
      const genre = req.query.genre.toLowerCase();
      const filteredBooks = books.filter(book => book.genre.toLowerCase() === genre);
      returnBooks = filteredBooks;
    }
    return res.render('books', { books: returnBooks });
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

    Object.assign(book, req.body);
    checkBook(book);
    res.json(book);
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    books.splice(books.indexOf(book), 1);
    res.status(204).send();
  })


module.exports = router;
