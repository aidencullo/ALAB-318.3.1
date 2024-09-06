function checkPublisher(publisher) {
  if (!publisher.name) {
    throw new Error('Publisher name is required');
  }
  if (!publisher.location) {
    throw new Error('Publisher location is required');
  }
}

module.exports = {
  checkPublisher,
};
