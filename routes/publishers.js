const express = require('express');
const router = express.Router();

const publishers = require('../data/publishers.js');

router
  .route('/')
  .get((req, res) => {
    res.json(publishers);
  })
  .post((req, res) => {
    const newPublisher = req.body;
    publishers.push(newPublisher);
    res.json(newPublisher);
  });

module.exports = router;
