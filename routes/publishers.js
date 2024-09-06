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
  })

router
  .route('/:id')
  .get((req, res) => {
    const publisher = publishers.find(publisher => publisher.id == req.params.id)
    if (!publisher) {
      return res.status(404).send('Publisher not found');
    }
    res.json(publisher);
  })


module.exports = router;
