const express = require('express');
const router = express.Router();

const publishers = require('../data/publishers');
const { checkPublisher } = require('../utils/publisher');

router
  .route('/')
  .get((req, res) => {
    res.json(publishers);
  })
  .post((req, res) => {
    const newPublisher = req.body;
    checkPublisher(newPublisher);
    publishers.push(newPublisher);
    res.json(newPublisher);
  });

module.exports = router;
