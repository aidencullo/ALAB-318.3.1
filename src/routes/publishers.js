const express = require('express');
const router = express.Router();

const publishers = [];
const { checkPublisher } = require('../utils/publisher');

const getNextId = () => {
  const maxId = publishers.reduce((max, publisher) => Math.max(max, publisher.id), 0);
  return maxId + 1;
};

router
  .route('/')
  .get((req, res) => {
    res.json(publishers);
  })
  .post((req, res) => {
    const newPublisher = req.body;
    checkPublisher(newPublisher);
    newPublisher.id = getNextId();
    publishers.push(newPublisher);
    res.status(201).json(newPublisher);
  })

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id, 10);
    const publisher = publishers.find(publisher => publisher.id === id);

    if (!publisher) {
      return res.status(404).send('Publisher not found');
    }
    res.json(publisher);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id, 10);
    const publisher = publishers.find(publisher => publisher.id === id);

    if (!publisher) {
      return res.status(404).send('Publisher not found');
    }

    checkPublisher(req.body);
    Object.assign(publisher, req.body);
    res.json(publisher);
  })
  .patch((req, res) => {
    const id = parseInt(req.params.id, 10);
    const publisher = publishers.find(publisher => publisher.id === id);

    if (!publisher) {
      return res.status(404).send('Publisher not found');
    }

    Object.assign(publisher, req.body);
    checkPublisher(publisher);
    res.json(publisher);
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id, 10);
    const publisher = publishers.find(publisher => publisher.id === id);

    if (!publisher) {
      return res.status(404).send('Publisher not found');
    }

    publishers.splice(publishers.indexOf(publisher), 1)
    res.status(204).send();
  })



module.exports = router;
