const express = require('express');
const router = express.Router();

const authors = require('../data/authors.js');

router
  .route('/')
  .get((req, res) => {
    res.json(authors);
  });

module.exports = router;
