const express = require('express');
const router = express.Router();

const publishers = require('../data/publishers.js');

router
  .route('/')
  .get((req, res) => {
    res.json(publishers);
  });

module.exports = router;
